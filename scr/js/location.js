import axios from "axios";

const url = "https://api.sr.se/api/v2/channels/?format=json";
const btnStartDisplay = document.querySelector(".btn-onoff");
const radios = document.querySelector(".mp3-display");
const loadingMp3 = document.querySelector(".mp3-display-loading");
const loader = document.querySelector(".loader");
const startpauseBtn = document.querySelector(".start-mp3");
const btnPlayMusic = document.querySelector(".start-mp3");
const mp3img = document.querySelector(".mp3-img");

let channels = [];
let radioPerPage = 1;
let currentStation = 1;
let isPlaying = false;
let curr_radio = document.createElement("audio");

async function radioData() {
  try {
    const res = await axios.get(url);
    if (res.data.error) {
      throw new Error("Något gick snett");
    }

    channels = res.data.channels.map((radio) => {
      return {
        image: radio.image,
        name: radio.name,
        channeltype: radio.channeltype,
        url: radio.liveaudio.url,
        tagline: radio.tagline,
      };
    });

    console.log(channels);
    displayRadioInfo(channels, currentStation);
  } catch (err) {
    console.error(err);
  }
}

function playpauseRadio() {
  isPlaying ? pauseRadio() : playRadio();
}

// stop play
function playRadio() {
  console.log("clickad");
  curr_radio.play();
  isPlaying = true;
  mp3img.classList.add("spinn-img"); // Corrected class name
  startpauseBtn.innerHTML = `
  <img
    class="pause-start-radio"
    src="/scr/img/pause.svg"
    alt=""
  />
`;
}

// Pausa radio
function pauseRadio() {
  curr_radio.pause();
  isPlaying = false;
  mp3img.classList.remove("spinn-img"); // Corrected class name
  startpauseBtn.innerHTML = `
    <img class="btn-start-radio" src="/scr/img/play.svg" alt="" />
 `;
}
//Nästa radio
const prevStn = () => {
  if (currentStation > 1) {
    currentStation--;
  } else {
    currentStation = channels.length;
  }
  startpauseBtn.innerHTML = `
  <img
    class="pause-start-radio"
    src="/scr/img/play.svg"
    alt=""
  />
`;
  displayRadioInfo(channels, currentStation);
};

const nextStn = () => {
  if (currentStation < Math.ceil(channels.length / radioPerPage)) {
    currentStation++;
  } else {
    currentStation = channels.length / channels.length;
  }
  startpauseBtn.innerHTML = `
  <img
    class="pause-start-radio"
    src="/scr/img/play.svg"
    alt=""
  />
`;
  displayRadioInfo(channels, currentStation);
};

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", nextStn);

const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", prevStn);

/* Utseendet radio */
function displayRadioInfo(channels, currentStation) {
  const pages = [];
  for (let i = 0; i <= Math.ceil(channels.length / radioPerPage); i++) {
    pages.push(i);
  }
  curr_radio.src = channels[currentStation].url;
  curr_radio.load();

  const indexLastStation = currentStation * radioPerPage;
  const indexFirstStation = indexLastStation - radioPerPage;
  const currentPlay = channels.slice(indexFirstStation, indexLastStation);
  radios.innerHTML = currentPlay
    .map(({ image, channeltype, name, tagline }, index) => {
      return `<div class="mp3-nav">
      <p class="mp3-channeltype">${channeltype}</p>
      <span class="mp3-time"></span>
   
      </div>
      <div class="mp3-display-top">
      <img
        class="mp3-img"
        src="${image}"
        alt=""
        width="100px"
      />
      <h3 class="radio-name">${name}</h3>
     <div class="progress-box">
      <progress
      min="1"
      max="100"
      value="99"
      class="volume_slider"
      oninput="setVolume()"
    />
    </div>
      </div>
        <div class="mp3-display-bottom">
   
    
          <div class="mp3-channel">
          
            <div class="mp3-text-loop"> 
             <p>${tagline}</p>
          </div>
       </div>
      </div>
        `;
    })
    .join("");
  curr_radio.addEventListener("ended", nextBtn);
}

btnPlayMusic.addEventListener("click", playpauseRadio);

// Starta mp3-radion
btnStartDisplay.onclick = function () {
  loadingMp3.classList.toggle("actives");
  loader.classList.add("actives");
  setTimeout(() => {
    pauseRadio();
    radios.classList.toggle("active");
    btnPlayMusic.disabled = false;
    loader.classList.remove("actives");
  }, 2000);
};

// Volume controls
const btnLow = document.querySelector(".volume-down");
const btnHigh = document.querySelector(".volume-up");
const volumeSlider = document.querySelector(".volume_slider");
const progressBox = document.querySelector(".progress-box");
// Event listeners
btnLow.addEventListener("click", function () {
  // displayVolume();
  decreaseVolume();
});
btnHigh.addEventListener("click", function () {
  // displayVolume();
  increaseVolume();
});

/* function displayVolume() {
  console.log("hej");
  progressBox.style.visibility = "visible";
  setTimeout(() => {
    progressBox.style.visibility = "hidden";
  }, 1000);
} */

// Radio player controls
function decreaseVolume() {
  if (curr_radio.volume > 0) {
    curr_radio.volume -= 0.1;
    updateVolumeSlider();
    setVolume();
    // Delayed visibility change
  }
}

function increaseVolume() {
  if (curr_radio.volume < 1) {
    curr_radio.volume += 0.1;
    updateVolumeSlider();
    setVolume();
    // Delayed visibility change
  }
}

function updateVolumeSlider() {
  volumeSlider.value = curr_radio.volume * 100;
}

function setVolume() {
  curr_radio.volume = volumeSlider.value / 100;
  volumeSlider.value = curr_radio.volume * 100;
  const progressElement = document.querySelector(".volume_slider");
  progressElement.value = curr_radio.volume * 100;
}

radioData();
