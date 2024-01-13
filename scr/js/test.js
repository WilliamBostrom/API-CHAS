import axios from "axios";

const city = document.getElementById("city");

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
    await fetchWeather();
    await getData(search.value);
  }
}

async function getData(address) {
  const urlAddress = encodeURI(address);
  try {
    const response = await axios.get(
      `${api.base}weather?q=${urlAddress}&units=metric&appid=${api.key}`
    );

    const coordinates = {
      lat: response.data.coord.lat,
      lng: response.data.coord.lon,
    };

    // console.log(coordinates);
    globalCoords.lat = coordinates.lat;
    globalCoords.lng = coordinates.lng;
    console.log(globalCoords.lng);
    displayData(response.data);
    return coordinates;
  } catch (error) {
    fetchError(error);
  }
}

function displayData(response) {
  if (response.cod === "404") {
    const error = document.querySelector(".error");
    error.textContent = "Skriv en stad";
    city.innerText = "Dagen";
    search.value = "";
  } else {
    // errorElement.style.display = "none";
    row.style.display = "block";
    city.innerText = `${response.name}`;
    console.log(city.innerText);
    search.value = "";
  }
  localStorage.setItem("weatherLocation", JSON.stringify(response));
}

async function fetchWeather() {
  try {
    let lat = globalCoords.lat || 59.32932349999999;
    let lng = globalCoords.lng || 18.0685808;

    let lang = "sv-SE";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${api.key}&units=${units}&lang=${lang}`;

    const resp = await axios.get(url);

    localStorage.setItem("weatherData", JSON.stringify(resp.data));
    showWeathers(resp.data);
  } catch (error) {
    fetchError(error);
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
let row = document.getElementById("tomorrow");
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

let globalCoords = {
  lat: null,
  lng: null,
};

const savedWeather = localStorage.getItem("weatherData");
const savedLocation = localStorage.getItem("weatherLocation");
displayData(JSON.parse(savedLocation));
showWeathers(JSON.parse(savedWeather));

function fetchError(error) {
  if (error.response && error.response.status === 404) {
    // errorElement.style.display = "block";
    row.style.visibility = "hidden";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    return;
  } else {
    console.error("Felet är:", error);
  }
}
