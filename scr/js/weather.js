import axios from "axios";

const city = document.getElementById("city");
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const row = document.getElementById("tomorrow");
const api_key = import.meta.env.VITE_WEATHER_KEY;
let globalCoords = {
  lat: null,
  lng: null,
};
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  units: "units=metric",
  lang: "lang=sv-SE",
};

//Hämtar sökordet från input
btn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (event.type === "click") {
    let correctSearch = search.value;
    let addressNew = correctSearch.toLowerCase();
    await getData(addressNew);
    await fetchWeather();
  }
});
// Fetch för att hämta värdet från adress
//Uppdaterar globalCoords så fetchWeather kan ta fram daily på vädret
async function getData(address) {
  const urlAddress = encodeURI(address);
  try {
    const response = await axios.get(
      `${api.base}weather?q=${urlAddress}&${api.units}&appid=${api_key}&${api.lang}`
    );
    const coordinates = {
      lat: response.data.coord.lat,
      lng: response.data.coord.lon,
    };

    globalCoords.lat = coordinates.lat;
    globalCoords.lng = coordinates.lng;
    displayData(response.data);
    return coordinates;
  } catch (error) {
    fetchError(error);
  }
}

// Hämtar direkt lat/lon från användaren ifall hen godkänner position
function getUserLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    globalCoords.lat = position.coords.latitude;
    globalCoords.lng = position.coords.longitude;
    fetchWeather();
  });
}

// Uppdaterar vissa delar av skärmen med data
function displayData(response) {
  if (response.cod === "404") {
    console.log(response);
    console.log("hej");
    city.innerText = "Dagen";
    search.value = "";
  } else {
    row.style.display = "block";
    city.innerText = `${response.name}`;
    search.value = "";
  }
  localStorage.setItem("weatherLocation", JSON.stringify(response));
}

//Hämtar vädret från koordinater och skickar vidare
// Så dagarna kan visas på sidan
async function fetchWeather() {
  try {
    let lat = globalCoords.lat;
    let lng = globalCoords.lng;

    let url = `${api.base}onecall?lat=${lat}&lon=${lng}&appid=${api_key}&${api.units}&${api.lang}`;

    const resp = await axios.get(url);

    localStorage.setItem("weatherData", JSON.stringify(resp.data));
    showWeathers(resp.data);
  } catch (error) {
    fetchError(error);
  }
}

// Översätter engelska ord till svenska för showWeather
function translateWeather(condition) {
  const weatherMap = {
    Clear: "Klart",
    Clouds: "Moln",
    Rain: "Regn",
    Drizzle: "Duggregn",
    Thunderstorm: "Åska",
    Snow: "Snö",
  };

  return weatherMap[condition] || condition;
}

// För att visa vädret på sidan
function showWeathers(resp) {
  row.innerHTML = resp.daily
    .map((day, index) => {
      if (index <= 2) {
        let dt = new Date(day.dt * 1000);
        let options = { weekday: "long" };
        let dayNames = ["idag", "imorgon"];
        let dayName =
          index < 2 ? dayNames[index] : dt.toLocaleDateString("sv-SE", options);

        dayName = dayName[0].toUpperCase() + dayName.slice(1);

        let swedishWeather = translateWeather(day.weather[0].main);

        return ` <section id="tomorrow">
          <div class="card_box_bigger container">
            <div class="icon">
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="${day.weather[0].description}" class="weather-icons" />
            </div>
            <div class="location">
              <h3 class="current_day">${dayName}</h3>
              <div class="temp_weather">
              <div class="temp">${day.temp.eve}<span>°C</span></div>
              <div class="weather">${swedishWeather}</div>
            </div>
            <div class="current">
              <div class="nothing"></div>
            </div>
          </div>
        </section>`;
      }
    })
    .join(" ");
}

// tar hand om fetcher
function fetchError(error) {
  if (error.response && error.response.status === 404) {
    row.style.visibility = "hidden";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    return;
  } else {
    console.error("Felet är:", error);
  }
}

// Kollar om det finns sparningar i localstorage
function savedWeather() {
  const savedLocation = localStorage.getItem("weatherLocation");
  const savedWeather = localStorage.getItem("weatherData");
  if (savedWeather === null || savedLocation === null) {
    console.log("Inga tidigare väderdata tillgängliga.");
    row.innerHTML =
      '<p class="text-empty">Sök på en stad för att komma igång</p>';
  } else {
    showWeathers(JSON.parse(savedWeather));
    displayData(JSON.parse(savedLocation));
  }
}
getUserLocation();
savedWeather();
