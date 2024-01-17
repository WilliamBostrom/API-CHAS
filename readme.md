# DASHBOARD UPPGIFT

Individuell uppgift från Chas Academy.

## Beskrivning:

Uppgiften gick ut på att skapa ett dashboard med HTML, CSS och JavaScript utan att använda några färdiga ramverk (_vanilla_). En annan aspekt var att använda Axios, ett JavaScript-bibliotek, att använda sig av för att hämta data från ett externt API, istället för den inbyggda fetch-funktionen. Dashboarden implementerades även med LocalStorage för att bevara ändringar mellan olika sessioner.

## Installation

För att köra detta projekt lokalt, följ stegen nedan:

1. **Klona detta repository till din lokala maskin:**

   ```bash
   git clone https://github.com/WilliamBostrom/API-CHAS.git
   ```

2. **Gå in i den klonade mappen::**

   ```bash
   cd ditt-repo

   ```

   3.**Installera projektets beroenden:**

   ```bash
   npm install

   ```

   4.**Lägg in API nycklarna:** Kolla _Konfiguration_ i nästa steg

   5.**Öppna sidan:**

   ```bash
   npm run dev
   ```

# Konfiguration

För att använda vissa funktioner i detta projekt, behöver du konfigurera några API-nycklar:

**OpenWeather API:** Registrera dig där för att få din API-nyckel. Ersätt sedan din nyckel i weaher.js (lägg till din nyckel i variablen "const api_key" ).

**Unsplash API:** Registrera dig där för att få din API-nyckel. Ersätt sedan din nyckel i script.js “const accessKey”.

**Lägg in dina nycklar så här**

**Skapa en .env fil utanför mapparna (kolla bild nedan):**

![bild på mall att följa](/scr/img/env-img.png)

**Lägg sedan in API nycklarna i .env-filen i detta format:**

- VITE_WEATHER_KEY=28fd15358cdecbc1a1dfe
- VITE_UNSPLASH_KEY=7NL9L20_W18jVy_mwrs

_Hemsidan kan komma vara hostad vid ett senare stadie, så ifall det är så, då behövs det inga egna API-nycklar._

## Översikt över olika delar

_Bild på mall att följa:_

![bild på mall att följa](/scr/img/chas-dashboard.png)

### Klocka och Datum:

- Visar klockslag och datum.
- Uppdaterar klockan dynamiskt utan att ladda om sidan när tiden ändras.

### Redigerbar Rubrik:

- Möjliggör redigering av sidrubriken.
- Sparar ändringar direkt.

### Länkar:

- Visar sparade länkar.
- Ger möjlighet att ta bort och lägga till nya länkar.
- Extra utmaning: Hämtar länkens favicon och visar det som en bild.

### Väder i Närtid:

- Visar aktuellt väder.
- Använder browserns geolocation-api för att bestämma platsen.
- Extra utmaning: Låter användaren anpassa orten.

### Anpassbar Del:

- Återskapade en radio från ett tidigare arbete, men gjorde den mer avancerad.

### Snabba Anteckningar:

- Användaren kan skriva snabba anteckningar i en textarea.
- Endast en anteckning finns, och den sparas kontinuerligt.

### Randomiserad Bild:

- Hämtar en randomiserad bild från Unsplash API.
- Extra utmaning: Låter användaren fylla i ett sökord för att hitta bilder inom ett önskat tema.

## Resonemang

Denna uppgift var både lärorik och underhållande, särskilt eftersom jag inte hade speciellt mycket erfarenhet av att arbeta med API:er tidigare. Det var intressant att utforska och skaffa en djupare förståelse för arraymetoder och liknande koncept som jag nyligen har lärt mig.

I detta arbete har jag försökt strukturera koden genom att organisera den i olika mappar efter varje "kort", och jag har gett lämpliga namn åt funktioner, mappar och id/classer för att göra koden lättförståelig för andra. Det finns några undantag i min radio.css, där jag kan ha många för liknande namn. Jag har också lagt till kommentarer över varje funktion i JavaScript-filen för ytterligare förtydligande nu vid inlämning av uppgiften.

