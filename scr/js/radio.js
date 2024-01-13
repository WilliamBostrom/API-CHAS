import axios from "axios";

<h3 class="curr_time"></h3>;

// const btnPlayPause = document.querySelector(".btn-start-radio");
const btnStartDisplay = document.querySelector(".btn-onoff");
let curr_radio = document.createElement("audio");
// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

const url = "https://api.sr.se/api/v2/channels/?format=json";
const radios = document.querySelector(".mp3-display");

let channels = [];
let radioPerPage = 1;
let currentStation = 1;

async function radioData() {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Något gick snett");
    }

    channels = response.data.channels;

    displayRadioInfo();
  } catch (error) {
    console.error(error);
  }
}

const prevStn = () => {
  if (currentStation > 1) {
    currentStation--;
  } else {
    currentStation = channels.length;
  }
  displayRadioInfo();
};

const nextStn = () => {
  if (currentStation < Math.ceil(channels.length / radioPerPage)) {
    currentStation++;
  } else {
    currentStation = channels.length / channels.length;
  }
  displayRadioInfo();
};

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", nextStn);

const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", prevStn);

function displayRadioInfo() {
  const pages = [];
  for (let i = 0; i <= Math.ceil(channels.length / radioPerPage); i++) {
    pages.push(i);
  }

  const indexLastStation = currentStation * radioPerPage;
  const indexFirstStation = indexLastStation - radioPerPage;
  const currentPlay = channels.slice(indexFirstStation, indexLastStation);
  // console.log(currentPlay);

  radios.innerHTML = currentPlay
    .map(({ image, liveaudio, name, tagline }, index) => {
      // const tagSplice = tagline.substring(0, 70) + "...";
      return `<div class="mp3-display-top">
      <img
        class="mp3-img"
        src="${image}"
        alt=""
        width="100px"
      />
      <h3 class="radio-name">${name}</h3>
      </div>
      <div class="mp3-display-bottom">
      
      <audio id="audio-${index}" controls>
          <source src="${liveaudio.url}" type="audio/mpeg" />
        </audio>
        <div class="mp3-channel">
       <progress id="progressBar" value="0" max="100"></progress>
       <div class="mp3-text-loop"> 
        <p>${tagline}</p>
       </div>
       </div>
      </div>
        `;
    })
    .join("");
}

// Random styling för mp3 radion

const btnPlayMusic = document.querySelector(".start-mp3");
btnPlayMusic.addEventListener("click", pauseTrack);

function pauseTrack() {
  console.log("hej");
  btnPlayMusic.innerHTML = `<img
  class="btn-start-radio"
  src="/scr/img/plus.svg"
  alt=""
/> `;
}

const loadingMp3 = document.querySelector(".mp3-display-loading");
const loader = document.querySelector(".loader");
btnStartDisplay.onclick = function () {
  loadingMp3.classList.toggle("actives");
  loader.classList.add("actives");
  setTimeout(() => {
    radios.classList.toggle("active");
    btnPlayMusic.disabled = false;
    loader.classList.remove("actives");
  }, 2000);
};

radioData();

/* 
function playpauseRadio() {
  isPlaying ? pausTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  wave.classList.add("loader");
  playpause_btn.innerHTML = `<i class="fa-pause-circle> </i> `>
}


function fixVolume () {
  curr_track.volume = volume_slider.value / 100;
} */
