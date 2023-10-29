document.addEventListener("DOMContentLoaded", () => {
  const reloadButton = document.getElementById("reload-button");
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  reloadButton.addEventListener("click", getBeerInfo);
  previousButton.addEventListener("click", showPreviousBeer);
  nextButton.addEventListener("click", showNextBeer);

  // Initialize with the first beer if local storage is empty.
  if (!localStorage.getItem("currentBeerIndex")) {
    localStorage.setItem("currentBeerIndex", 0);
  }

  getBeerInfo();
});

async function getBeerInfo() {
  try {
    const currentBeerIndex = parseInt(
      localStorage.getItem("currentBeerIndex"),
      10
    );
    const response = await fetch("https://api.punkapi.com/v2/beers/random");
    const data = await response.json();

    const beer = data[0];
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

    // Save the current beer index to local storage.
    localStorage.setItem("currentBeerIndex", currentBeerIndex);

    // Update navigation buttons' visibility.
    updateNavigationButtons(currentBeerIndex);
  } catch (error) {
    console.error("Error fetching beer information:", error);
  }
}

function showPreviousBeer() {
  let currentBeerIndex = parseInt(localStorage.getItem("currentBeerIndex"), 10);
  if (currentBeerIndex > 0) {
    currentBeerIndex--;
    localStorage.setItem("currentBeerIndex", currentBeerIndex);
    getBeerInfo();
  }
}

function showNextBeer() {
  let currentBeerIndex = parseInt(localStorage.getItem("currentBeerIndex"), 10);
  currentBeerIndex++;
  localStorage.setItem("currentBeerIndex", currentBeerIndex);
  getBeerInfo();
}

function updateNavigationButtons(currentBeerIndex) {
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  previousButton.disabled = currentBeerIndex === 0;
  nextButton.disabled = false; // Assuming there's always a "next" beer.
}
