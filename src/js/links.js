// 3) Länkar som går att sparas / ta bort
const linkInput = document.querySelector(".card_add");
const linkBtn = document.querySelector(".card_button_add");
const icons = document.getElementById("icons");
const linkValue = linkInput.value;

let fastLinks = [];

//Kollar localstorage
function getFastLinks() {
  let fast = localStorage.getItem("fast");
  if (fast == null) {
    fastLinks = [];
  } else {
    fastLinks = JSON.parse(fast);
  }
}

// Funktion för att formatera webbadressen
function formatUrl(inputUrl) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  const fullUrl = inputUrl.startsWith("http")
    ? inputUrl
    : `https://${inputUrl}`;

  if (inputUrl === "" || !urlRegex.test(fullUrl)) {
    return null;
  }

  const urlObject = new URL(fullUrl);
  const siteName = urlObject.hostname;

  // Snygga till namnet
  let displayName = siteName;
  displayName = displayName.replace(/^https?:\/\/(www\.)?/, "");
  displayName = displayName.replace(/www\./g, "");
  displayName = displayName[0].toUpperCase() + displayName.slice(1);
  let lastDot = displayName.lastIndexOf(".");
  if (lastDot !== -1) {
    displayName = displayName.slice(0, lastDot);
  }
  if (displayName.indexOf(".") !== -1) {
    displayName = displayName.replace(".", " ");
  }
  // Få fram favicon
  // const favicon = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${urlObject.hostname}`;
  const favicon = `https://www.google.com/s2/favicons?domain=${urlObject.hostname}&sz=25`;
  return {
    link: fullUrl,
    title: displayName,
    favicon: favicon,
  };
}

// 3B)
// Klickhändelsen för att få fram Snabblänken
linkBtn.addEventListener("click", () => {
  const inputUrl = linkInput.value.trim();
  const formattedData = formatUrl(inputUrl);
  if (formattedData === null) {
    return alert(
      "Ogiltig webbadress. Ta med hela webbadressen och försök igen."
    );
  }
  getFastLinks();
  let fastObj = formattedData;
  fastLinks.unshift(fastObj);
  localStorage.setItem("fast", JSON.stringify(fastLinks));
  linkInput.value = "";
  displayFastLinks();
});

// 3a)
//Ta bort objekt från snabba länkar
document.addEventListener("click", function (event) {
  const deleteIcon = event.target.closest(".card_delete_icon");

  if (deleteIcon) {
    getFastLinks();
    const index = +deleteIcon.getAttribute("data-index");
    fastLinks.splice(index, 1);
    localStorage.setItem("fast", JSON.stringify(fastLinks));
    displayFastLinks();
  }
});

// Visa "Snabba länkar" på sidan
function displayFastLinks() {
  getFastLinks();
  let html = "";
  fastLinks.forEach(function (element) {
    html += `<button class="card_button">
    <div class="card_box_name">
    <a href="${
      element.link
    }" target="_blank"> <div class="card_flex"> <img src="${
      element.favicon
    }" id="icons"/> <h3>${element.title}</h3></div></a>
    </div>
    <a class="card_delete_icon" data-index="${fastLinks.indexOf(element)}">
    <img src="/minus-circle.svg"/></a>
    
  </button>`;
  });
  let fastElm = document.getElementById("fast");
  if (fastLinks.length != 0) {
    fastElm.innerHTML = html;
  } else {
    fastElm.innerHTML = '<p class="text-empty">Finns inga sidor att se</p>';
  }
}

displayFastLinks();
