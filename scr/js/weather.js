import axios from "axios";

const city = document.getElementById("city");
const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const row = document.getElementById("tomorrow");

let globalCoords = {
  lat: null,
  lng: null,
};
const api = {
  key: "28fd15358cdecbc1a1dfef367e71acef",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "units=metric",
  lang: "lang=sv-SE",
};

btn.addEventListener("click", getInput);

//Hämtar sökordet från input
async function getInput(event) {
  event.preventDefault();
  if (event.type == "click") {
    let correctSearch = search.value;
    let adressNew = correctSearch.toLowerCase();
    await fetchWeather();
    await getData(adressNew);
  }
}
// Fetch för att hämta värdet från adress
//Uppdaterar globalCoords så fetchWeather kan ta fram daily
async function getData(address) {
  const urlAddress = encodeURI(address);
  try {
    const response = await axios.get(
      `${api.base}weather?q=${urlAddress}&${api.units}&appid=${api.key}&${api.lang}`
    );
    console.log("API Response:", response.data);
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
    let lat = globalCoords.lat || 59.32932349999999;
    let lng = globalCoords.lng || 18.0685808;

    let url = `${api.base}onecall?lat=${lat}&lon=${lng}&appid=${api.key}&${api.units}&${api.lang}`;

    const resp = await axios.get(url);
    console.log("fetchWeather Response:", resp.data);
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
function getYourWeather() {
  const savedWeather = localStorage.getItem("weatherData");
  const savedLocation = localStorage.getItem("weatherLocation");

  if (savedWeather === null || savedLocation === null) {
    console.log("Inga tidigare väderdata tillgängliga.");
    row.innerHTML =
      '<p class="text-empty">Sök på en stad för att komma igång</p>';
  } else {
    displayData(JSON.parse(savedLocation));
    showWeathers(JSON.parse(savedWeather));
  }
}

getYourWeather();