När det gäller förbättringsområden finns det en del, särskilt inom mina JavaScript-kunskaper. Trots att jag har studerat en del utanför skolan de senaste månaderna, känner jag att det fortfarande återstår en bit innan jag behärskar alla delar och vet exakt vilken metod som ska användas var. Jag upplever att mina bristande kunskaper i detta avseende kan göra att koden ser oorganiserad ut, vilket ibland resulterar i onödigt många rader för enklare funktioner, som exempelvis "formatUrl" i "links.js". Dessutom finns det mer för mig att lära när det gäller användningen av promises, inklusive "promise all/race". Det skulle ha varit möjligt att optimera genom att kombinera fetch-anropen från olika URL:er till ett enda (t.ex. i weather.js).

## Mer om väder-API:n (weather.js):

Jag slutförde egentligen sidan för några dagar sedan, där jag initialt använde Googles API för att hitta platser och hämta väderinformation. Dock valde jag att inte exponera det API:et och bestämde mig istället för att utmana mig själv genom att byta ut Googles API mot Openweathers API. Det slutgiltiga resultatet involverar tre olika fetch-anrop för att hämta väderdata från olika källor. Det inkluderar webbläsarens inbyggda "navigator.geolocation-api" samt två separata fetch-anrop från Openweather.

Jag gör ett fetch-anrop till en Openweathers URL som kan hantera adresser. Därefter uppdaterar jag longitud och latitud för mitt andra fetch-anrop, vilket hämtar väderdata för kommande dagar. Trots att jag anser att koden är ganska välanpassad, känner jag samtidigt att det finns utrymme för förbättringar inom flera områden.

I efterhand tror jag att jag möjligen kunde ha uppnått samma resultat även om jag från början hade känt till fler detaljer om olika API:er. Jag tänker nu att det förmodligen finns andra API:er som skulle kunna leverera samma information med en enda fetch-förfrågan.

Ett område för förbättring skulle kunna vara min förståelse för hur jag kan hämta data från användarens "navigator.geolocation" och konvertera longitud och latitud tillbaka till en adress. Problemet här är att om en sökning görs, har jag all information och stadens namn högst upp i rutan. Men om sidan uppdateras hämtar "navigator.geolocation" användarens koordinater igen. Jag lyckades inte konvertera longitud/latitud tillbaka till en adress utan att använda Googles API. En möjlig förenkling hade varit att ta bort stadens namn som visas högst upp på väderkortet, men om användaren inte godkänner sin plats fungerar det annars helt som det ska.

Utöver detta implementerade jag en enkel lösning vid sökning på en stad med ogiltigt namn. Det resulterar i att webbläsaren uppdateras med "window.location.reload" om ett ogiltigt namn anges. Detta gjorde jag för att visa det senast giltiga resultatet från localstorage.

## Bonusdelen:

Jag valde att skapa en radio från Sveriges Radios API, vilket slutade med mer kod än hela min styles.css som står för resterande av webbplatsen. Jag implementerade en "play-knapp" som är inaktiverad när radion är avstängd, lade också till en "loading-skärm" med setTimeout, integrerade ett nytt API även där, från "https://dog.ceo/dog-api", som jag byggde tillsammans med Unsplashs API för att generera en slumpmässig hundbakgrundsbild (fast här på hundar endast), gör en promise all på både Unsplash API och Dog.ceo API och gör att både bakgrundsbilden för hela skärmen uppdateras och att nya hundbilder visas i "displayen" för mp3-spelaren. Jag inkluderade även klockfunktionen från toppen av hemsidan, la till en setTimeout för ett "progress-elementet" så att ljudbaren visas i en sekund vid knapptryck för ljud (höja och sänka) görs, samt en CSS-animationer för rullande text från radionkanalernas API och även en rotationsanimation för bilden som representerar radionkanalen vid uppspelning av musik. Har även lagt in en timer som körs när man trycker "play" på en radiokanal och som representerar tiden man lyssnat, den stannar när man trycker paus och nollställs vid byte till annan radiokanal.

## Mitt resultat

![bild på mitt slutresultat](/scr/img/joedoedashboard.png)
