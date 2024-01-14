# DASHBOARD UPPGIFT

Individuell uppgift från Chas Academy.

## Beskrivning:

Uppgiften handlade om att skapa ett dashboard med HTML, CSS och JavaScript utan att använda färdiga ramverk (_vanilla_). Användningen av Axios, ett JavaScript-bibliotek, var nödvändig för att hämta data från ett externt API istället för den inbyggda fetch-funktionen. Dashboarden implementerades med LocalStorage för att behålla ändringar mellan sessioner.

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

3. **Installera projektets beroenden:**

   ```bash
   npm install

   ```

4. **Öppna sidan:**
   ```bash
   npm run dev
   ```

# Konfiguration

För att använda vissa funktioner i detta projekt, behöver du konfigurera några API-nycklar:

**OpenWeather API:** Registrera dig där för att få din API-nyckel. Ersätt sedan din nyckel i weaher.js (lägg till din nyckel i app objectet).

**Unsplash API:** Registrera dig där för att få din API-nyckel. Ersätt sedan din nyckel i script js “accessKey”.

\_Hemsidan kan komma vara hostad vid ett senare stadie, så ifall det är så, då behövs det inga egena API-nyckelar.

## Översikt över olika delar

_Bild på mall att följa:_

![bild på mitt slutresultat](/scr/img/chas-dashboard.png)

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

Efter att ha snabbt byggt sidan bestämde jag mig för att utmana mig själv genom att helt och hållet ersätta Googles API med Openweathers API. Slutresultatet innebar tre olika fetch-anrop för att hämta väderdata från olika källor, inklusive webbläsarens inbyggda "navigator geolocation" samt två separata fetcher från Openweather. Även om jag anser att koden är väl strukturerad, känner jag samtidigt att det finns utrymme för förbättringar på olika områden. Jag tror att jag bland annat kunde ha använt mig av "promise all" för att kombinera båda fetcherna och optimera koordinathämtningen till en funktion. Dessutom implementerade jag en enkel lösning vid sökning på en stad med ogiltigt namn, vilket resulterar i att webbläsaren uppdateras med "window.reload.location" om ett felaktigt namn anges. Detta gjorde jag för att visa det senast giltiga resultatet från localstorage.

## Bonusdelen:

Jag valde att skapa en radio från Sveriges Radios API, vilket slutade med mer kod än hela min styles.css för resterande av webbplatsen. Jag implementerade en "play-knapp" som är inaktiverad när radion är avstängd, lade också till en "loading-skärm" med setTimeout, integrerade ett nytt API även där, från "https://dog.ceo/dog-api", som jag byggde tillsammans med Unsplashs API för att generera en slumpmässig hundbakgrundsbild, gör en promise all på både Unsplash API och Dog.ceo API och gör att både bakgrundsbilden för hela skärmen uppdateras och att nya hundbilder visas i "displayen" för mp3-spelaren. Jag inkluderade även klockfunktionen från toppen av hemsidan, la till en setTimeout för ett "progress-elementet" så att ljudbaren visas i en sekund vid knapptryck för ljud (höja och sänka), samt en CSS-animationer för rullande text från radionkanalernas API och även en rotationsanimation för bilden som representerar radionkanalen vid uppspelning av musik.

## Mitt resultat

![bild på mitt slutresultat](/scr/img/joedoedashboard.png)