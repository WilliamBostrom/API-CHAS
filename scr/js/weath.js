import axios from "axios";

const api = {
  key: "28fd15358cdecbc1a1dfef367e71acef",
  base: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

async function getInput(event) {
  event.preventDefault();
  if (event.type == "click") {
    await getCoordsForWeather(search.value);
    await fetchWeather();
    await getData();

    console.log(search.value);
  }
}

async function getData() {
  try {
    const response = await axios.get(
      `${api.base}weather?q=${
        search.value ? search.value : "stockholm"
      }&units=metric&appid=${api.key}`
    );

    displayData(response.data);
  } catch (error) {
    handleFetchError(error);
  }
}

function displayData(response) {
  const city = document.getElementById("city");
  if (response.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = "Skriv en stad";
    city.innerText = "Dagen";
    search.value = "";
  } else {
    city.innerText = `${response.name}`;
    search.value = "";
  }
  localStorage.setItem("weatherLocation", JSON.stringify(response));
}

async function fetchWeather() {
  try {
    let lat = globalCoords.lat || 59.32932349999999;
    let lng = globalCoords.lng || 18.0685808;
    let key = "7562c44b17e0876f37e5243e778fd0fe";
    let lang = "sv-SE";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=${lang}`;

    const resp = await axios.get(url);

    localStorage.setItem("weatherData", JSON.stringify(resp.data));
    showWeathers(resp.data);
  } catch (error) {
    handleFetchError(error);
  }
}

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

function showWeathers(resp) {
  let row = document.getElementById("tomorrow");
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

let globalCoords = {
  lat: null,
  lng: null,
};

async function getCoordsForWeather(address) {
  const GOOGLE_API_KEY = "AIzaSyD8vmrArfL6BekPeh0xA1Ga8Vc1lB0a7pA";
  const urlAddress = encodeURI(address);
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API_KEY}`
    );

    const coordinates = response.data.results[0].geometry.location;
    globalCoords.lat = coordinates.lat;
    globalCoords.lng = coordinates.lng;
    console.log(globalCoords);
    return coordinates;
  } catch (error) {
    handleFetchError(error);
  }
}

const savedWeather = localStorage.getItem("weatherData");
const savedLocation = localStorage.getItem("weatherLocation");
displayData(JSON.parse(savedLocation));
showWeathers(JSON.parse(savedWeather));

function handleFetchError(error) {
  if (error.response && error.response.status === 404) {
    const errorElement = document.querySelector(".error");
    errorElement.textContent = "Please enter a valid city";
  } else {
    console.error("An error occurred while fetching data:", error);
  }
}
