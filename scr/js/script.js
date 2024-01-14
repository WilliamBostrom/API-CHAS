import axios from "axios";

const labelDate = document.querySelector("#date");
const labelTime = document.querySelectorAll("#time");
const mp3Time = document.querySelector(".mp3-time");
const dashboard = document.querySelector("#dashboard");
const textArea = document.querySelector(".card_textarea");
const backgroundTheme = document.querySelector("#bakgrundsTema");
const mp3display = document.querySelector(".mp3-display");
const randomImagesButton = document.querySelector(".randomImagesButton");

// 1) Här ska klockslag och datum synas och klockan ska ändras när tiden ändras utan att sidan laddas om.
function updateDateAndTime() {
  const now = new Date();
  // För datum
  const day = now.getDate();
  const month = new Intl.DateTimeFormat("sv-SE", { month: "long" }).format(now);
  const year = now.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  labelDate.textContent = formattedDate;

  // För klocka
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  labelTime.forEach((timeEl) => {
    timeEl.textContent = formattedTime;
  });
  mp3Time.textContent = formattedTime;
}
// Uppdatera klockan varje sekund
setInterval(updateDateAndTime, 1000);

// 2) Rubriken på sidan ska användaren kunna ändra
// För att kunna byta namn på sidan
function makeEditable() {
  const savedText = localStorage.getItem("dashboardText");
  const defaultText = savedText || "John Doe Dashboard";
  dashboard.innerHTML = `${defaultText}`;
  dashboard.setAttribute("contenteditable", "true");
  dashboard.addEventListener("input", function () {
    const newText = dashboard.innerText;
    localStorage.setItem("dashboardText", newText);
  });
}

// 6 Textarea som sparar input
function saveNotes() {
  const savedText = localStorage.getItem("textArea");
  const defaultText = savedText || "Skriv något här";
  textArea.value = defaultText;

  textArea.addEventListener("input", () => {
    const newText = textArea.value;
    localStorage.setItem("textArea", newText);
  });
}

// 7) Unsplash API
//För att få fram en random bakgrundsbild + sökord
const accessKey = import.meta.env.VITE_UNSPLASH_KEY;

// Bakgrundsbilds-knappen för body om mp3display
randomImagesButton.addEventListener("click", async (e) => {
  e.preventDefault();
  let inputBackground = backgroundTheme.value.trim();
  let query = inputBackground ? inputBackground : "sweden";
  // let queryMp3 = inputBackground ? inputBackground : "white";
  let requestUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
  let requestUrl2 = "https://dog.ceo/api/breeds/image/random";
  // let requestUrl2 = `https://api.unsplash.com/search/photos?query=${queryMp3}&client_id=${accessKey}`;
  console.log(requestUrl);

  try {
    const [randomImage, randomImage2] = await Promise.all([
      getNewImage(requestUrl),
      getNewDogImage(requestUrl2),
    ]);

    document.body.style.backgroundImage = `url(${randomImage})`;
    mp3display.style.backgroundImage = `url(${randomImage2})`;
  } catch (error) {
    console.error(error);
  }
});

// Fetchar bilder
async function getNewImage(requestUrl) {
  try {
    const res = await axios.get(requestUrl);

    if (!res.data.results || !res.data.results.length) {
      throw new Error("Misslyckad fetch");
    }

    let randomNumber = Math.floor(Math.random() * res.data.results.length);
    let selectedImage = res.data.results[randomNumber];

    return selectedImage.urls.regular;
  } catch (err) {
    console.error(err);
    return;
  }
}

// Fetchar slumpmässiga hundbild från "dog.ceo"
async function getNewDogImage(requestUrl) {
  try {
    const res = await axios.get(requestUrl);

    if (!res.data.message) {
      throw new Error("Misslyckad fetch");
    }

    return res.data.message;
  } catch (err) {
    console.error(err);
    return;
  }
}

//Kör functionerna som ska köras
const init = function () {
  updateDateAndTime();
  makeEditable();
  saveNotes();
};
init();
