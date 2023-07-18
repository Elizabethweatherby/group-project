const apiKey = "https://www.thecocktaildb.com/api/json/v2/9973533/"
const byName = "search.php?s=";
const byFirstLetter = "search.php?f=";
const byIngredient = 'filter.php?i';
const searchInput = document.getElementById('searchInput');
const glassesList = 'http://www.thecocktaildb.com/api/json/v2/9973533/list.php?g=list'
const categoryList = 'http://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list';
const ingredientList = 'http://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
const alcoholFilter = 'http://www.thecocktaildb.com/api/json/v2/9973533/list.php?a=list';
const popularDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
const latestDrinks = 'https//www.thecocktaildb.com/api/json/v2/9973533/latest.php';
const randomDrinks = 'https//www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
let popularDrinkList = document.getElementById('popularDrinks');
// Event listener for the search button click
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchCocktails);

// List most latest cocktails (only available to $2+ Patreon supporters)
// www.thecocktaildb.com/api/json/v1/1/latest.php

// List Popular cocktails (only available to $2+ Patreon supporters)
// www.thecocktaildb.com/api/json/v1/1/popular.php
// Lookup a selection of 10 random cocktails (only available to $2+ Patreon supporters)
// www.thecocktaildb.com/api/json/v1/1/randomselection.php

const searchCriteria = `${apiKey}${byIngredient}${searchInput.value}`;
function searchCocktails(event) {
  event.preventDefault();
  fetch(searchCriteria)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

fetch(popularDrinks)
.then(response => response.json())
.then(data => {
  console.log(data);
  data.drinks.forEach(drink => {
    let drinkList = document.createElement('li');
    drinkList.textContent = drink.strDrink;
    popularDrinkList.appendChild(drinkList);
  });
})
.catch(error => {
  console.error(error);
});

