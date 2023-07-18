const apiKey = "https://www.thecocktaildb.com/api/json/v2/9973533/"
const byName = "search.php?s=";
const byFirstLetter = "search.php?f=";
const byIngredient = 'filter.php?i=';
const glassesList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?g=list'
const categoryList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list';
const ingredientList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
const alcoholFilter = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?a=list';
const popularDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
const latestDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/latest.php';
const randomDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
let popularDrinkList = document.getElementById('popularDrinks');
let latestDrinkList = document.getElementById('latestDrinks');
let randomDrinkList = document.getElementById('randomDrinks');
// Event listener for the search button click
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchCocktails);

function searchCocktails(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const searchCriteria = `${apiKey}${byIngredient}${searchInput.value}`;
  fetch(searchCriteria)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
// this gets fetches the data from all 3 at the same time
Promise.all([
  fetch(popularDrinks).then(response => response.json()),
  fetch(latestDrinks).then(response => response.json()),
  fetch(randomDrinks).then(response => response.json())
])
  .then(([popularData, latestData, randomData]) => {
    // Display popular drinks
    let popularList = document.getElementById('popularDrinks');
    for (let i = 0; i < 10; i++) {
      let drinkList = document.createElement('li');
      drinkList.textContent = popularData.drinks[i].strDrink;
      popularList.appendChild(drinkList);
    }

    // Display latest drinks
    let latestList = document.getElementById('latestDrinks');
    //uses for.. of loop to iterate over data and assign it to drink variable on each iteration
    for (let drink of latestData.drinks) {
      let drinkList = document.createElement('li');
      drinkList.textContent = drink.strDrink;
      latestList.appendChild(drinkList);
    }

    // Display random drinks
    let randomList = document.getElementById('randomDrinks');
    for (let drink of randomData.drinks) {
      let drinkList = document.createElement('li');
      drinkList.textContent = drink.strDrink;
      randomList.appendChild(drinkList);
    }
  })
  .catch(error => {
    console.error(error);
  });






