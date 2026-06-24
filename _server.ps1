# Minimal concurrent static file server (no external runtime required).
# Serves the Partner Center folder over HTTP/1.0 using TcpListener + a runspace pool
# so the browser's parallel connections never block each other.
param([int]$Port = 8099)

$ErrorActionPreference = "Continue"
$root = $PSScriptRoot

$handler = {
  param($client, $root)

  $mime = @{
    ".html"="text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8";
    ".css"="text/css; charset=utf-8"; ".js"="text/javascript; charset=utf-8";
    ".json"="application/json; charset=utf-8"; ".svg"="image/svg+xml";
    ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".gif"="image/gif";
    ".webp"="image/webp"; ".ico"="image/x-icon"; ".pdf"="application/pdf";
    ".zip"="application/zip"; ".woff2"="font/woff2"; ".woff"="font/woff";
    ".ttf"="font/ttf"; ".mp4"="video/mp4"; ".txt"="text/plain; charset=utf-8"
  }

  try {
    $client.ReceiveTimeout = 4000
    $client.NoDelay = $true
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $requestLine = $reader.ReadLine()
    if ([string]::IsNullOrEmpty($requestLine)) { $client.Close(); return }

    $parts = $requestLine -split " "
    $url = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
    $path = ($url -split "\?")[0]
    $path = [System.Uri]::UnescapeDataString($path)
    if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }

    $rel = $path.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
    $full = Join-Path $root $rel
    $fullResolved = [System.IO.Path]::GetFullPath($full)
    $rootResolved = [System.IO.Path]::GetFullPath($root)

    $status = "200 OK"; $ct = "application/octet-stream"; [byte[]]$body = @()
    if ($fullResolved.StartsWith($rootResolved) -and (Test-Path $fullResolved -PathType Leaf)) {
      $ext = [System.IO.Path]::GetExtension($fullResolved).ToLower()
      if ($mime.ContainsKey($ext)) { $ct = $mime[$ext] }
      $body = [System.IO.File]::ReadAllBytes($fullResolved)
    } else {
      $status = "404 Not Found"; $ct = "text/html; charset=utf-8"
      $body = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1><p>$path</p>")
    }

    $headers = "HTTP/1.0 $status`r`n" +
               "Content-Type: $ct`r`n" +
               "Content-Length: $($body.Length)`r`n" +
               "Access-Control-Allow-Origin: *`r`n" +
               "Cache-Control: no-cache`r`n" +
               "Connection: close`r`n`r`n"
    $hb = [System.Text.Encoding]::ASCII.GetBytes($headers)
    $stream.Write($hb, 0, $hb.Length)
    if ($body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
    $stream.Flush()
  } catch {
  } finally {
    try { $client.Close() } catch {}
  }
}

$pool = [runspacefactory]::CreateRunspacePool(2, 32)
$pool.Open()

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $Port)
$listener.Start()
Write-Host "PlasmaMade Partner Center server (concurrent) on http://127.0.0.1:$Port  root=$root"

$jobs = New-Object System.Collections.ArrayList

while ($true) {
  try {
    $client = $listener.AcceptTcpClient()
    $ps = [powershell]::Create()
    $ps.RunspacePool = $pool
    [void]$ps.AddScript($handler).AddArgument($client).AddArgument($root)
    $async = $ps.BeginInvoke()
    [void]$jobs.Add([pscustomobject]@{ ps = $ps; async = $async })

    if ($jobs.Count -gt 24) {
      for ($i = $jobs.Count - 1; $i -ge 0; $i--) {
        if ($jobs[$i].async.IsCompleted) {
          try { $jobs[$i].ps.EndInvoke($jobs[$i].async) } catch {}
          try { $jobs[$i].ps.Dispose() } catch {}
          $jobs.RemoveAt($i)
        }
      }
    }
  } catch {}
}
