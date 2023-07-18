
//note: this is all things that the api allows us to do. By putting them in a const var then 
// we can access them whenever. Also it allows for easy switching between search criteria
////////////////////////////////////////////////////////////////////////////////////
//this is the main url criteria
const apiKey = "https://www.thecocktaildb.com/api/json/v2/9973533/"
const byName = "search.php?s=";
const byFirstLetter = "search.php?f=";
const byIngredient = 'filter.php?i=';
////////////////////////////////////////////////////////////////////////////////////
//this is the lists used to determine what drinks we are workign with
const glassesList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?g=list'
const categoryList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list';
const ingredientList = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list';
const alcoholFilter = 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?a=list';
const popularDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/popular.php';
const latestDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/latest.php';
const randomDrinks = 'https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php';
////////////////////////////////////////////////////////////////////////////////////
//gets the dropdown menu un-ordered list
let popularDrinkList = document.getElementById('popularDrinks');
let latestDrinkList = document.getElementById('latestDrinks');
let randomDrinkList = document.getElementById('randomDrinks');
////////////////////////////////////////////////////////////////////////////////////
//Define an array of image URLs
const images = [
  './assets/images/carosel/delish-mai-tai.jpg',
  './assets/images/carosel/cocktail-cherry.jpg',
  './assets/images/carosel/cocktail.jpg',
  './assets/images/carosel/blue.jpg',
  './assets/images/carosel/pexels.jpg'
];



const backgroundImage = document.querySelector(".background-image");
const nextButtonRight = document.getElementById("next-button-right");

let currentIndex = 0;

function changeBackgroundImage() {
  backgroundImage.style.backgroundImage = `url(${images[currentIndex]})`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  changeBackgroundImage();
}

nextButtonRight.addEventListener("click", nextImage);


// Call the function initially
changeBackgroundImage();

// Event listener for the search button click
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchCocktails);

//User search by ingredient
function searchCocktails(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  //this is the search criteria it has multiple variables and can be used to swicth criteria
  const searchCriteria = `${apiKey}${byName}${searchInput.value}`;
  fetch(searchCriteria)
    //returns json format
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.drinks.forEach(drink => {
        const cardDetail = createRandomCard(drink);
        document.getElementById('bottom-section').appendChild(cardDetail);
      })})
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
    //note: this popular data has a lot of drinks  so we use for loop to only get ten
    for (let i = 0; i < 10; i++) {
      //crates list element
      let drinkList = document.createElement('li');
      //writes the value of the array
      drinkList.textContent = popularData.drinks[i].strDrink;
      //adds to the list
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
  //displays errors to console
  .catch(error => {
    console.error(error);
  });


function createRandomCard(drink){
//   // Create the div element with class "divider" and text content
// const divider = document.createElement('div');
// divider.className = 'divider';
// divider.textContent = 'Some recipes';

// Create the div element with id "cocktailList" and classes "md:flex", "flex-wrap", "md:flex-row", "sm:flex-col", "justify-between"
const cocktailList = document.createElement('div');
cocktailList.id = 'cocktailList';
cocktailList.className = 'md:flex flex-wrap md:flex-row sm:flex-col justify-between';

// Create the div element with classes "drink-card", "mb-4", "p-4", "bg-gray-100", "rounded", "flex", "justify-between"
const drinkCard = document.createElement('div');
drinkCard.className = 'drink-card mb-4 p-4 bg-gray-100 rounded flex justify-between';

// Create the div element with class "drink-info"
const drinkInfo = document.createElement('div');
drinkInfo.className = 'drink-info';

// Create the h3 element with classes "text-lg", "font-bold", "mb-2" and set the text content
const drinkTitle = document.createElement('h3');
drinkTitle.className = 'text-lg text-center font-bold mb-2';
drinkTitle.textContent = drink.strDrink;

// Create the p element with classes "font-bold", "mb-1" and set the text content
const ingredientsTitle = document.createElement('p');
ingredientsTitle.className = 'font-bold mb-1';
ingredientsTitle.textContent = 'Ingredients:';

// Create the ul element and append li elements with ingredient text content
const ingredientsList = document.createElement('ul');
ingredientsList.className = 'pl-6 list-disc';
// this iterates over the drink data and gets the value of the ingeredients if it exists
for (let i = 1; i <= 15; i++) {
  const ingredient = drink['strIngredient' + i];
  if (ingredient) {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientsList.appendChild(listItem);
  }
}

const instructionsTitle = document.createElement('p');
  instructionsTitle.className = 'font-bold mb-1 font-sans text-md';
  instructionsTitle.textContent = 'Instructions:';

  const instructionsText = document.createElement('p');
  instructionsText.textContent = drink.strInstructions;

// Create the div element with class "drink-image"
const drinkImage = document.createElement('div');
drinkImage.className = 'drink-image';

// Create the img element with src, alt, and class attributes
const imgElement = document.createElement('img');
imgElement.src = drink.strDrinkThumb;
imgElement.alt = drink.strDrink;
imgElement.className = 'w-full h-auto';

// Append the created elements to their respective parents
drinkInfo.appendChild(drinkTitle);
drinkInfo.appendChild(ingredientsTitle);
drinkInfo.appendChild(ingredientsList);
drinkInfo.appendChild(instructionsTitle);
drinkInfo.appendChild(instructionsText);
drinkCard.appendChild(drinkInfo);
drinkCard.appendChild(drinkImage);
drinkImage.appendChild(imgElement);
// cocktailList.appendChild(drinkCard);

// Append the elements to the document body
// document.body.appendChild(divider);
// document.getElementById('bottom-section').appendChild(cocktailList);
return drinkCard;
}
// createRandomCard();



