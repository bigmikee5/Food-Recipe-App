const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "c73d53c1";
const APP_KEY = "4a59d181efdbf8e38d32cd9c74b1ba58";
const loader = document.querySelector("#preloader");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  showPreloader(); // show the preloader
  fetchAPI();
});

// Fetch Data
async function fetchAPI() {
  const BASE_URL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(BASE_URL);
  const data = await response.json();

  //   updating the data in the UI
  if (data.hits.length > 0) {
    showRecipe(data.hits);
  } else {
    showNoResultsMessage();
  }
  hidePreloader(); // Hide the preloader
  console.log(data);
}

function showRecipe(results) {
  container.classList.remove("initial");
  let recipes = "";
  results.map((result) => {
    recipes += ` 
    <div class="item">
    <img src="${result.recipe.image}" />
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <a href="${
        result.recipe.url
      }" target="_blank" class="view-button">View Recipe</a>
    </div>
    <p class="item-data">Calories: <span>${result.recipe.calories.toFixed(
      2
    )}</span></p>
    <p class="item-data">Diet Label: <span>${
      result.recipe.dietLabels.length > 0
        ? result.recipe.dietLabels
        : "No Data Found"
    }</span></p>
    <p class="item-data">Health Label: <span>${
      result.recipe.healthLabels
    }</span></p>
  </div>
  
  `;
  });
  searchResultDiv.innerHTML = recipes;
}

// message for no results found
function showNoResultsMessage() {
  container.classList.add("initial");
  searchResultDiv.innerHTML = "<p>No recipe found</p>";
}

// Adding Preloader
function showPreloader() {
  loader.style.display = "block";
}

function hidePreloader() {
  loader.style.display = "none";
}
