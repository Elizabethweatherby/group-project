
//    Use a CSS framework other than Bootstrap.   ///we are using tailwind and bootstrap

//    Be deployed to GitHub Pages.

//    Be interactive (i.e: accept and respond to user input).

//    Use at least two server-side APIs.  /// we have one

//    Does not use alerts, confirms, or prompts (use modals).  //// js has alerts for. To use modals we need to make the alerts into text of what the user cant do.

//    Use client-side storage to store persistent data. 

//    Be responsive.

//    Have a polished UI. 

//    Have a clean repository that meets quality coding standards (file structure, naming conventions, 
//    follows best practices for class/id-naming conventions, indentation, quality comments, etc.).

//    Have a quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

// Function to fetch cocktail details by name
function fetchCocktailDetails(cocktailName) {
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(cocktailName)}`;
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.drinks === null) {
        throw new Error('Cocktail not found.');
      }
      return data.drinks[0];
    });
}

// Function to search cocktails based on the entered alcohol
function searchCocktails(event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter an alcohol.');
    return;
  }
  const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(searchTerm)}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const cocktails = data.drinks;
      if (cocktails === null) {
        displayNoCocktailsFound();
        return;
      }
      const cocktailPromises = cocktails.map(cocktail => fetchCocktailDetails(cocktail.strDrink));
      Promise.all(cocktailPromises)
        .then(cocktailDetails => {
          displayCocktails(cocktailDetails);
        })
        .catch(error => {
          console.log(error);
          alert('An error occurred while fetching cocktail details.');
        });
    })
    .catch(error => {
      console.log(error);
      alert('An error occurred while fetching cocktails.');
    });
}

// Function to display "No cocktails found" message
function displayNoCocktailsFound() {
  const cocktailList = document.getElementById('cocktailList');
  cocktailList.innerHTML = '<p>No cocktails found.</p>';
}

// Function to display the retrieved cocktails
function displayCocktails(cocktails) {
  // The rest of your displayCocktails function remains unchanged
}

// Event listener for the search button click
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchCocktails);