const labelDate = document.querySelector("#date");
const labelTime = document.querySelectorAll(".time");
// const mp3Time = document.querySelector(".time");
const dashboard = document.querySelector("#dashboard");

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

  labelTime.textContent = formattedTime;
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
const textArea = document.querySelector(".card_textarea");

function saveNotes() {
  const savedText = localStorage.getItem("textArea");
  const defaultText = savedText || "Skriv något här";
  textArea.value = defaultText;

  textArea.addEventListener("input", function () {
    const newText = textArea.value;
    localStorage.setItem("textArea", newText);
  });
}

// 7) Unsplash API
//För att få fram en random bakgrundsbild + sökord
const accessKey = "7NL9L20_W18jVy_mwrsMMbptge1UZ2BazM_czXLheTc";
let backgroundTheme = document.querySelector("#bakgrundsTema");
const randomImagesButton = document.querySelector(".randomImagesButton");

// Bakgrundsbilds-knappen
randomImagesButton.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("klickad");
  let inputBackground = backgroundTheme.value.trim();
  let query = inputBackground ? inputBackground : "sweden";
  let requestUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

  backgroundTheme.value = "";
  let randomImage = await getNewImage(requestUrl);
  document.body.style.backgroundImage = `url(${randomImage})`;
});

async function getNewImage(requestUrl) {
  let randomNumber = Math.floor(Math.random() * 10);
  return fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let allImages = data.results[randomNumber];
      return allImages.urls.regular;
    });
}

// Kör makeEditable när sidan laddas
const init = function () {
  updateDateAndTime();
  makeEditable();
  saveNotes();
};
init();
