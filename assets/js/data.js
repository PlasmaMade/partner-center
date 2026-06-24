/* ============================================================
   PlasmaMade Partner Center — Content data layer
   Bron: Totaalbrochure EU-NL 2026, UltraFine folder, Techniekblad,
   Huisstijlhandboek v1.3, productdocumentatie.
   Dit bestand fungeert als lichtgewicht "CMS": pagina's renderen
   hun inhoud op basis van onderstaande structuren.
   ============================================================ */
window.PM_DATA = (function () {

  /* ---------------- PRODUCTEN ---------------- */
  const products = [
    {
      id: "guc1223",
      name: "GUC1223",
      flagship: true,
      type: "E-Filter · rond · design- & wandafzuigkap",
      family: "E-Filter",
      image: "assets/img/products/guc1223.png",
      tagline: "Het vlaggenschip — voor design- en wandafzuigkappen tot 1.000 m³/h.",
      description: "De GUC1223 is het meest verkochte PlasmaMade E-Filter en de standaard voor moderne keukens en designkappen. Dankzij de combinatie van plasma, ESD-hoogspanning en ceramic foam wordt de lucht volledig gereinigd en teruggegeven aan de ruimte — zonder afvoer naar buiten.",
      benefits: [
        "Verwijdert geuren, fijnstof, virussen, bacteriën, pollen en allergenen — tot 98% gefilterd",
        "Werkt op recirculatie: geen afvoer naar buiten nodig",
        "10–15 jaar levensduur — nooit meer een wegwerpfilter",
        "Klikmontage met draai-klem sluiting, zonder extra materialen",
        "WiFi + Bluetooth aansturing via de PlasmaMade-app",
        "97% recyclebaar · gepatenteerd Nederlands product"
      ],
      specs: {
        "EAN": "872 086 512 0034",
        "Certificering": "CE · UKCA · ROHS · RED",
        "Max. luchtdoorvoer": "1.000 m³/h",
        "Spanning": "240V / 12VDC 1,5A adapter",
        "Max. vermogen": "8W",
        "Stand-by": "0,45W",
        "Aansluiting": "Ø147/Ø151 mm of Ø122/Ø126 mm",
        "Afmetingen filter": "Ø165 × 282 mm",
        "Aansluitlengte": "257 mm",
        "Gewicht filter": "1.000 gr",
        "Gewicht in doos": "2.000 gr",
        "Verpakking": "420 × 195 × 195 mm",
        "Pallet (30 st.)": "1.200 × 800 × 1.200 mm / ±90 kg",
        "Levensduur": "10–15 jaar / ±9.000 uur",
        "Garantie": "2 jaar · 5 jaar na registratie",
        "Materiaal": "ABS, zwart"
      },
      applications: ["Moderne keukens", "Designafzuigkappen", "Wandkappen", "Eilandkappen", "Renovatie & nieuwbouw"],
      audiences: ["Consument", "Installateur", "Keukenstudio / retailer"],
      installation: "Klik de GUC1223 op de bestaande aansluiting van de afzuigkap (Ø122/126 of Ø147/151 mm) en zet vast met de draai-klem sluiting. Sluit de 12V-adapter aan. In enkele minuten gemonteerd, zonder gereedschap of verbouwing. De servicemonteur stuurt het filter draadloos aan via WiFi/Bluetooth.",
      maintenance: "Onderhoudsvrij gedurende de levensduur. Geen filterwissel nodig. De filter­sensoren detecteren de airflow en sturen het E-Filter automatisch aan. Registreer het product op plasmamade.com voor 5 jaar garantie.",
      salesArguments: [
        "Past op vrijwel elke afzuigkap — ook designkappen — dankzij twee aansluitmaten.",
        "10–15 jaar geen filter wisselen versus jaarlijks vervangen bij koolstoffilters.",
        "Geen doorbraak naar buiten nodig: ideaal voor appartementen en renovaties.",
        "Premium uitstraling met aantoonbare gezondheidswinst voor de klant."
      ],
      certifications: ["CE", "UKCA", "ROHS", "RED"],
      videoNote: "Productanimatie + montagevideo (wandmontage) beschikbaar in Marketingmateriaal.",
      downloads: ["productsheet-guc1223", "handleiding-guc1223", "techniekblad-nl"]
    },
    {
      id: "guc1212",
      name: "GUC1212",
      flagship: false,
      type: "E-Filter · rond · compact",
      family: "E-Filter",
      image: "assets/img/products/guc1212.png",
      tagline: "Compact en rond — voor kleinere of bestaande afzuigkappen tot 600 m³/h.",
      description: "De GUC1212 is de compacte uitvoering van het PlasmaMade E-Filter, ontworpen voor bestaande keukens met een ronde Ø100 mm aansluiting. Dezelfde bewezen plasma- en ESD-technologie in een kleiner formaat.",
      benefits: [
        "Compact formaat — perfect voor bestaande, kleinere afzuigkappen",
        "Verwijdert geuren, fijnstof, pollen, bacteriën en virussen",
        "Recirculatie: geen afvoer naar buiten nodig",
        "10–15 jaar levensduur",
        "Eenvoudige klikmontage op Ø100 mm aansluiting",
        "97% recyclebaar"
      ],
      specs: {
        "EAN": "817 795 328 3535",
        "Certificering": "CE",
        "Max. luchtdoorvoer": "600 m³/h",
        "Spanning": "240V / 12VDC 1,5A adapter",
        "Max. vermogen": "8W",
        "Stand-by": "0,45W",
        "Aansluiting": "Ø100 mm",
        "Afmetingen filter": "Ø180 × 170 mm",
        "Gewicht filter": "800 gr",
        "Gewicht in doos": "1.600 gr",
        "Verpakking": "290 × 230 × 200 mm",
        "Pallet (30 st.)": "1.200 × 800 × 800 mm / ±75 kg",
        "Levensduur": "10–15 jaar / ±9.000 uur",
        "Garantie": "2 jaar · 5 jaar na registratie",
        "Materiaal": "ABS, zwart"
      },
      applications: ["Bestaande keukens", "Kleinere afzuigkappen", "Ø100 mm aansluiting", "Renovatie"],
      audiences: ["Consument", "Installateur"],
      installation: "Klik de GUC1212 op de ronde Ø100 mm aansluiting van de bestaande afzuigkap en sluit de 12V-adapter aan. Geen verbouwing nodig.",
      maintenance: "Onderhoudsvrij. Geen filterwissel. Registreer op plasmamade.com voor 5 jaar garantie.",
      salesArguments: [
        "De toegankelijke oplossing voor klanten met een bestaande kap met Ø100 mm aansluiting.",
        "Maakt elke bestaande recirculatiekap geschikt voor volledige luchtreiniging.",
        "Identieke gezondheidsvoordelen als de GUC1223, in compact formaat."
      ],
      certifications: ["CE"],
      downloads: ["productsheet-guc1212"]
    },
    {
      id: "guc1323",
      name: "GUC1323",
      flagship: false,
      type: "E-Filter · plat · kookplaat­afzuiging",
      family: "E-Filter",
      image: "assets/img/products/guc1323.png",
      tagline: "Plat formaat — voor kookplaten met geïntegreerde afzuiging tot 1.000 m³/h.",
      description: "De GUC1323 is het platte, rechthoekige E-Filter voor kookplaten met geïntegreerde afzuiging — zonder losse afzuigkap. Ideaal voor strakke, open keukens waarin de afzuiging onzichtbaar in het werkblad is verwerkt.",
      benefits: [
        "Speciaal voor kookplaten met geïntegreerde afzuiging",
        "Plat ontwerp — montage onder de plint of aan de wand",
        "Verwijdert geuren, fijnstof, virussen, bacteriën en allergenen",
        "Recirculatie: geen afvoer naar buiten nodig",
        "10–15 jaar levensduur",
        "WiFi + Bluetooth aansturing via de app"
      ],
      specs: {
        "EAN": "872 086 512 0041",
        "Certificering": "CE · UKCA · ROHS · RED",
        "Max. luchtdoorvoer": "1.000 m³/h",
        "Spanning": "240V / 12VDC 1,5A adapter",
        "Max. vermogen": "8W",
        "Stand-by": "0,45W",
        "Aansluiting": "220 × 90 mm (rechthoekig)",
        "Afmetingen filter": "309 × 328 × 90 mm",
        "Aansluitlengte": "280 mm",
        "Gewicht filter": "1.400 gr",
        "Gewicht in doos": "2.400 gr",
        "Verpakking": "450 × 340 × 120 mm",
        "Pallet (30 st.)": "1.200 × 800 × 900 mm / ±100 kg",
        "Levensduur": "10–15 jaar / ±9.000 uur",
        "Garantie": "2 jaar · 5 jaar na registratie",
        "Materiaal": "ABS, zwart"
      },
      applications: ["Open keukens", "Kookplaat met afzuiging", "Onder de plint", "Wandmontage", "Designkeukens"],
      audiences: ["Consument", "Installateur", "Keukenstudio / retailer"],
      installation: "Sluit de GUC1323 aan op de rechthoekige 220 × 90 mm aansluiting van de geïntegreerde kookplaatafzuiging. Montage onder de plint of aan de wand, afhankelijk van de keukenopstelling. Lijntekeningen voor beide montagewijzen beschikbaar in Downloads.",
      maintenance: "Onderhoudsvrij gedurende de levensduur. Geen filterwissel nodig. Registreer op plasmamade.com voor 5 jaar garantie.",
      salesArguments: [
        "Dé oplossing voor de snelgroeiende markt van kookplaten met geïntegreerde afzuiging.",
        "Onzichtbaar weggewerkt: behoudt het strakke design van de open keuken.",
        "Geen afvoer naar buiten nodig in appartementen en moderne nieuwbouw."
      ],
      certifications: ["CE", "UKCA", "ROHS", "RED"],
      videoNote: "Productanimatie + wandmontagevideo beschikbaar in Marketingmateriaal.",
      downloads: ["productsheet-guc1323", "handleiding-guc1323", "techniekblad-nl"]
    },
    {
      id: "airclean-ultrafine",
      name: "AirClean UltraFine",
      flagship: false,
      type: "Air Cleaner · standalone · professioneel",
      family: "Air Cleaner",
      image: "assets/img/ultrafine/ultrafine.jpg",
      tagline: "Luchtkwaliteit op het hoogste niveau, binnen jouw organisatie — cleanroomkwaliteit zonder de cleanroom.",
      description: "De AirClean UltraFine combineert twee toptechnologieën — de GUC4184 ESP-filter en het GUC1223 E-filter (ESD) — tot het krachtigste duo op de markt. Een vrijstaande unit die fijnstof, geuren, allergenen en micro-organismen maximaal reduceert in commerciële en professionele ruimtes.",
      benefits: [
        "ESP + ESD: het krachtigste duo op de markt",
        "Tot 85% minder fijnstof · tot 98% virussen en bacteriën",
        "Vergelijkbaar met een ISO 6/7 cleanroom (Interflow-test 2024)",
        "Geschikt voor ruimtes van 20 tot 150 m²",
        "Drie standen tot max. 700 m³/h + automatische stand",
        "Vaatwasserbestendige ESP-plaatmodule — geen wegwerpfilters"
      ],
      specs: {
        "Systeem": "GUC4184 ESP + GUC1223 ESD",
        "Afmetingen": "100 cm hoog × 30 cm breed × 35 cm diep",
        "Geschikt voor": "20 – 150 m² (meerdere units voor grotere ruimtes)",
        "Luchtcapaciteit": "400 m³/h standaard · max. 700 m³/h",
        "Stand 1": "200 m³/h",
        "Stand 2": "550 m³/h",
        "Automatische stand": "Afhankelijk van aantal personen in de ruimte",
        "Fijnstof reductie": "Tot 85%",
        "Ziekteverwekkers": "Tot 98% gefilterd",
        "Levensduur": "10 – 15 jaar / ±9.000 uur",
        "Onderhoud": "Vaatwasserbestendige ESP-plaatmodule",
        "Certificering": "CE · UKCA · ROHS · RED"
      },
      applications: ["Kantoor", "Detailhandel", "Sportaccommodatie", "Horeca", "Zorginstelling", "Klaslokaal", "Wachtruimte"],
      audiences: ["Zakelijk / professioneel", "Zorg", "Horeca", "Facility / installateur"],
      installation: "Stekkerklaar geleverd. Plaats de unit in de ruimte en sluit aan op het stopcontact. Optioneel: hybride plafondmodel met extra buitenluchttoevoer, volledig geïntegreerd en aan te sluiten op bestaande kanalen.",
      maintenance: "De ESP-plaatmodule wordt eenvoudig gereinigd in de vaatwasser. Na droging klik je deze terug en is het systeem direct weer klaar voor gebruik. Geen wegwerpfilters, geen degeneratie — 100% kwaliteit gedurende de levensduur.",
      salesArguments: [
        "Onafhankelijk getest door Interflow (2024): vrijwel identieke deeltjesreductie als een HEPA-filter (R² = 0,996).",
        "ISO 6 is honderd keer schoner dan een gemiddeld kantoor — die zekerheid zonder cleanroom-investering.",
        "Geen wegwerpfilters: lager energieverbruik, minder geluid, lagere CO₂-uitstoot.",
        "Zorgplicht & productiviteit: een gezond binnenklimaat als investering, niet als kostenpost."
      ],
      certifications: ["CE", "UKCA", "ROHS", "RED"],
      videoNote: "Toepassingsbeelden (kantoor, school, horeca) en de Interflow-grafiek beschikbaar in Marketingmateriaal.",
      downloads: ["folder-ultrafine-nl", "leaflet-table-air-cleaner-nl"]
    },
    {
      id: "guc4184-esp",
      name: "GUC4184 ESP-filter",
      flagship: false,
      type: "Component · onderdeel van AirClean UltraFine",
      family: "Air Cleaner",
      image: "assets/img/ultrafine/esp.png",
      tagline: "De ESP-bouwsteen van de AirClean UltraFine: elektrostatische precisie zonder filtermateriaal.",
      description: "De GUC4184 is een Electrostatic Precipitator (ESP): een geavanceerd luchtzuiveringssysteem dat werkt met elektrostatische aantrekking. In plaats van lucht door een dicht filter te persen, gebruikt de ESP elektrische ladingen om verontreinigingen actief aan te trekken en vast te houden — stil, efficiënt en duurzaam.",
      benefits: [
        "Geen dichte vezelstructuur → minimale luchtweerstand",
        "Lager energieverbruik: ventilatoren leveren minder kracht",
        "Minder geluid: lucht stroomt soepel door het systeem",
        "Vaatwasserbestendige plaatmodule — eindeloos herbruikbaar",
        "Lagere CO₂-uitstoot dankzij efficiënter energiebeheer",
        "100% kwaliteit zonder degeneratie"
      ],
      specs: {
        "Type": "Electrostatic Precipitator (ESP)",
        "Werking": "Ionisatie + elektrostatische aantrekking",
        "Filtermateriaal": "Geen — geen wegwerpfilters",
        "Onderhoud": "Vaatwasserbestendige plaatmodule",
        "Toepassing": "Onderdeel van AirClean UltraFine / recirculatiesystemen",
        "Voordeel": "Constante luchtkwaliteit bij minimaal energieverbruik"
      },
      applications: ["Recirculatiesystemen", "AirClean UltraFine", "Hybride plafondmodel", "Professionele luchtzuivering"],
      audiences: ["Zakelijk / professioneel", "Installateur / facility"],
      installation: "Integreerbaar onderdeel van de AirClean UltraFine en recirculatiesystemen. De plaatmodule is uitneembaar voor reiniging.",
      maintenance: "Het verzamelde vuil is onschadelijk en eenvoudig te verwijderen. De plaatmodule is uitneembaar en vaatwasserbestendig. Na droging terugplaatsen — de ESP is direct weer klaar voor gebruik.",
      salesArguments: [
        "Geen wegwerpfilters: jarenlang herbruikbaar, minder afval en lagere kosten.",
        "Minimale luchtweerstand = lager energieverbruik in recirculatiesystemen.",
        "Combineert met het GUC1223 E-filter tot de AirClean UltraFine."
      ],
      certifications: ["CE", "UKCA", "ROHS", "RED"],
      downloads: ["folder-esp-heat-exchanger"]
    },
    {
      id: "table-air-cleaner",
      name: "Table Air Cleaner",
      flagship: false,
      type: "Air Cleaner · tafelmodel · persoonlijk",
      family: "Air Cleaner",
      image: "assets/img/products/table-air-cleaner.png",
      tagline: "Je eigen ‘clean bubble’ — thuis, op kantoor of onderweg.",
      description: "De Table Air Cleaner brengt de bewezen PlasmaMade-technologie naar het bureau en kleine ruimtes. Een compact tafelmodel dat geuren, fijnstof en micro-organismen reduceert in de directe omgeving — ideaal voor balies, behandelkamers, kantoren en thuiswerkplekken.",
      benefits: [
        "Compact tafelmodel — direct schone lucht in de persoonlijke ruimte",
        "Plasma- en elektrostatische zuiveringstechnologie",
        "Stil in gebruik, geschikt voor kantoor en thuiswerkplek",
        "Onderhoudsvriendelijk, herbruikbare filtermodule",
        "Plug & play: direct klaar voor gebruik"
      ],
      specs: {
        "Type": "Tafelmodel luchtzuiveraar",
        "Toepassing": "Werkplek, balie, behandelkamer, kleine ruimte",
        "Technologie": "Plasma + elektrostatische zuivering",
        "Onderhoud": "Herbruikbare filtermodule",
        "Specificaties": "Volledige specs op aanvraag via sales@plasmamade.com"
      },
      applications: ["Werkplek / bureau", "Balie & receptie", "Behandelkamer", "Thuiskantoor", "Kleine ruimtes"],
      audiences: ["Zakelijk / professioneel", "Zorg", "Consument"],
      installation: "Plaats het tafelmodel op het bureau of de balie en sluit aan op het stopcontact. Plug & play.",
      maintenance: "Herbruikbare filtermodule, eenvoudig te reinigen. Geen wegwerpfilters.",
      salesArguments: [
        "Persoonlijke luchtzuivering voor de werkplek — een toegankelijk instapproduct.",
        "Ideaal voor balies en behandelkamers waar mensen dicht bij elkaar komen.",
        "Brengt het PlasmaMade-merk naar een nieuwe doelgroep."
      ],
      certifications: ["CE"],
      downloads: ["leaflet-table-air-cleaner-nl"]
    }
  ];

  /* ---------------- KENNISBANK ---------------- */
  const articles = [
    {
      id: "binnenluchtkwaliteit", category: "Gezondheid", icon: "wind",
      title: "Binnenluchtkwaliteit: waarom het ertoe doet",
      excerpt: "We brengen ruim 90% van onze tijd binnen door. Toch is de lucht binnen vaak vervuilder dan buiten. Wat dat betekent en hoe je het oplost.",
      read: "4 min",
      body: `<p class="lead">Schone binnenlucht is geen luxe maar een noodzaak. We brengen gemiddeld meer dan 90% van onze tijd binnen door — thuis, op kantoor, op school. Toch is de luchtkwaliteit binnenshuis vaak slechter dan buiten.</p>
      <h2>Waar komt binnenluchtvervuiling vandaan?</h2>
      <p>Koken, schoonmaakmiddelen, bouwmaterialen, meubels, huisdieren en mensen zelf brengen voortdurend deeltjes en gassen in de lucht. In goed geïsoleerde, energiezuinige woningen blijft die vervuiling langer hangen omdat er minder natuurlijke ventilatie is.</p>
      <h3>De belangrijkste vervuilers</h3>
      <ul class="bullets">
        <li>Fijnstof en ultrafijnstof (o.a. verbrandingsdeeltjes bij het koken)</li>
        <li>Vluchtige organische stoffen (VOS) en kookgeuren</li>
        <li>Allergenen: pollen, huisstofmijt, huisdierallergenen</li>
        <li>Ziekteverwekkers: virussen, bacteriën en aerosolen</li>
      </ul>
      <div class="callout"><strong>Ter vergelijking:</strong> in een gemiddeld kantoor zweven meer dan 30 miljoen deeltjes per kubieke meter. In een ISO 6 cleanroom maximaal 35.200.</div>
      <h2>De PlasmaMade-oplossing</h2>
      <p>PlasmaMade E-Filters reinigen de lucht via recirculatie: de lucht wordt meerdere keren per uur door het filter geleid en schoner teruggegeven aan de ruimte. Zo verbetert de luchtkwaliteit meetbaar — dag in, dag uit — zonder afvoer naar buiten.</p>`,
      related: ["plasmafiltratie", "fijnstof", "recirculatie"]
    },
    {
      id: "plasmafiltratie", category: "Techniek", icon: "zap", videoId: "guc1223-werking",
      title: "Hoe werkt een PlasmaMade E-Filter?",
      excerpt: "Drie actieve lagen — plasma, ESD-hoogspanning en ceramic foam — reinigen de lucht volledig. Een heldere uitleg van de techniek.",
      read: "5 min",
      body: `<p class="lead">Het PlasmaMade E-Filter werkt via drie actieve lagen die samen geuren, deeltjes en micro-organismen afbreken. Sensoren detecteren de airflow en sturen het filter automatisch aan.</p>
      <h2>De drie lagen</h2>
      <h3>1. Plasma element</h3>
      <p>Met hoogspanning wordt plasma gecreëerd. Dit plasma neutraliseert geuren en micro-organismen op moleculair niveau.</p>
      <h3>2. ESD-filter (Electrostatic Discharge)</h3>
      <p>Het ESD-filter gebruikt hoogspanning (4 kV) voor het afbreken van grove verontreinigingen: vet, fijnstof, pollen en bacteriën.</p>
      <h3>3. Ceramic foam</h3>
      <p>Neutraliseert de laatste stoffen in de lucht en zorgt samen met de conische binnenkelk voor een geluiddempende werking. Het zwarte uiterlijk zorgt voor een nette afwerking.</p>
      <div class="callout"><strong>Filter sensoren</strong> detecteren de airflow en sturen het E-filter aan — volledig automatisch, afgestemd op het gebruik.</div>
      <h2>Wat wordt geëlimineerd?</h2>
      <ul class="bullets">
        <li>Kookgeuren & vluchtige organische stoffen (VOS)</li>
        <li>Fijnstof, ook microscopisch kleine verbrandingsdeeltjes</li>
        <li>Virussen, bacteriën en aerosolen — tot 98% gefilterd</li>
        <li>Pollen, huisstofmijt en huisdierallergenen</li>
        <li>Schimmels en schadelijke gassen</li>
      </ul>`,
      related: ["recirculatie", "bacterien-virussen", "fijnstof"]
    },
    {
      id: "recirculatie", category: "Techniek", icon: "refresh",
      title: "Recirculatie: schone lucht zonder afvoer naar buiten",
      excerpt: "Geen doorbraak, geen warmteverlies. Hoe recirculatietechnologie de lucht reinigt en teruggeeft aan de ruimte.",
      read: "3 min",
      body: `<p class="lead">PlasmaMade werkt op basis van recirculatie: de gefilterde lucht blijft in de woning. Er is geen afvoer naar buiten nodig.</p>
      <h2>Waarom recirculatie?</h2>
      <p>Bij traditionele afzuiging wordt vervuilde lucht — én de verwarmde of gekoelde binnenlucht — naar buiten geblazen. Dat kost energie en vraagt om een doorbraak in de gevel. Recirculatie reinigt de lucht en geeft die schoon terug aan de ruimte.</p>
      <ul class="bullets">
        <li>Geen doorbraak naar buiten nodig — ideaal voor appartementen en renovatie</li>
        <li>Geen warmteverlies: de verwarmde lucht blijft binnen</li>
        <li>Minder geluid dan traditionele afvoersystemen</li>
        <li>De lucht wordt meerdere keren per uur gereinigd voor constante kwaliteit</li>
      </ul>
      <div class="callout"><strong>Voor recirculatiesystemen</strong> waar lucht voortdurend door het filter circuleert, is de lage luchtweerstand van PlasmaMade een enorme winst: constante luchtkwaliteit bij minimaal energieverbruik.</div>`,
      related: ["plasmafiltratie", "energiebehoud", "binnenluchtkwaliteit"]
    },
    {
      id: "fijnstof", category: "Gezondheid", icon: "cloud",
      title: "Fijnstof — onzichtbaar, maar overal",
      excerpt: "Verbrandingsdeeltjes, rook en stof tot op micronniveau. Wat fijnstof is en hoe PlasmaMade het afbreekt.",
      read: "3 min",
      body: `<p class="lead">Fijnstof bestaat uit microscopisch kleine deeltjes die diep in de longen kunnen doordringen. Koken is binnenshuis een belangrijke bron.</p>
      <h2>Bronnen van fijnstof binnenshuis</h2>
      <ul class="bullets">
        <li>Verbrandingsstoffen bij bakken, braden en grillen</li>
        <li>Rook en roet</li>
        <li>Stof van textiel, bouwmaterialen en buitenlucht</li>
      </ul>
      <h2>Hoe PlasmaMade fijnstof aanpakt</h2>
      <p>Het ESD-filter (4 kV hoogspanning) breekt zelfs microscopisch kleine grove deeltjes af. De AirClean UltraFine realiseert in professionele ruimtes tot 85% minder fijnstof.</p>
      <div class="callout"><strong>Bewezen:</strong> in de Interflow-test (2024) daalde de deeltjesconcentratie van circa 115 miljoen naar minder dan 1 miljoen deeltjes/m³ binnen 25 minuten — vrijwel identiek aan een HEPA-filter.</div>`,
      related: ["bacterien-virussen", "cleanroom", "binnenluchtkwaliteit"]
    },
    {
      id: "pollen-allergenen", category: "Gezondheid", icon: "flower",
      title: "Pollen & allergenen het hele jaar door",
      excerpt: "Pollen, huisstofmijt en huisdierallergenen veroorzaken klachten. Schone binnenlucht geeft verlichting.",
      read: "3 min",
      body: `<p class="lead">Voor mensen met allergieën of luchtwegklachten is de lucht binnenshuis cruciaal. Pollen, huisstofmijt en huisdierallergenen worden door PlasmaMade uit de lucht gehaald.</p>
      <h2>Allergenen die worden verwijderd</h2>
      <ul class="bullets">
        <li>Pollen — van boom-, gras- en kruidachtige planten</li>
        <li>Huisstofmijt en uitwerpselen daarvan</li>
        <li>Huisdierallergenen</li>
      </ul>
      <div class="callout"><strong>Seizoenshook:</strong> "Filter de lente buiten. Adem vrij binnen." Pollen­communicatie werkt sterk in maart–mei.</div>
      <h2>Voor wie?</h2>
      <p>Gezinnen met allergische klachten, mensen met astma of hooikoorts en iedereen die binnen vrij wil ademhalen. Een empathische, bewijsgerichte boodschap werkt het best bij deze doelgroep.</p>`,
      related: ["binnenluchtkwaliteit", "plasmafiltratie", "toepassingen"]
    },
    {
      id: "geuren-vos", category: "Gezondheid", icon: "nose",
      title: "Geuren & VOS: koken zonder de luchtjes",
      excerpt: "Alle soorten geuren en vluchtige organische stoffen worden door het plasma-element afgebroken.",
      read: "2 min",
      body: `<p class="lead">Koken ruikt — ademhalen hoeft dat niet. Het plasma-element neutraliseert geuren en vluchtige organische stoffen (VOS) op moleculair niveau.</p>
      <h2>Wat zijn VOS?</h2>
      <p>Vluchtige organische stoffen komen vrij bij koken, maar ook uit schoonmaakmiddelen, verf en meubels. Ze veroorzaken geurhinder en kunnen de luchtkwaliteit verslechteren.</p>
      <div class="callout">"Kook lekker. Adem beter." — de geurvrije keuken is een van de sterkste verkoopargumenten richting consumenten.</div>
      <h2>Het resultaat</h2>
      <p>Geen kookgeuren die in huis blijven hangen, geen geur in gordijnen of meubels. Merkbaar frisser leefcomfort, dag in, dag uit.</p>`,
      related: ["plasmafiltratie", "toepassingen", "duurzaamheid"]
    },
    {
      id: "bacterien-virussen", category: "Gezondheid", icon: "shield",
      title: "Virussen, bacteriën & aerosolen — tot 98% gefilterd",
      excerpt: "Het plasma neutraliseert micro-organismen. Hoe PlasmaMade ziekteverwekkers uit de lucht haalt.",
      read: "3 min",
      body: `<p class="lead">Virussen, bacteriën, aerosolen en andere micro-organismen worden tot 98% uit de lucht gefilterd. Het plasma-element neutraliseert ziekteverwekkers op moleculair niveau.</p>
      <h2>Waarom dit belangrijk is</h2>
      <p>In ruimtes waar veel mensen samenkomen — kantoren, scholen, zorginstellingen, horeca — verspreiden aerosolen ziekteverwekkers snel. Continue luchtzuivering vermindert die verspreiding aanzienlijk.</p>
      <div class="callout"><strong>Claim correct gebruiken:</strong> zeg altijd "tot 98% gefilterd", nooit "doodt alle virussen".</div>
      <h2>Toepassing in de zorg</h2>
      <p>In zorginstellingen is een veilig binnenklimaat van levensbelang. De AirClean UltraFine zorgt voor continue zuivering en beschermt medewerkers, patiënten en bezoekers.</p>`,
      related: ["cleanroom", "toepassingen", "fijnstof"]
    },
    {
      id: "duurzaamheid", category: "Duurzaamheid", icon: "leaf",
      title: "97% recyclebaar: duurzaamheid zonder compromis",
      excerpt: "Geen wegwerpfilter, 10–15 jaar levensduur en herbruikbare modules. De duurzaamheidsverhaal van PlasmaMade.",
      read: "3 min",
      body: `<p class="lead">PlasmaMade is ontworpen voor de lange termijn. 97% recyclebaar materiaal, 10 tot 15 jaar levensduur en geen wegwerpfilters.</p>
      <h2>Duurzaam op alle vlakken</h2>
      <ul class="bullets">
        <li>97% recyclebaar materiaal</li>
        <li>10–15 jaar levensduur / ±9.000 uur — geen jaarlijkse vervanging</li>
        <li>Geen wegwerpfilters — bespaart afval en kosten</li>
        <li>ESP-plaatmodule is vaatwasserbestendig en herbruikbaar</li>
        <li>Lagere CO₂-uitstoot dankzij efficiënt energiebeheer</li>
      </ul>
      <div class="callout"><strong>Sustainability van 97%</strong> — de groene badge die op techniekbladen en duurzaamheidscommunicatie terugkomt.</div>
      <h2>Versus een koolstoffilter</h2>
      <p>Een traditioneel koolstoffilter wordt elk jaar vervangen — wegwerpplastic, telkens opnieuw. Een PlasmaMade E-Filter gaat 10 tot 15 jaar mee. "Geen wegwerpfilter. Nooit meer."</p>`,
      related: ["energiebehoud", "recirculatie", "certificeringen"]
    },
    {
      id: "energiebehoud", category: "Duurzaamheid", icon: "battery",
      title: "Energiebehoud door lage luchtweerstand",
      excerpt: "Geen dichte vezelstructuur betekent minder weerstand, minder energie en minder geluid.",
      read: "2 min",
      body: `<p class="lead">In tegenstelling tot conventionele filtersystemen kent de ESP geen dichte vezelstructuur die de luchtstroom belemmert. Daardoor ontstaat er weinig tot geen luchtweerstand.</p>
      <h2>De voordelen</h2>
      <ul class="bullets">
        <li><strong>Lager energieverbruik:</strong> ventilatoren hoeven minder kracht te leveren</li>
        <li><strong>Minder geluid:</strong> de lucht stroomt soepel door het systeem</li>
        <li><strong>Minder vervanging en afval:</strong> platen jarenlang herbruikbaar</li>
        <li><strong>Lagere CO₂-uitstoot:</strong> dankzij efficiënter energiebeheer</li>
        <li><strong>100% kwaliteit:</strong> zonder degeneratie over de levensduur</li>
      </ul>
      <div class="callout">Bovendien is bij recirculatie geen warmteverlies: de verwarmde binnenlucht blijft binnen in plaats van naar buiten te worden afgevoerd.</div>`,
      related: ["recirculatie", "duurzaamheid", "plasmafiltratie"]
    },
    {
      id: "cleanroom", category: "Techniek", icon: "lab", videoId: "ultrafine-werking",
      title: "Cleanroomtechnologie, toegankelijk gemaakt",
      excerpt: "Wat is een ISO 6/7 cleanroom en hoe haalt de UltraFine-filter datzelfde niveau zonder complexe infrastructuur?",
      read: "5 min",
      body: `<p class="lead">De UltraFine-filter is ontwikkeld volgens dezelfde principes als een ISO 6/7-cleanroom. Waar een traditionele cleanroom volledige constructie en HVAC-integratie vereist, biedt PlasmaMade een compacte, flexibele oplossing.</p>
      <h2>Wat is een cleanroom?</h2>
      <p>Volgens de ISO 14644-1-norm is een cleanroom een ruimte waarin de concentratie van zwevende deeltjes wordt gecontroleerd. De zuiverheid wordt uitgedrukt in ISO-klassen, van ISO 1 (uiterst schoon) tot ISO 9 (vergelijkbaar met een kantoorruimte).</p>
      <h3>ISO-klassen en toepassingen</h3>
      <ul class="bullets">
        <li><strong>ISO 5</strong> — 3.520 deeltjes/m³ — farma aseptisch, micro-elektronica</li>
        <li><strong>ISO 6</strong> — 35.200 deeltjes/m³ — medtech, precisie-assemblage</li>
        <li><strong>ISO 7</strong> — 352.000 deeltjes/m³ — operatiekamers, farmaproductie</li>
        <li><strong>ISO 8</strong> — 3.520.000 deeltjes/m³ — algemene cleanroomproductie</li>
      </ul>
      <div class="callout"><strong>Waarom ISO 6 belangrijk is:</strong> het verschil tussen ISO 8 en ISO 6 is exponentieel — een ISO 6-omgeving is honderd keer schoner dan ISO 8. Ter vergelijking: in een normaal kantoor zweven meer dan 30 miljoen deeltjes per kubieke meter.</div>
      <h2>De UltraFine brengt die zekerheid naar elke ruimte</h2>
      <p>Zonder de investering van een volledige cleanroominstallatie. Compact, flexibel en stekkerklaar.</p>`,
      related: ["interflow", "bacterien-virussen", "fijnstof"]
    },
    {
      id: "interflow", category: "Bewijs", icon: "chart", videoId: "ultrafine-werking",
      title: "Getest door Interflow (2024): zo goed als HEPA",
      excerpt: "Onafhankelijk onderzoek toont een vrijwel identieke deeltjesreductie ten opzichte van een HEPA-filter.",
      read: "4 min",
      body: `<p class="lead">In samenwerking met Interflow BV — specialist in luchtzuiverings- en cleanroomvalidatie — is de AirClean UltraFine uitgebreid getest in een gecontroleerde omgeving van 24,4 m³ met 8 luchtwisselingen per uur.</p>
      <h2>De opzet</h2>
      <p>Doel: de deeltjesreductiecapaciteit vaststellen ten opzichte van een HEPA-filterunit onder identieke omstandigheden. Een gecontroleerde hoeveelheid deeltjes (sigarettenrook) werd in de ruimte gebracht, waarna de concentratie van deeltjes groter dan 0,5 µm elke minuut werd gemeten.</p>
      <h2>De resultaten</h2>
      <ul class="bullets">
        <li>HEPA-filter: 23 minuten om de concentratie met factor 100 te verminderen</li>
        <li>AirClean UltraFine: 24 minuten voor dezelfde reductie</li>
        <li>De concentratie daalde van ±115 miljoen naar <1 miljoen deeltjes/m³ binnen 25 minuten</li>
      </ul>
      <div class="callout"><strong>Correlatiecoëfficiënt (R²): 0,996.</strong> De meetreeksen komen bijna perfect lineair overeen. Het verschil van één minuut is meetkundig te verwaarlozen.</div>
      <p>Conclusie: de AirClean UltraFine presteert vergelijkbaar met een HEPA-filter — zonder wegwerpfilters en bij een lager energieverbruik.</p>`,
      related: ["cleanroom", "fijnstof", "duurzaamheid"]
    },
    {
      id: "certificeringen", category: "Bewijs", icon: "badgeCheck",
      title: "Certificeringen: CE, UKCA, ROHS, RED",
      excerpt: "Wereldwijd goedgekeurd en dubbel gecontroleerd in het eigen testlab. Wat de keurmerken betekenen.",
      read: "3 min",
      body: `<p class="lead">PlasmaMade-producten zijn gecertificeerd en wereldwijd goedgekeurd. De GUC1223 en GUC1323 dragen CE, UKCA, ROHS en RED.</p>
      <h2>De keurmerken</h2>
      <ul class="bullets">
        <li><strong>CE</strong> — voldoet aan EU-richtlijnen voor veiligheid en gezondheid</li>
        <li><strong>UKCA</strong> — toelating voor de Britse markt</li>
        <li><strong>ROHS</strong> — beperking van gevaarlijke stoffen</li>
        <li><strong>RED</strong> — Radio Equipment Directive (voor de WiFi/Bluetooth-functionaliteit)</li>
      </ul>
      <div class="callout"><strong>Dubbele kwaliteitscontrole:</strong> elk product wordt na productie dubbel gecontroleerd in het eigen testlab van PlasmaMade.</div>
      <h2>Een gepatenteerd Nederlands product</h2>
      <p>PlasmaMade is een gepatenteerd Nederlands product — een sterk argument richting retailers en internationale partners.</p>`,
      related: ["duurzaamheid", "interflow", "plasmafiltratie"]
    },
    {
      id: "toepassingen", category: "Toepassingen", icon: "building",
      title: "Toepassingen: van keuken tot zorginstelling",
      excerpt: "Waar PlasmaMade het verschil maakt — keukens, kantoren, scholen, zorg, horeca en publieke gebouwen.",
      read: "4 min",
      body: `<p class="lead">PlasmaMade-technologie is breed inzetbaar. Per omgeving verschilt de boodschap, maar het resultaat is overal hetzelfde: merkbaar schonere lucht.</p>
      <h2>Thuis & keuken</h2>
      <p>Koken zonder geuren, gezonde lucht voor het gezin. GUC1223 voor de meeste kappen, GUC1323 voor kookplaten met geïntegreerde afzuiging.</p>
      <h2>Kantoor</h2>
      <p>Een veilig kantoor maakt het mogelijk dat medewerkers weer dagelijks op locatie kunnen werken. De AirClean UltraFine zorgt voor een gezond binnenklimaat.</p>
      <h2>Detailhandel</h2>
      <p>Een branche waar veel mensen samenkomen. De UltraFine maakt het mogelijk grote aantallen klanten veilig te ontvangen.</p>
      <h2>Sportaccommodatie</h2>
      <p>Door intensieve inspanning ontstaan veel aerosolen. De plasmatechnologie maakt deze onschadelijk.</p>
      <h2>Horeca</h2>
      <p>Perfect binnenklimaat voor gasten, zodat de focus kan liggen op gastvrijheid en beleving.</p>
      <h2>Zorginstelling</h2>
      <p>Een gezond en veilig binnenklimaat is van levensbelang. Continue zuivering beschermt medewerkers, patiënten en bezoekers.</p>`,
      related: ["bacterien-virussen", "cleanroom", "binnenluchtkwaliteit"]
    },
    {
      id: "app-bediening", category: "Techniek", icon: "smartphone",
      title: "Smart bediening: WiFi, Bluetooth & de PlasmaMade-app",
      excerpt: "Het E-Filter is draadloos aan te sturen. Hoe de app en de servicemonteur samenwerken.",
      read: "2 min",
      body: `<p class="lead">PlasmaMade E-Filters zijn uitgerust met WiFi en Bluetooth. Via de PlasmaMade-app worden instellingen draadloos beheerd — ook op afstand door de servicemonteur.</p>
      <h2>Wat kan de app?</h2>
      <ul class="bullets">
        <li>Status en werking van het E-Filter uitlezen</li>
        <li>Verbinden via Bluetooth of WiFi</li>
        <li>Instellingen aanpassen, timer resetten, modus wijzigen</li>
        <li>Draadloze aansturing door de servicemonteur</li>
      </ul>
      <div class="callout">"Bluetooth. WiFi. 10–15 jaar geen filter wisselen." — een sterke tech-hook voor smart-home en installateurscommunicatie.</div>`,
      related: ["plasmafiltratie", "certificeringen", "toepassingen"]
    }
  ];

  /* ---------------- CAMPAGNES ---------------- */
  const campaigns = [
    {
      id: "get-fresh", status: "Doorlopend", title: "Get fresh!",
      period: "Hele jaar door", audience: "Consument",
      owner: "PlasmaMade Marketing", goal: "Merkbekendheid en voorkeur opbouwen bij consumenten met een consistente, positieve boodschap rond schone lucht.",
      image: "assets/img/social/li-get-fresh.jpg",
      core: "Fris, direct en positief: schone lucht als vanzelfsprekend onderdeel van een gezond leven.",
      description: "Get fresh! is de overkoepelende consumentencampagne van PlasmaMade. De rode draad door alle social, advertenties en brochures. Altijd gekoppeld aan de pay-off breathe better, live better.",
      channels: ["Instagram", "Facebook", "LinkedIn", "Print", "Beurs"],
      captions: [
        "Koken zonder de geuren. Leven met schone lucht. ✓\n\nGeen filter wisselen, 10 tot 15 jaar lang.\n→ plasmamade.com\n\n#GetFresh #PlasmaMade #SchoneLucht #Luchtkwaliteit",
        "Get fresh! 🌿 Virussen, pollen, fijnstof — weg.\nAdem het verschil, dag in, dag uit.\n→ plasmamade.com\n\n#GetFresh #BreatheBetter #PlasmaMade"
      ],
      assets: ["li-get-fresh", "li-algemeen", "foto-vlinders"],
      planning: ["Doorlopend inzetbaar", "Versterken bij seizoenshooks", "Basis voor alle merkcommunicatie"]
    },
    {
      id: "plus-x-award", status: "Actueel — Award", title: "Plus X Award 2025",
      period: "2025 – 2026", audience: "Alle doelgroepen",
      owner: "PlasmaMade Marketing", goal: "De Plus X Award 2025 inzetten als internationaal erkend kwaliteitsbewijs in elke verkoop- en marketinguiting.",
      image: "assets/img/lifestyle/award.png",
      core: "Internationaal bekroond: de PlasmaMade E-Filter won de Plus X Award 2025 in vijf categorieën.",
      description: "Zet de Plus X Award 2025 in als hét bewijs van kwaliteit en innovatie. De PlasmaMade E-Filter werd onderscheiden in vijf categorieën tegelijk: Innovation, High Quality, Functionality, Ergonomics en Ecology. Een sterk, internationaal erkend keurmerk dat je verkoopverhaal direct kracht bijzet.",
      channels: ["LinkedIn", "Instagram", "Showroom", "E-mail", "Beurs"],
      captions: [
        "Bekroond! 🏆 De PlasmaMade E-Filter wint de Plus X Award 2025 — in vijf categorieën tegelijk:\nInnovation · High Quality · Functionality · Ergonomics · Ecology.\n\nGet fresh! → plasmamade.com\n\n#PlusXAward #PlasmaMade #GetFresh #Innovation #CleanAir",
        "Vijf keer bekroond, één doel: schone lucht. 🌿\nDe PlasmaMade E-Filter is winnaar van de Plus X Award 2025.\n→ plasmamade.com\n\n#PlusXAward #PlasmaMade #Duurzaam"
      ],
      assets: ["award", "li-certificeringen"],
      planning: ["Direct inzetbaar", "Toevoegen aan e-mailhandtekening", "Tonen in de showroom", "Koppelen aan offertes"]
    },
    {
      id: "filter-de-lente", status: "Seizoen — Lente", title: "Filter de lente buiten",
      period: "Maart – mei", audience: "Consument / allergie",
      owner: "PlasmaMade Marketing", goal: "Vraag creëren bij allergiegevoelige consumenten tijdens het pollenseizoen (maart–mei).",
      image: "assets/img/lifestyle/butterflies-kitchen.jpg",
      core: "Pollen buiten, vrij ademen binnen. Empathische, bewijsgerichte boodschap voor allergiegevoeligen.",
      description: "Seizoenscampagne rond het pollenseizoen. Richt zich op gezinnen en mensen met hooikoorts of luchtwegklachten. Empathische toon, met bewijs: pollen en allergenen worden uit de lucht gehaald.",
      channels: ["Instagram", "Facebook", "Google Ads"],
      captions: [
        "Filter de lente buiten. Adem vrij binnen. 🌸\n\nPollen, huisstofmijt en allergenen — uit je lucht.\n→ plasmamade.com\n\n#GetFresh #Pollen #Allergenen #SchoneLucht",
        "Hooikoorts? Binnen hoef je er geen last van te hebben.\nPlasmaMade haalt pollen uit de lucht. 🌿\n→ plasmamade.com\n\n#PlasmaMade #GezondWonen #Allergie"
      ],
      assets: ["foto-vlinders", "li-get-fresh"],
      planning: ["Start: begin maart (eerste pollen)", "Piek: april", "Uitfaseren: eind mei"]
    },
    {
      id: "cleanroom-zonder-cleanroom", status: "Actief — B2B", title: "Cleanroomkwaliteit. Zonder de cleanroom.",
      period: "Doorlopend", audience: "Zakelijk / zorg",
      owner: "PlasmaMade Marketing", goal: "Leads genereren bij zakelijke beslissers met bewijs-gestuurde communicatie rond de AirClean UltraFine.",
      image: "assets/img/ultrafine/kantoor.jpg",
      core: "De AirClean UltraFine brengt ISO 6/7-luchthygiëne naar elke professionele ruimte — bewezen door Interflow.",
      description: "B2B-campagne voor de AirClean UltraFine, gericht op kantoren, zorg, horeca, retail en sport. Bewijs-gestuurd: Interflow-test, ISO-vergelijking, ROI en zorgplicht.",
      channels: ["LinkedIn", "White papers", "Vakbladen", "Offertes"],
      captions: [
        "De luchtkwaliteit in uw bedrijf bepaalt de productiviteit van uw team.\n\nPlasmaMade AirClean UltraFine haalt tot 98% van virussen en bacteriën uit de lucht — vergelijkbaar met een ISO 6/7 cleanroom.\n\nMeer weten? → plasmamade.com\n\n#Binnenluchtkwaliteit #CleanAir #Innovatie",
        "Een ISO 6-omgeving is honderd keer schoner dan een gemiddeld kantoor.\n\nMet de AirClean UltraFine brengt u die zekerheid naar elke ruimte — zonder cleanroom-investering.\n\nDownload de productsheet → plasmamade.com\n\n#Cleantech #Zorg #Luchtkwaliteit"
      ],
      assets: ["li-certificeringen", "render-ultrafine", "foto-kantoor"],
      planning: ["Doorlopend", "Koppelen aan branchespecifieke events", "Inzetten bij offertetrajecten"]
    },
    {
      id: "showroommateriaal", status: "Doorlopend", title: "Showroommateriaal voor partners",
      period: "Doorlopend", audience: "Keukenstudio / retailer",
      owner: "PlasmaMade Marketing", goal: "Partners helpen om PlasmaMade correct, rustig en premium in de showroom te presenteren.",
      image: "assets/img/social/li-new-efilters.jpg",
      core: "Heldere productuitleg voor keukenstudio's, installateurs en dealers.",
      description: "Doorlopend inzetbaar materiaal voor showrooms, adviesgesprekken en lokale communicatie. De nadruk ligt op actuele PlasmaMade-productinformatie, correcte claims en goedgekeurde assets.",
      channels: ["Showroom", "Dealer-mailing", "Social", "Print"],
      captions: [
        "Maak kennis met PlasmaMade: slimme recirculatie, langdurige prestaties en schone lucht in de keuken.\n\nVraag uw dealer naar de juiste PlasmaMade-oplossing.\n→ plasmamade.com\n\n#PlasmaMade #GetFresh #SchoneLucht"
      ],
      assets: ["li-new-efilters", "li-certificeringen"],
      planning: ["Doorlopend inzetbaar", "Koppelen aan productadvies", "Alleen gebruiken met actuele PlasmaMade-assets"]
    },
    {
      id: "eventmateriaal", status: "Doorlopend", title: "Beurs- en eventmateriaal",
      period: "Doorlopend", audience: "Retailers / pers / internationaal",
      owner: "PlasmaMade Sales & Marketing", goal: "Partners voorzien van premium materiaal voor beurzen, events en showroomdagen.",
      image: "assets/img/social/li-algemeen.jpg",
      core: "PlasmaMade professioneel presenteren met productbeelden, korte bewijsvoering en consistente merkuitstraling.",
      description: "Materiaal voor dealerbijeenkomsten, showroomdagen en internationale events. Gebruik het als basis voor uitnodigingen, LinkedIn-posts en presentaties.",
      channels: ["Event", "LinkedIn", "Pers", "Dealer-uitnodiging"],
      captions: [
        "Ontdek PlasmaMade live: Clean Air Technology voor keukens en professionele ruimtes.\n\nMeer weten? → plasmamade.com\n\n#PlasmaMade #GetFresh #CleanAirTechnology"
      ],
      assets: ["li-algemeen", "li-get-fresh"],
      planning: ["Voorbereiding per event", "Gebruik actuele productcontent", "Leads en vragen opvolgen via sales"]
    },
    {
      id: "geen-wegwerpfilter", status: "Thema — Duurzaamheid", title: "Geen wegwerpfilter. Nooit meer.",
      period: "Doorlopend", audience: "Consument / B2B",
      owner: "PlasmaMade Marketing", goal: "Duurzaamheid als doorslaggevend koopargument positioneren tegenover jaarlijks vervangen koolstoffilters.",
      image: "assets/img/social/li-certificeringen.jpg",
      core: "97% recyclebaar, 10–15 jaar levensduur. Duurzaamheid als koopargument tegenover wegwerp-koolstoffilters.",
      description: "Thematische duurzaamheidscampagne. Zet de levensduur en recyclebaarheid af tegen jaarlijks vervangen koolstoffilters. Sterk in combinatie met de groene Sustainability-badge.",
      channels: ["Instagram", "LinkedIn", "Print"],
      captions: [
        "Elk jaar een nieuw filter? Niet meer. ♻️\n\nEen PlasmaMade E-Filter gaat 10 tot 15 jaar mee. 97% recyclebaar.\n→ plasmamade.com\n\n#Duurzaam #GetFresh #PlasmaMade #CleanAir"
      ],
      assets: ["li-certificeringen", "award"],
      planning: ["Doorlopend", "Versterken rond duurzaamheidsmomenten", "Koppelen aan certificeringscommunicatie"]
    }
  ];

  /* ---------------- NIEUWS & UPDATES ---------------- */
  const news = [
    {
      id: "totaalbrochure-2026", date: "2026-05-20", category: "Marketing",
      title: "Totaalbrochure 2026 nu beschikbaar",
      excerpt: "De vernieuwde totaalbrochure (EU-NL, EN, DE) staat klaar in Downloads — inclusief de AirClean UltraFine-serie.",
      body: "De totaalbrochure 2026 is geactualiseerd met de volledige productlijn, de nieuwste specificaties en de AirClean UltraFine-serie. Beschikbaar in het Nederlands, Engels en Duits (.com en .de varianten). Download de versie in jouw taal via de Downloads-pagina."
    },
    {
      id: "interflow-test", date: "2026-04-08", category: "Bewijs",
      title: "Interflow-testresultaten gepubliceerd",
      excerpt: "Onafhankelijk onderzoek bevestigt: de AirClean UltraFine presteert vergelijkbaar met een HEPA-filter (R² = 0,996).",
      body: "De AirClean UltraFine is uitgebreid getest door Interflow BV. De resultaten tonen een vrijwel identieke deeltjesreductie ten opzichte van een HEPA-filter, met een correlatiecoëfficiënt van 0,996. Gebruik deze resultaten in B2B-gesprekken en offertes — de grafiek en uitleg vind je in de Kennisbank."
    },
    {
      id: "esp-heat-exchanger", date: "2026-03-15", category: "Product",
      title: "Nieuw: hybride plafondmodel met ESP Heat Exchanger",
      excerpt: "Een optionele uitbreiding met extra buitenluchttoevoer voor omgevingen waar luchtkwaliteit extra aandacht vraagt.",
      body: "Voor professionele omgevingen introduceert PlasmaMade een hybride oplossing: het plafondmodel met een tweede toevoer voor verse buitenlucht. Beide luchtstromen worden gecontroleerd gemengd en efficiënt gefilterd binnen één geïntegreerd systeem. Onafhankelijke metingen met GRIMM-apparatuur tonen extra reductie van fijnstof aan. De folder staat in Downloads."
    },
    {
      id: "kiwa-handleidingen", date: "2026-02-10", category: "Documentatie",
      title: "Nieuwe KIWA-handleidingen (GUC1223 & GUC1323)",
      excerpt: "De geactualiseerde gebruikshandleidingen volgens KIWA-richtlijnen zijn beschikbaar voor EU en Noord-Amerika.",
      body: "De gebruikshandleidingen voor de GUC1223 en GUC1323 zijn vernieuwd volgens de KIWA-richtlijnen (september 2025). Beschikbaar voor zowel de Europese als de Noord-Amerikaanse markt, meertalig. Download de handleidingen via de Downloads-pagina of de betreffende productpagina."
    },
    {
      id: "plus-x-award", date: "2025-12-15", category: "Mijlpaal",
      title: "PlasmaMade wint de Plus X Award 2025",
      excerpt: "De PlasmaMade E-Filter is onderscheiden in vijf categorieën tegelijk: Innovation, High Quality, Functionality, Ergonomics en Ecology.",
      body: "Groot nieuws: de PlasmaMade E-Filter is bekroond met de Plus X Award 2025 — en wel in vijf categorieën tegelijk: Innovation, High Quality, Functionality, Ergonomics en Ecology. Een krachtig en internationaal erkend kwaliteitskeurmerk dat je direct kunt inzetten in je verkoopverhaal. Gebruik de award-visual in social posts, e-mailhandtekeningen, offertes en showroommateriaal om het premium karakter van PlasmaMade te onderstrepen."
    },
    {
      id: "caple-partnership", date: "2025-12-05", category: "Partner",
      title: "Internationale samenwerking met Caple (UK)",
      excerpt: "Co-branded materiaal en video's voor de Britse markt zijn toegevoegd aan de assetbibliotheek.",
      body: "PlasmaMade breidt internationaal uit met co-branded materiaal voor partner Caple in het Verenigd Koninkrijk. Er is een Caple-totaalbrochure (EU-EN) beschikbaar en installatievideo's voor de GUC1214 en GUC1314. Neem voor co-branded uitingen contact op met sales@plasmamade.com."
    }
  ];

  /* ---------------- MARKETINGMATERIAAL ---------------- */
  // type: brochure | leaflet | social | banner | advertentie | render | foto | video | logo | presentatie | persmateriaal
  const marketing = [
    { id: "li-get-fresh", title: "Social post — Get fresh!", category: "Social media", type: "social", product: "Merk algemeen", lang: "NL", img: "assets/img/social/li-get-fresh.jpg", file: null, desc: "LinkedIn/Instagram visual rond de Get fresh!-campagne." },
    { id: "li-algemeen", title: "Social post — Merk algemeen", category: "Social media", type: "social", product: "Merk algemeen", lang: "NL", img: "assets/img/social/li-algemeen.jpg", file: null, desc: "Algemene merkpost voor LinkedIn." },
    { id: "li-new-efilters", title: "Social post — Nieuwe E-Filters", category: "Social media", type: "social", product: "E-Filter", lang: "NL", img: "assets/img/social/li-new-efilters.jpg", file: null, desc: "Productintroductie-post voor de E-Filter lijn." },
    { id: "li-inbouw-1223", title: "Social post — Inbouw GUC1223", category: "Social media", type: "social", product: "GUC1223", lang: "NL", img: "assets/img/social/li-inbouw-1223.jpg", file: null, desc: "Inbouw-/montagevisual voor de GUC1223." },
    { id: "li-inbouw-1323", title: "Social post — Inbouw GUC1323", category: "Social media", type: "social", product: "GUC1323", lang: "NL", img: "assets/img/social/li-inbouw-1323.jpg", file: null, desc: "Inbouw-/montagevisual voor de GUC1323." },
    { id: "li-certificeringen", title: "Social post — Certificeringen", category: "Social media", type: "social", product: "Merk algemeen", lang: "NL", img: "assets/img/social/li-certificeringen.jpg", file: null, desc: "Visual met CE, UKCA, ROHS, RED keurmerken." },
    { id: "li-event", title: "Eventbanner - Get fresh!", category: "Digitale banners", type: "banner", product: "Merk algemeen", lang: "NL", img: "assets/img/social/li-algemeen.jpg", file: null, desc: "Algemene eventbanner voor partnerdagen, showroomdagen en beurzen." },

    { id: "totaalbrochure-eu-nl-2026", title: "Totaalbrochure EU-NL 2026", category: "Brochures", type: "brochure", product: "Volledige lijn", lang: "NL", img: "assets/img/lifestyle/efilter-explained.jpg", file: "totaalbrochure-eu-nl-2026", desc: "Complete productbrochure met alle modellen en specificaties." },
    { id: "brochure-eu-nl", title: "Productbrochure EU-NL", category: "Brochures", type: "brochure", product: "E-Filter", lang: "NL", img: "assets/img/lifestyle/kitchen-grandma.jpg", file: "brochure-eu-nl", desc: "Consumentenbrochure A4." },
    { id: "brochure-eu-en", title: "Product brochure EU-EN", category: "Brochures", type: "brochure", product: "E-Filter", lang: "EN", img: "assets/img/lifestyle/kitchen-grandma.jpg", file: "brochure-eu-en", desc: "Consumer brochure A4 (English)." },
    { id: "folder-ultrafine-nl", title: "Folder AirClean UltraFine", category: "Brochures", type: "leaflet", product: "AirClean UltraFine", lang: "NL", img: "assets/img/ultrafine/ultrafine-space.jpg", file: "folder-ultrafine-nl", desc: "Folder over de UltraFine-serie: ESP+ESD, cleanroom, Interflow-test." },
    { id: "folder-esp-heat-exchanger", title: "Folder ESP Heat Exchanger", category: "Brochures", type: "leaflet", product: "GUC4184 ESP", lang: "NL", img: "assets/img/ultrafine/esp.png", file: "folder-esp-heat-exchanger", desc: "Hybride plafondmodel met extra buitenluchttoevoer." },
    { id: "leaflet-table-air-cleaner-nl", title: "Leaflet Table Air Cleaner", category: "Leaflets", type: "leaflet", product: "Table Air Cleaner", lang: "NL", img: "assets/img/products/table-air-cleaner.png", file: "leaflet-table-air-cleaner-nl", desc: "Leaflet voor het compacte tafelmodel." },
    { id: "techniekblad-nl", title: "Techniekblad E-Filter", category: "Technisch", type: "leaflet", product: "E-Filter", lang: "NL", img: "assets/img/lifestyle/efilter-explained.jpg", file: "techniekblad-nl", desc: "Technische uitleg met eliminatielijst en Sustainability-badge." },

    { id: "productsheet-guc1223", title: "Productsheet GUC1223", category: "Productsheets", type: "leaflet", product: "GUC1223", lang: "NL", img: "assets/img/products/guc1223.png", file: "productsheet-guc1223", desc: "Technische productsheet GUC1223." },
    { id: "productsheet-guc1212", title: "Productsheet GUC1212", category: "Productsheets", type: "leaflet", product: "GUC1212", lang: "NL", img: "assets/img/products/guc1212.png", file: "productsheet-guc1212", desc: "Technische productsheet GUC1212." },
    { id: "productsheet-guc1323", title: "Productsheet GUC1323", category: "Productsheets", type: "leaflet", product: "GUC1323", lang: "NL", img: "assets/img/products/guc1323.png", file: "productsheet-guc1323", desc: "Technische productsheet GUC1323." },

    { id: "render-guc1223", title: "Productrender GUC1223", category: "Productbeelden", type: "render", product: "GUC1223", lang: "—", img: "assets/img/products/guc1223.png", file: null, desc: "Vrijgestelde productrender (transparant), hoge resolutie." },
    { id: "render-guc1323", title: "Productrender GUC1323", category: "Productbeelden", type: "render", product: "GUC1323", lang: "—", img: "assets/img/products/guc1323.png", file: null, desc: "Vrijgestelde productrender (transparant)." },
    { id: "render-guc1212", title: "Productrender GUC1212", category: "Productbeelden", type: "render", product: "GUC1212", lang: "—", img: "assets/img/products/guc1212.png", file: null, desc: "Vrijgestelde productrender (transparant)." },
    { id: "render-ultrafine", title: "Productrender AirClean UltraFine", category: "Productbeelden", type: "render", product: "AirClean UltraFine", lang: "—", img: "assets/img/ultrafine/ultrafine.jpg", file: null, desc: "Render van de standalone UltraFine-unit." },
    { id: "render-esp", title: "Productrender GUC4184 ESP", category: "Productbeelden", type: "render", product: "GUC4184 ESP", lang: "—", img: "assets/img/ultrafine/esp.png", file: null, desc: "Render van de ESP-component." },

    { id: "foto-keuken-oma", title: "Lifestyle — keuken", category: "Sfeerbeelden", type: "foto", product: "Merk algemeen", lang: "—", img: "assets/img/lifestyle/kitchen-grandma.jpg", file: null, desc: "Authentiek keukenbeeld voor lifestyle-communicatie." },
    { id: "foto-vlinders", title: "Lifestyle — vlinders & keuken", category: "Sfeerbeelden", type: "foto", product: "Merk algemeen", lang: "—", img: "assets/img/lifestyle/butterflies-kitchen.jpg", file: null, desc: "Beeld met monarchvlinders — symbool voor schone lucht." },
    { id: "foto-integrale", title: "Beeld — integrale afzuiging", category: "Sfeerbeelden", type: "foto", product: "GUC1323", lang: "—", img: "assets/img/lifestyle/integrale-afzuiging.jpg", file: null, desc: "Kookplaat met geïntegreerde afzuiging in context." },
    { id: "foto-kantoor", title: "Toepassing — kantoor", category: "Sfeerbeelden", type: "foto", product: "AirClean UltraFine", lang: "—", img: "assets/img/ultrafine/kantoor.jpg", file: null, desc: "UltraFine in een kantooromgeving." },
    { id: "foto-school", title: "Toepassing — school", category: "Sfeerbeelden", type: "foto", product: "AirClean UltraFine", lang: "—", img: "assets/img/ultrafine/school.jpg", file: null, desc: "UltraFine in een klaslokaal." },
    { id: "foto-horeca", title: "Toepassing — horeca", category: "Sfeerbeelden", type: "foto", product: "AirClean UltraFine", lang: "—", img: "assets/img/ultrafine/horeca.jpg", file: null, desc: "UltraFine in een horecaomgeving." },

    { id: "presentatie-plasmamade", title: "Bedrijfspresentatie", category: "Presentaties", type: "presentatie", product: "Merk algemeen", lang: "NL", img: "assets/img/lifestyle/team.png", file: "presentatie-plasmamade", desc: "Algemene PlasmaMade-presentatie voor partners en klanten." },
    { id: "rolbanner-100x200", title: "Roll-up banner 100×200", category: "Beursmateriaal", type: "banner", product: "Merk algemeen", lang: "NL", img: "assets/img/lifestyle/hero-girl.png", file: "rolbanner-100x200", desc: "Print-ready roll-up banner voor beurzen en showrooms." },
    { id: "award", title: "Plus X Award 2025 — visual", category: "Persmateriaal", type: "persmateriaal", product: "Merk algemeen", lang: "—", img: "assets/img/lifestyle/award.png", file: null, desc: "Gewonnen in 5 categorieën. Visual voor social, e-mail en showroom." },

    { id: "logo-pakket", title: "Logopakket (alle varianten)", category: "Huisstijl", type: "logo", product: "Merk algemeen", lang: "—", img: "assets/img/logo/logo-green.png", file: "logo-pakket", desc: "Alle logovarianten (groen, wit, zwart) in EPS/PNG/JPG." },
    { id: "huisstijlhandboek-nl", title: "Huisstijlhandboek NL", category: "Huisstijl", type: "brochure", product: "Merk algemeen", lang: "NL", img: "assets/img/lifestyle/hero-filters.png", file: "huisstijlhandboek-nl", desc: "Volledig huisstijlhandboek: kleuren, typografie, beeldtaal." },

    { id: "social-award", title: "Social post — Plus X Award 2025", category: "Social media", type: "social", product: "Merk algemeen", lang: "NL", img: "assets/img/lifestyle/award.png", file: null, desc: "Award-post: gewonnen in 5 categorieën." }
  ];

  /* ---------------- DOWNLOADS ---------------- */
  // category: Brochure | Productsheet | Handleiding | Techniek | Presentatie | Huisstijl | Beursmateriaal
  const downloads = [
    { id: "totaalbrochure-eu-nl-2026", title: "Totaalbrochure EU-NL 2026", cat: "Brochure", product: "Volledige lijn", lang: "NL", type: "PDF", size: "16 MB", file: "totaalbrochure-eu-nl-2026" },
    { id: "brochure-eu-nl", title: "Productbrochure EU-NL", cat: "Brochure", product: "E-Filter", lang: "NL", type: "PDF", size: "13 MB", file: "brochure-eu-nl" },
    { id: "brochure-eu-en", title: "Product brochure EU-EN", cat: "Brochure", product: "E-Filter", lang: "EN", type: "PDF", size: "13 MB", file: "brochure-eu-en" },
    { id: "folder-ultrafine-nl", title: "Folder AirClean UltraFine", cat: "Brochure", product: "AirClean UltraFine", lang: "NL", type: "PDF", size: "4 MB", file: "folder-ultrafine-nl" },
    { id: "folder-esp-heat-exchanger", title: "Folder ESP Heat Exchanger", cat: "Brochure", product: "GUC4184 ESP", lang: "NL", type: "PDF", size: "6 MB", file: "folder-esp-heat-exchanger" },
    { id: "leaflet-table-air-cleaner-nl", title: "Leaflet Table Air Cleaner", cat: "Brochure", product: "Table Air Cleaner", lang: "NL", type: "PDF", size: "2 MB", file: "leaflet-table-air-cleaner-nl" },
    { id: "productsheet-guc1223", title: "Productsheet GUC1223", cat: "Productsheet", product: "GUC1223", lang: "NL", type: "PDF", size: "172 KB", file: "productsheet-guc1223" },
    { id: "productsheet-guc1212", title: "Productsheet GUC1212", cat: "Productsheet", product: "GUC1212", lang: "NL", type: "PDF", size: "214 KB", file: "productsheet-guc1212" },
    { id: "productsheet-guc1323", title: "Productsheet GUC1323", cat: "Productsheet", product: "GUC1323", lang: "NL", type: "PDF", size: "230 KB", file: "productsheet-guc1323" },
    { id: "productsheet-guc1214", title: "Productsheet GUC1214 (NA)", cat: "Productsheet", product: "GUC1214", lang: "EN", type: "PDF", size: "98 KB", file: "productsheet-guc1214" },
    { id: "productsheet-guc1314", title: "Productsheet GUC1314 (NA)", cat: "Productsheet", product: "GUC1314", lang: "EN", type: "PDF", size: "96 KB", file: "productsheet-guc1314" },
    { id: "techniekblad-nl", title: "Techniekblad E-Filter", cat: "Techniek", product: "E-Filter", lang: "NL", type: "PDF", size: "456 KB", file: "techniekblad-nl" },
    { id: "handleiding-guc1223", title: "Handleiding GUC1223 (KIWA)", cat: "Handleiding", product: "GUC1223", lang: "Meertalig", type: "PDF", size: "3 MB", file: "handleiding-guc1223" },
    { id: "handleiding-guc1323", title: "Handleiding GUC1323 (KIWA)", cat: "Handleiding", product: "GUC1323", lang: "Meertalig", type: "PDF", size: "3 MB", file: "handleiding-guc1323" },
    { id: "presentatie-plasmamade", title: "Bedrijfspresentatie PlasmaMade", cat: "Presentatie", product: "Merk algemeen", lang: "NL", type: "PDF", size: "5 MB", file: "presentatie-plasmamade" },
    { id: "huisstijlhandboek-nl", title: "Huisstijlhandboek NL v1.2", cat: "Huisstijl", product: "Merk algemeen", lang: "NL", type: "PDF", size: "2,5 MB", file: "huisstijlhandboek-nl" },
    { id: "logo-pakket", title: "Logopakket (alle varianten)", cat: "Huisstijl", product: "Merk algemeen", lang: "—", type: "ZIP", size: "3 MB", file: "logo-pakket" },
    { id: "rolbanner-100x200", title: "Roll-up banner 100×200", cat: "Beursmateriaal", product: "Merk algemeen", lang: "NL", type: "PDF", size: "48 MB", file: "rolbanner-100x200" }
  ];

  /* ---------------- VERKOOPTOOLS ---------------- */
  const sales = {
    pitches: [
      { audience: "Consument", text: "Met PlasmaMade kook je zonder dat geuren in huis blijven hangen, en adem je schonere lucht — vrij van fijnstof, pollen en virussen. Het filter klikt zo op je afzuigkap, hoeft 10 tot 15 jaar niet vervangen te worden en heeft geen afvoer naar buiten nodig. Schone lucht, zonder gedoe." },
      { audience: "Installateur", text: "PlasmaMade is in minuten gemonteerd: kliksysteem, draai-klem sluiting, geen extra materialen. Het werkt op recirculatie, dus geen doorbraak nodig. WiFi en Bluetooth maken draadloze aansturing mogelijk, en met 10–15 jaar levensduur en 5 jaar garantie heb je er geen omkijken naar." },
      { audience: "Keukenstudio / retailer", text: "PlasmaMade is dé premium toevoeging aan je keukenpakket. Een gepatenteerd, wereldwijd gecertificeerd Nederlands product dat past op vrijwel elke designkap. Je biedt je klant aantoonbare gezondheidswinst, terwijl jij je onderscheidt met een innovatief A-merk en extra marge." },
      { audience: "Zakelijk / professioneel", text: "De AirClean UltraFine brengt cleanroomkwaliteit naar uw ruimte. Onafhankelijk getest door Interflow: vergelijkbaar met een HEPA-filter en een ISO 6/7-cleanroom. Tot 98% minder virussen en bacteriën, tot 85% minder fijnstof — zonder wegwerpfilters en bij een laag energieverbruik. Een investering in productiviteit, zorgplicht en gezondheid." }
    ],
    usps: [
      "Tot 98% reductie van virussen en bacteriën",
      "Verwijdert geuren, fijnstof, pollen, allergenen en schimmels",
      "Geen afvoer naar buiten nodig — werkt op recirculatie",
      "10–15 jaar levensduur — geen wegwerpfilter",
      "Klikmontage, in minuten gemonteerd zonder gereedschap",
      "WiFi + Bluetooth aansturing via de PlasmaMade-app",
      "97% recyclebaar · gepatenteerd Nederlands product",
      "CE, UKCA, ROHS, RED gecertificeerd",
      "2 jaar garantie · 5 jaar na registratie",
      "Past op vrijwel elke afzuigkap, ook designkappen"
    ],
    comparison: [
      { feature: "Levensduur", trad: "Jaarlijks vervangen", pm: "10–15 jaar / ±9.000 uur" },
      { feature: "Wat wordt gefilterd", trad: "Alleen vet & grof", pm: "Virus, bacteriën, pollen, fijnstof, geuren" },
      { feature: "Afvoer", trad: "Naar buiten nodig", pm: "Recirculatie, geen afvoer nodig" },
      { feature: "Bediening", trad: "Geen digitaal", pm: "WiFi + Bluetooth app" },
      { feature: "Materiaal", trad: "Wegwerpplastic", pm: "97% recyclebaar" },
      { feature: "Geluid", trad: "Luidruchtig", pm: "Geluidsdemping" },
      { feature: "Certificering", trad: "Beperkt", pm: "CE · UKCA · ROHS · RED" }
    ],
    objections: [
      { q: "\"Een PlasmaMade is duurder dan een gewoon koolstoffilter.\"", a: "Klopt op de aanschafprijs, maar reken het door: een koolstoffilter vervang je elk jaar. Een PlasmaMade gaat 10 tot 15 jaar mee. Over de levensduur is het juist voordeliger — én je filtert veel meer dan alleen vet: virussen, fijnstof, pollen en geuren." },
      { q: "\"Werkt het wel echt? Filtert het echt virussen?\"", a: "Het is onafhankelijk getest door Interflow (2024): vrijwel identieke deeltjesreductie als een HEPA-filter, R² = 0,996. Tot 98% van virussen en bacteriën wordt gefilterd. Het is CE, UKCA, ROHS en RED gecertificeerd en gepatenteerd." },
      { q: "\"Ik heb geen afvoer naar buiten.\"", a: "Dat hoeft ook niet. PlasmaMade werkt op recirculatie: de lucht wordt gereinigd en schoon teruggegeven aan de ruimte. Juist ideaal voor appartementen en renovaties zonder doorbraak." },
      { q: "\"Past dat wel op mijn afzuigkap?\"", a: "Vrijwel zeker. De GUC1223 heeft twee aansluitmaten (Ø122/126 en Ø147/151 mm) en past op de meeste design- en wandkappen. Voor Ø100 mm is er de GUC1212, en voor kookplaten met geïntegreerde afzuiging de GUC1323. Gebruik de Filter Finder om te checken." },
      { q: "\"Moet ik het filter onderhouden of vervangen?\"", a: "Nee. Het E-Filter is onderhoudsvrij gedurende de levensduur — geen filterwissel. Bij de AirClean UltraFine reinig je de ESP-plaatmodule simpelweg in de vaatwasser." },
      { q: "\"Is het duurzaam?\"", a: "Zeer. 97% recyclebaar, geen wegwerpfilters, en door de lage luchtweerstand een lager energieverbruik. Geen wegwerpfilter — nooit meer." }
    ],
    productArgs: [
      { product: "GUC1223", args: ["Past op vrijwel elke designkap (twee aansluitmaten).", "Vlaggenschip: het meest verkochte E-Filter.", "10–15 jaar geen filter wisselen."] },
      { product: "GUC1212", args: ["Compacte oplossing voor bestaande Ø100 mm kappen.", "Zelfde bewezen techniek, kleiner formaat.", "Maakt elke recirculatiekap volwaardig."] },
      { product: "GUC1323", args: ["Dé filter voor kookplaten met geïntegreerde afzuiging.", "Onzichtbaar weggewerkt — behoudt het strakke design.", "Speelt in op de groeiende markt van open keukens."] },
      { product: "AirClean UltraFine", args: ["Cleanroomkwaliteit zonder cleanroom (ISO 6/7).", "Interflow-bewijs: zo goed als een HEPA-filter.", "ESP-module in de vaatwasser — geen wegwerpfilters."] }
    ],
    emails: [
      {
        id: "intro-consument",
        title: "Introductie — consument / keukenklant",
        subject: "Schone lucht in uw keuken — zonder ooit een filter te wisselen",
        body: "Beste [naam],\n\nBedankt voor uw interesse in een nieuwe keuken(oplossing). Graag wijs ik u op het PlasmaMade E-Filter: een gepatenteerd Nederlands luchtfilter dat geuren, fijnstof, pollen en tot 98% van virussen en bacteriën uit de lucht haalt.\n\nDe belangrijkste voordelen op een rij:\n• Geen afvoer naar buiten nodig — werkt op recirculatie\n• 10–15 jaar levensduur, geen filterwissel\n• In minuten gemonteerd op vrijwel elke afzuigkap\n• 97% recyclebaar en CE/UKCA/ROHS/RED-gecertificeerd\n\nIk vertel u er graag meer over tijdens uw volgende bezoek.\n\nMet vriendelijke groet,\n[uw naam]"
      },
      {
        id: "offerte-b2b",
        title: "Offerte-aanbieding — zakelijk (UltraFine)",
        subject: "Offerte AirClean UltraFine — cleanroomkwaliteit voor uw ruimte",
        body: "Geachte [naam],\n\nZoals besproken ontvangt u hierbij onze offerte voor de PlasmaMade AirClean UltraFine.\n\nDe AirClean UltraFine combineert ESP- en ESD-technologie en is onafhankelijk getest door Interflow (2024): de deeltjesreductie is vrijwel identiek aan een HEPA-filter (R² = 0,996). Tot 98% van virussen en bacteriën en tot 85% van fijnstof wordt uit de lucht gefilterd — zonder wegwerpfilters en met laag energieverbruik.\n\nIn de bijlage vindt u de offerte en de productdocumentatie. Het Interflow-testrapport stuur ik op verzoek graag mee.\n\nIk hoor graag of u nog vragen heeft.\n\nMet vriendelijke groet,\n[uw naam]"
      },
      {
        id: "followup",
        title: "Follow-up na gesprek of showroombezoek",
        subject: "Vervolg op ons gesprek over PlasmaMade",
        body: "Beste [naam],\n\nBedankt voor het prettige gesprek over schone lucht in [uw keuken/uw organisatie]. Zoals beloofd stuur ik u de informatie over het PlasmaMade E-Filter toe.\n\nKort samengevat: het filter reinigt de lucht volledig en geeft die schoon terug aan de ruimte. Geen afvoer naar buiten, geen jaarlijkse filterwissel — 10 tot 15 jaar lang.\n\nHeeft u nog vragen, of wilt u een demonstratie inplannen? Ik help u graag verder.\n\nMet vriendelijke groet,\n[uw naam]"
      },
      {
        id: "aftersales",
        title: "After-sales — garantieregistratie",
        subject: "Tip: registreer uw PlasmaMade voor 5 jaar garantie",
        body: "Beste [naam],\n\nVan harte met uw PlasmaMade E-Filter! Een kleine moeite die de moeite waard is: registreer uw product op plasmamade.com. Daarmee verlengt u de garantie van 2 naar 5 jaar.\n\nNog goed om te weten:\n• Het filter is onderhoudsvrij — u hoeft niets te vervangen\n• Via de PlasmaMade-app (WiFi/Bluetooth) kunt u het filter bedienen\n\nVeel plezier van uw schone lucht. Bij vragen staan we voor u klaar.\n\nMet vriendelijke groet,\n[uw naam]"
      }
    ],
    pitch10: "PlasmaMade reinigt je binnenlucht volledig — geuren, fijnstof, virussen en pollen tot 98% gefilterd — zónder afvoer naar buiten en zónder ooit een filter te wisselen.",
    pitch30: "PlasmaMade is een gepatenteerd Nederlands E-Filter dat de lucht in je keuken of ruimte volledig reinigt: geuren, fijnstof, pollen, virussen en bacteriën worden tot 98% afgebroken. Het werkt op recirculatie, dus er is geen afvoer naar buiten nodig. Je klikt het in minuten op de afzuigkap, het gaat 10 tot 15 jaar mee en is 97% recyclebaar. Onafhankelijk getest en CE/UKCA/ROHS/RED-gecertificeerd. Schone lucht, zonder gedoe.",
    segments: [
      { segment: "Keukens", icon: "box", text: "Koken zonder dat geuren in huis blijven hangen, plus gezondere lucht voor het hele gezin. GUC1223 voor de meeste kappen, GUC1323 voor kookplaten met geïntegreerde afzuiging. Geen afvoer naar buiten nodig." },
      { segment: "Kantoren", icon: "building", text: "Een gezond binnenklimaat verhoogt concentratie en vermindert ziekteverzuim. De AirClean UltraFine zorgt continu voor schone lucht, zodat medewerkers veilig en prettig op locatie kunnen werken." },
      { segment: "Scholen", icon: "book", text: "In klaslokalen komen veel mensen samen. Continue luchtzuivering vermindert de verspreiding van virussen en aerosolen en zorgt voor een gezondere leeromgeving." },
      { segment: "Zorginstellingen", icon: "shield", text: "Een veilig binnenklimaat is van levensbelang. Tot 98% van virussen en bacteriën wordt gefilterd — bescherming voor medewerkers, patiënten en bezoekers, onderbouwd met de Interflow-test." },
      { segment: "Publieke gebouwen", icon: "globe", text: "Wachtruimtes, sportaccommodaties, horeca en detailhandel: overal waar mensen samenkomen zorgt de AirClean UltraFine voor merkbaar schonere en veiligere lucht." }
    ],
    sustainability: [
      "97% recyclebaar — geen wegwerpfilter dat elk jaar de prullenbak in gaat.",
      "10–15 jaar levensduur (±9.000 uur) — geen jaarlijkse vervanging.",
      "ESP-plaatmodule is vaatwasserbestendig en eindeloos herbruikbaar.",
      "Lage luchtweerstand → lager energieverbruik en minder geluid.",
      "Lagere CO₂-uitstoot door efficiënt energiebeheer.",
      "Bij recirculatie geen warmteverlies: de verwarmde binnenlucht blijft binnen."
    ],
    simple: [
      { title: "Wat doet het? (in één zin)", text: "Het filter reinigt de lucht in je keuken en geeft die schoon terug aan de ruimte — zonder een gat naar buiten." },
      { title: "Hoe werkt het? (simpel uitgelegd)", text: "Binnenin breekt een klein plasmaveld geuren, fijnstof en ziekteverwekkers af. Wat overblijft is schone, frisse lucht. Je hoeft niets te vervangen." },
      { title: "Waarom geen filter wisselen?", text: "Een gewoon koolstoffilter raakt vol en moet elk jaar vervangen. PlasmaMade breekt de vervuiling juist áf, dus het blijft 10 tot 15 jaar werken." },
      { title: "Is het veilig?", text: "Ja. Het is uitgebreid getest (o.a. TÜV en VDE), CE/UKCA/ROHS/RED-gecertificeerd en de ozonwaarden zijn aantoonbaar veilig." }
    ]
  };

  /* ---------------- VIDEO-UITLEG ---------------- */
  // source: 'local' gebruikt het originele MP4-bestand in assets/videos.
  // source: 'youtube' blijft alleen als nette bronlink-fallback wanneer het originele bestand lokaal ontbreekt.
  const videos = [
    { id: "guc1223-werking", title: "GUC1223 — werking & uitleg", product: "GUC1223", topic: "Werking & uitleg", audience: "Consument · installateur", shareable: true, source: "local", file: "assets/videos/guc1223-werking.mp4", poster: "assets/img/products/guc1223.png", yt: "KCU4tzFjGiE", desc: "Hoe het GUC1223 E-Filter de lucht reinigt en draadloos wordt aangestuurd." },
    { id: "guc1223-montage", title: "GUC1223 — montagevideo", product: "GUC1223", topic: "Installatie & montage", audience: "Installateur", shareable: true, source: "local", file: "assets/videos/guc1223-montage.mp4", poster: "assets/img/lifestyle/afzuigkap.jpg", yt: "3i2TIANuZ44", desc: "Stap voor stap het GUC1223 op de afzuigkap monteren." },
    { id: "guc1212-installatie", title: "GUC1212 — installatie", product: "GUC1212", topic: "Installatie & montage", audience: "Installateur", shareable: true, source: "youtube", yt: "AT0wGGAUJ3Q", poster: "assets/img/products/guc1212.png", desc: "Installatie van het compacte GUC1212 op een Ø100 mm aansluiting." },
    { id: "guc1323-werking", title: "GUC1323 — werking & uitleg", product: "GUC1323", topic: "Werking & uitleg", audience: "Consument · installateur", shareable: true, source: "local", file: "assets/videos/guc1323-werking.mp4", poster: "assets/img/products/guc1323.png", yt: "RF249zsu7VA", desc: "Het platte E-Filter voor kookplaten met geïntegreerde afzuiging." },
    { id: "guc1323-montage", title: "GUC1323 — montagevideo", product: "GUC1323", topic: "Installatie & montage", audience: "Installateur", shareable: true, source: "local", file: "assets/videos/guc1323-montage.mp4", poster: "assets/img/lifestyle/integrale-afzuiging.jpg", yt: "UqRS56P_-2c", desc: "Montage van het GUC1323 onder de plint of aan de wand." },
    { id: "ultrafine-werking", title: "AirClean UltraFine — in beeld", product: "AirClean UltraFine", topic: "Werking & uitleg", audience: "Zakelijk · zorg", shareable: true, source: "local", file: "assets/videos/airclean-ultrafine-overview.mp4", poster: "assets/img/ultrafine/ultrafine-space.jpg", desc: "De standalone AirClean UltraFine-unit in een professionele omgeving." }
  ];

  /* ---------------- TESTDOCUMENTEN & ONDERBOUWING ---------------- */
  const testdocs = [
    { id: "interflow-onderzoek", title: "Interflow onderzoek (2024)", product: "AirClean UltraFine", category: "Prestatie & luchtkwaliteit", conclusion: "Deeltjesreductie vrijwel identiek aan een HEPA-filter (R² = 0,996): van ±115 mln naar <1 mln deeltjes/m³ in 25 minuten.", usage: "Commercieel", file: "interflow-onderzoek", lang: "NL", size: "7,2 MB" },
    { id: "meetrapport-espesd", title: "Meetrapport UltraFine ESP + ESD", product: "AirClean UltraFine", category: "Prestatie & luchtkwaliteit", conclusion: "Onafhankelijke meting van de gecombineerde ESP- en ESD-technologie.", usage: "Technisch", file: "meetrapport-ultrafine-espesd", lang: "NL", size: "1,4 MB" },
    { id: "dti-test-2024", title: "DTI-test PlasmaMade (06-2024)", product: "E-Filter", category: "Prestatie & luchtkwaliteit", conclusion: "Recente onafhankelijke prestatietest (DTI, 2024).", usage: "Beide", file: "dti-test-2024", lang: "EN", size: "668 KB" },
    { id: "health-institute-poland", title: "Test Health Institute (Polen)", product: "E-Filter", category: "Prestatie & luchtkwaliteit", conclusion: "Onafhankelijke test door een nationaal gezondheidsinstituut.", usage: "Commercieel", file: "health-institute-poland", lang: "EN", size: "236 KB" },
    { id: "vde-safety", title: "VDE veiligheidstest (EN 60335)", product: "E-Filter", category: "Veiligheid", conclusion: "Voldoet aan de Europese veiligheidsnorm EN 60335-2-65.", usage: "Technisch", file: "vde-safety", lang: "EN", size: "600 KB" },
    { id: "vde-guc1214", title: "VDE-test GUC-serie", product: "E-Filter", category: "Veiligheid", conclusion: "Elektrisch veiligheidsrapport, VDE-getest.", usage: "Technisch", file: "vde-guc1214", lang: "EN", size: "1,5 MB" },
    { id: "ozone-safety", title: "Ozontest & veiligheid", product: "E-Filter", category: "Veiligheid", conclusion: "Aantoonbaar veilige ozonwaarden, ruim binnen de norm.", usage: "Beide", file: "ozone-safety", lang: "EN", size: "944 KB" },
    { id: "safety-data-sheet", title: "Safety data sheet (pre-filter)", product: "E-Filter", category: "Veiligheid", conclusion: "Veiligheidsinformatieblad van het pre-filtermateriaal.", usage: "Technisch", file: "safety-data-sheet", lang: "EN", size: "512 KB" },
    { id: "tuv-certificate", title: "TÜV testcertificaat", product: "E-Filter", category: "Certificering & patent", conclusion: "TÜV-gecertificeerd; bevestigt veiligheid en kwaliteit.", usage: "Commercieel", file: "tuv-certificate", lang: "EN", size: "1,7 MB" },
    { id: "tuv-cb-worldwide", title: "TÜV CB-rapport (wereldwijd)", product: "E-Filter", category: "Certificering & patent", conclusion: "Wereldwijde CB-toelating via het IECEE-schema.", usage: "Technisch", file: "tuv-cb-worldwide", lang: "EN", size: "284 KB" },
    { id: "eu-patent", title: "EU-patent certificaat", product: "Merk algemeen", category: "Certificering & patent", conclusion: "Gepatenteerde technologie (EP 3 088 808 B1).", usage: "Commercieel", file: "eu-patent", lang: "EN", size: "292 KB" }
  ];

  /* ---------------- SUPPORT FAQ ---------------- */
  const faq = [
    { id: "faq-filter-fit", q: "Hoe weet ik welk filter op welke afzuigkap past?", a: "Gebruik de ingebouwde Filter Finder in dit Partner Center: beantwoord een paar korte vragen en je krijgt direct het juiste filter met onderbouwing. De GUC1223 past op de meeste design- en wandkappen (Ø122/126 en Ø147/151 mm), de GUC1212 op Ø100 mm en de GUC1323 op kookplaten met geïntegreerde afzuiging. Twijfel je? Neem gerust contact op met sales." },
    { id: "faq-bronbestand", q: "Hoe vraag ik nieuw marketingmateriaal of een bronbestand aan?", a: "Bronbestanden (zoals video's of open InDesign-bestanden) zijn op aanvraag beschikbaar. Mail je verzoek naar sales@plasmamade.com met vermelding van het gewenste materiaal en formaat." },
    { id: "faq-logo", q: "Mag ik zelf materiaal maken met het PlasmaMade-logo?", a: "Ja — gebruik daarvoor de ingebouwde ontwerpomgeving. De huisstijl (kleuren, logo, typografie) is daar beschermd, zodat je uitingen altijd on-brand zijn. Het logopakket en huisstijlhandboek staan in Downloads." },
    { id: "faq-studio", q: "Werkt de ontwerpomgeving ook zonder designervaring?", a: "Zeker. Kies een template, pas de teksten aan, wissel de afbeelding en exporteer als PNG of PDF. Drag-and-drop, geen designkennis nodig." },
    { id: "faq-garantie", q: "Hoe registreer ik een product voor 5 jaar garantie?", a: "Klanten registreren het product op plasmamade.com. Standaard geldt 2 jaar garantie, na registratie 5 jaar." }
  ];

  /* ---------------- DASHBOARD STATS ---------------- */
  const stats = [
    { label: "Producten", val: String(products.length), sub: "met volledige specs", icon: "box" },
    { label: "Kennisartikelen", val: String(articles.length), sub: "+ video-uitleg", icon: "book" },
    { label: "Video's", val: String(videos.length), sub: "gekoppeld aan producten", icon: "play" },
    { label: "Testdocumenten", val: String(testdocs.length), sub: "onafhankelijk bewijs", icon: "shieldCheck" }
  ];

  return { products, articles, campaigns, news, marketing, downloads, sales, videos, testdocs, stats, faq };
})();
