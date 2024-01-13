import axios from "axios";

// Bonus sidan

const url = "https://api.sr.se/api/v2/channels/?format=json";
const btnStartDisplay = document.querySelector(".btn-onoff");
const radios = document.querySelector(".mp3-display");
const loadingMp3 = document.querySelector(".mp3-display-loading");
const loader = document.querySelector(".loader");
const startpauseBtn = document.querySelector(".start-mp3");
const mp3channeltype = document.querySelector(".mp3-channeltype");
const mp3img = document.querySelector(".mp3-img");
const radioName = document.querySelector(".radio-name");
const mp3tagLine = document.querySelector(".mp3-text-loop");
const mp3timer = document.querySelector(".mp3-time-playing");
// Volym
const btnLow = document.querySelector(".volume-down");
const btnHigh = document.querySelector(".volume-up");
const volumeSlider = document.querySelector(".volume_slider");
const progressBox = document.querySelector(".progress-box");

let channels = [];
let radioPerPage = 1;
let currentStation = 0;
let updateTimer;
let isPlaying = false;
let curr_radio = document.createElement("audio");

//Fetcha radio
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
    displayRadioInfo(channels, currentStation);
  } catch (err) {
    console.error(err);
  }
}

// Kolla om radio spelas
function playpauseRadio() {
  isPlaying ? pauseRadio() : playRadio();
}

// stop / play
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
  mp3img.classList.remove("spinn-img");
  startpauseBtn.innerHTML = `
    <img class="btn-start-radio" src="/scr/img/play.svg" alt="" />
 `;
}
//Tidigare radio
const prevStn = () => {
  pauseRadio();
  if (currentStation > 0) {
    currentStation--;
  } else {
    currentStation = channels.length - 1;
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

const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", prevStn);

// Nästa radio
const nextStn = () => {
  pauseRadio();
  if (currentStation < channels.length - 1) {
    currentStation++;
  } else {
    currentStation = 0;
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

/* Utseendet radio */
function displayRadioInfo(channels, currentStation) {
  clearInterval(updateTimer);
  reset();

  const pages = [];
  for (let i = 0; i <= Math.ceil(channels.length / radioPerPage); i++) {
    pages.push(i);
  }
  curr_radio.src = channels[currentStation].url;
  curr_radio.load();

  const indexLastStation = currentStation * radioPerPage;
  const indexFirstStation = indexLastStation - radioPerPage;
  const currentPlay = channels.slice(indexFirstStation, indexLastStation);
  // Styla sidan efter data
  mp3channeltype.textContent = channels[currentStation].channeltype;
  mp3img.src = channels[currentStation].image;
  radioName.textContent = channels[currentStation].name;
  mp3tagLine.textContent = channels[currentStation].tagline;

  updateTimer = setInterval(setUpdate, 1000);
  curr_radio.addEventListener("ended", nextBtn);
}

startpauseBtn.addEventListener("click", playpauseRadio);

// Starta mp3-radion
btnStartDisplay.onclick = function () {
  loadingMp3.classList.toggle("actives");
  loader.classList.add("actives");
  setTimeout(() => {
    pauseRadio();
    radios.classList.toggle("active");
    startpauseBtn.disabled = false;
    loader.classList.remove("actives");
  }, 2000);
};
// Starta om "lyssnings-tiden"
function reset() {
  mp3timer.textContent = "00:00";
}

// formatera "lyssnings-tiden"
function setUpdate() {
  const currentTime = Math.floor(curr_radio.currentTime);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  mp3timer.textContent = formattedTime;
}

// Event listeners
btnLow.addEventListener("click", function () {
  displayVolume();
  decreaseVolume();
});
btnHigh.addEventListener("click", function () {
  displayVolume();
  increaseVolume();
});

// För ljudet
function displayVolume() {
  console.log("hej");
  progressBox.style.visibility = "visible";
  setTimeout(() => {
    progressBox.style.visibility = "hidden";
  }, 1000);
}

function decreaseVolume() {
  if (curr_radio.volume > 0) {
    curr_radio.volume -= 0.1;
    updateVolumeSlider();
    setVolume();
  }
}

function increaseVolume() {
  if (curr_radio.volume < 1) {
    curr_radio.volume += 0.1;
    updateVolumeSlider();
    setVolume();
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
