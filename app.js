let currentBeerIndex = 0;
document.addEventListener("DOMContentLoaded", () => {
  const reloadButton = document.getElementById("reload-button");
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  // reload powinien znieniać index na 0
  reloadButton.addEventListener("click", getBeerInfo);
  previousButton.addEventListener("click", showPreviousBeer);
  nextButton.addEventListener("click", showNextBeer);

  if (!localStorage.getItem("currentBeerIndex")) {
    localStorage.setItem("currentBeerIndex", 0);
  }
  getBeerInfo();
});

const tableJSON = localStorage.getItem("table");

let table = [];
if (tableJSON) {
  table = JSON.parse(tableJSON);
}

const updatedTableJSON = JSON.stringify(table);
localStorage.setItem("table", updatedTableJSON);

async function getBeerInfo() {
  try {
    let beer;
    console.log(currentBeerIndex);
    if (currentBeerIndex === 0) {
       const response = await fetch("https://api.punkapi.com/v2/beers/random");
       const data = await response.json();
       let beer = data[0];
       table.push(beer);
       const updatedTableJSON = JSON.stringify(table);
       localStorage.setItem("table", updatedTableJSON);    
    } else {
       beer = table[currentBeerIndex];
    }
    console.log(beer);

    const beerImage = document.getElementById("beer-image");
    const beerName = document.getElementById("beer-name");
    const beerTagline = document.getElementById("beer-tagline");
    const beerDescription = document.getElementById("beer-description");
    const beerBrewed = document.getElementById("beer-brewed");
    const beerFoodPairing = document.getElementById("beer-food-pairing");

    beerImage.src = beer.image_url;
    beerName.textContent = beer.name;
    beerTagline.textContent = beer.tagline;
    beerDescription.textContent = beer.description;
    beerBrewed.textContent = "First Brewed: " + beer.first_brewed;
    beerFoodPairing.textContent =
      "Food Pairing: " + beer.food_pairing.join(", ");

    localStorage.setItem("currentBeerIndex", currentBeerIndex);
    updateNavigationButtons(currentBeerIndex);
  } catch (error) {
    console.error("Error fetching beer information:", error);
  }
}

function showPreviousBeer() {
  currentBeerIndex = parseInt(localStorage.getItem("currentBeerIndex"), 10);
  if (currentBeerIndex > 0) {
    currentBeerIndex--;
    localStorage.setItem("currentBeerIndex", currentBeerIndex);
    getBeerInfo();
  }
}

function showNextBeer() {
  currentBeerIndex = parseInt(localStorage.getItem("currentBeerIndex"), 10);
  currentBeerIndex++;
  localStorage.setItem("currentBeerIndex", currentBeerIndex);
  getBeerInfo();
}

function updateNavigationButtons(currentBeerIndex) {
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  previousButton.disabled = currentBeerIndex === 0;
  nextButton.disabled = false;
}
