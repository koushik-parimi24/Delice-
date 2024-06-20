const searchForm = document.querySelector('form.d-flex');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
const contentSection = document.querySelector('.content-section');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hideContent();
    searchRecipes();
});

function hideContent() {
    contentSection.style.display = 'none';
}

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=b8fbab6c&app_key=547e34439618bcfb8598685fc231fe89&from=0&to=10`);
    const data = await response.json();
    displayRecipes(data.hits);
}

function displayRecipes(recipes) {
    let html = '';
    recipes.forEach((recipe) => {
        html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
    });
    resultsList.innerHTML = html;
}
