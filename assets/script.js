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
  function searchCocktails() {
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
    const cocktailList = document.getElementById('cocktailList');
    cocktailList.innerHTML = '';

    cocktails.forEach(cocktail => {
      const cocktailItem = document.createElement('div');
      cocktailItem.classList.add('mb-4', 'p-4', 'bg-gray-100', 'rounded');

      const cocktailName = document.createElement('h3');
      cocktailName.classList.add('text-lg', 'font-bold', 'mb-2');
      cocktailName.textContent = cocktail.strDrink;

      const ingredientsTitle = document.createElement('p');
      ingredientsTitle.classList.add('font-bold', 'mb-1');
      ingredientsTitle.textContent = 'Ingredients:';

      const ingredientsList = document.createElement('ul');
      cocktailItem.classList.add('mb-2');
      for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = `${measure ? measure + ' of ' : ''}${ingredient}`;
          ingredientsList.appendChild(ingredientItem);
        }
      }

      const cocktailRating = document.createElement('select');
      cocktailRating.classList.add('mb-2');
      cocktailRating.innerHTML = `
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      `;

      const feedbackInput = document.createElement('textarea');
      feedbackInput.classList.add('w-full', 'h-20', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded');
      feedbackInput.placeholder = 'What did you like or dislike about this cocktail?';

      cocktailItem.appendChild(cocktailName);
      cocktailItem.appendChild(ingredientsTitle);
      cocktailItem.appendChild(ingredientsList);
      cocktailItem.appendChild(cocktailRating);
      cocktailItem.appendChild(feedbackInput);
      cocktailList.appendChild(cocktailItem);
    });
  }

  // Event listener for the search button click
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', searchCocktails);
