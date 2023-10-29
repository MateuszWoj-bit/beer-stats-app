document.addEventListener("DOMContentLoaded", () => {
  const reloadButton = document.getElementById("reload-button");
  reloadButton.addEventListener("click", getBeerInfo);
  getBeerInfo();
});

async function getBeerInfo() {
  try {
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
  } catch (error) {
    console.error("Error fetching beer information:", error);
  }
}
