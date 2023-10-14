/*------------------------------------------------- Load and Save Favorite Pokemons -------------------------------------------------*/

/**
 * Converts the "favoritPokemon" array into a string using JSON.stringify() and stores it in the browser's localStorage with the key 'favorites'
 */
function safeFavorites() {
    let favoritesAsText = JSON.stringify(favoritPokemon);
    localStorage.setItem('favorites', favoritesAsText);
}

/**
 * Loads favorite pokemons by retrieving and parsing a JSON string from the "favorites" key in the browser's local storage
 */
function loadFavorites() {
    let favoritesAsText = localStorage.getItem('favorites');
    if (favoritesAsText) {
        favoritPokemon = JSON.parse(favoritesAsText);
    }
}


/*----------------------------------------------- Load and Save Pokemons and Types -----------------------------------------------*/

/**
 * Loads all Pokemon and their types
 */
function loadData() {
    loadAllPokemon();
    loadAllPokemonTypes();
}

/**
 * Loads all Pokemon data using the "loadPokemon" function and stores them in an array called "pokemons"
 * then renders the first 20 Pokemon cards using the "renderPokemonCard" function when the loop reaches 21
 */
async function loadAllPokemon() {
    pokemons = [];
    for (let i = 1; i < 1018; i++) {
        await loadPokemon(i);
        if (i == 21 && pokemons.length > 0) {
            renderPokemonCards(1);
        }
    };
}

/**
 * Asynchronous function that fetches data from the PokeAPI and adds the retrieved Pokemon data to an array called `pokemons`
 * @param x - Represents the ID of the Pokemon that you want to load. It is used to construct the URL for the API request to retrieve the Pokemon data
 */
async function loadPokemon(x) {
    let url = `https://pokeapi.co/api/v2/pokemon/${x}`;
    try {
        let pokemon = await fetch(url).then(res => res.json());
        pokemons.push(pokemon);
    } catch (e) {
        console.log('Fehler aufgetreten');
    }
}

/**
 * The function `loadAllPokemonTypes` loads all the types of Pokemon from the PokeAPI.
 */
async function loadAllPokemonTypes() {
    let url = `https://pokeapi.co/api/v2/type`;
    await loadTypes(url);
}

/**
 * Asynchronous function that fetches data from a specified URL, converts the response to JSON
 * then calls another function `loadPokemonTyp` with the fetched data
 * @param url - URL of the API endpoint from which we want to fetch the data
 */
async function loadTypes(url) {
    try {
        let types = await fetch(url).then(res => res.json());
        loadPokemonTyp(types);
    } catch (e) {
        console.log('Fehler aufgetreten');
    }
}

/**
 * Adds each type name from the "results" array to the "pokemonTypes" array
 * @param types - Object with a property called `results`: an array of objects, where each object contains the name of a pokemon type
 */
function loadPokemonTyp(types) {
    for (let i = 0; i < types['results'].length; i++) {
        let type = types['results'][i]['name'];
        pokemonTypes.push(type);
    }
}


/*----------------------------------------------- Render Pokemon Cards -----------------------------------------------*/

/**
 * Render Pokemon cards on a webpage and also displaying the "Load More" button
 * @param x - Starting index of the pokemons array
 */
function renderPokemonCards(x) {
    if (x == 1) {
        let content = document.getElementById('content');
        content.innerHTML = '';
    }
    renderPokemonCard(x);
    displayLoadMorePokemonButton(x);
}

/**
 * Checks if the last loaded Pokemon is less than 1018 and if so, it calls the "renderPokemonCards" function with the last loaded Pokemon as a parameter
 */
function renderMorePokemonCards() {
    if (lastLoadedPokemon < 1018) {
        renderPokemonCards(lastLoadedPokemon + 1);
    }
}

/**
 * Ccreates and fills Pokemon cards for a range of Pokemon (20)
 * @param x - Starting index of the pokemons array
 */
function renderPokemonCard(x) {
    for (let i = x; i < x+20; i++) {
        currentPokemon = pokemons[i-1];
        createPokemonCard(i);
        fillPokemonCard(i);
        lastLoadedPokemon = i;
        if (lastLoadedPokemon === 1017) {
            break;
        }
    }
}

/**
 * If last loaded pokemon reaches 1017 it hides the "load more pokemon" button, if it doesn't it will display the button
 */
function displayLoadMorePokemonButton() {
    if (lastLoadedPokemon === 1017) {
        document.getElementById('loadListBtn').classList.add('d-none');
    } else {
        document.getElementById('loadListBtn').classList.remove('d-none');
    }
}

/**
 * Creates a Pokemon card and appends it to the content element on the webpage
 * @param x - index of the pokemons array
 */
function createPokemonCard(x) {
    let content = document.getElementById('content');
    content.innerHTML += addTemplatePokemonCard(x);
    createTypesContainer(x);
}

/**
 * Create a container for displaying the types of a Pokemon
 * @param x - index of the pokemons array. It is used to dynamically generate the ID of the container element by appending it to the string "types"
 */
function createTypesContainer(x) {
    let container = document.getElementById(`types${x}`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addType(x, i);
    }
}

/**
 * The function "fillPokemonCard" is used to fill a Pokemon card with information such as name, image, ID, and types
 * @param x - index of the pokemons array
 */
function fillPokemonCard(x) {
    fillPokemonName(x);
    fillPokemonImg(x);
    fillPokemonId(x);
    fillPokemonTypes(x);
}

/**
 * Update the pokemon card with the name of the current Pokemon, after converting the first character to uppercase
 * @param x - The parameter `x` is used to specify the index of the card element that we want to update
 */
function fillPokemonName(x) {
    let name = currentPokemon['name'];
    document.querySelector(`#card${x} .pokemon-name`).innerHTML = firstCharToUppercase(name);
}

/**
 * Takes a string as input and returns the same string with the first character converted to uppercase
 * @param string - The parameter "string" is a string value that represents the input string
 * @returns the input string with the first character converted to uppercase
 */
function firstCharToUppercase(string) {
    let firstChar = (string.charAt(0)).toUpperCase();
    return firstChar + string.slice(1);
}

/**
 * Used to fill the image of a Pokemon in the specific pokemon card element
 * @param x - The parameter `x` is used to specify the index of the card image that we want to update
 */
function fillPokemonImg(x) {
    let img = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    if (img) {
        document.querySelector(`#card${x} .pokemon-img`).src = img;
    } else {
        document.querySelector(`#card${x} .pokemon-img`).classList.add('d-none');
    }
}

/**
 * Updates the pokemon card by displaying the Pokemon's ID in a specific format
 * @param x - The parameter `x` is used to specify the index of the card element that we want to update
 */
function fillPokemonId(x) {
    let id = +currentPokemon['id'] / 100;
    let newId = id.toFixed(2).replace('.', '');
    document.querySelector(`#card${x} .pokemon-id`).innerHTML = `#${newId}`;
}

/**
 * Used to fill in the types of a Pokemon and update the corresponding HTML elements
 * @param x - The parameter `x` is used to specify the index of the card element where to update the pokemon types
 */
function fillPokemonTypes(x) {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let type = currentPokemon['types'][i]['type']['name'];
        document.querySelector(`#type${x}${i}`).innerHTML = firstCharToUppercase(type);
        if (i == 0) {
            document.getElementById(`card${x}`).classList.add(type);
            changeToMoreVisibleColor(type, x);
        }
        fillIcons(x, type, i);
    }
}

/**
 * The function `fillIcons` adds the type class and updates the image source of an icon element based on the provided type
 * @param x - index of the pokemons array or ""
 * @param type - Type of pokemon
 * @param i - index of the icon element in the icon container. It is used to uniquely identify each icon element in the container
 */
function fillIcons(x, type, i) {
    if (x == "") {
        document.querySelector(`#icon-container #icon${i}`).classList.add(type);
        document.querySelector(`#icon-container #icon${i} img`).src = `src/img/icons/${type}.svg`;
    }
}

/**
 * Changes the color of an element based on its type, making it more visible if the type is 'ghost', 'dark', 'fighting', or 'psychic'
 * @param type - Type of pokemon
 * @param x - The parameter "x" is referring to an element that needs to have its color changed
 */
function changeToMoreVisibleColor(type, x) {
    if (type == 'ghost' || type == 'dark' || type == 'fighting' || type == 'psychic') {
        changeIdAndTypColor(x);
    } else {
        changeBackToIdAndTypColor(x);
    }
    changeNameColor(type, x);
}

/**
 * The function changes the color of the ID and type elements of a specific card
 * @param x - The parameter `x` is a number that represents the index of a card element
 */
function changeIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.add('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.add('lightTyp');
    })
}

/**
 * The function changes the background color of the ID and type elements of a specific card back to their original color
 * @param x - The parameter `x` is used to specify the card number
 */
function changeBackToIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.remove('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.remove('lightTyp');
    })
}

/**
 * The function changes the color of a Pokemon's name on a card based on its type
 * @param type - The type parameter is a string that represents the type of the pokemon
 * @param x - The parameter `x` represents the index or number of the card element
 */
function changeNameColor(type, x) {
    if (type == 'electric') {
        document.querySelector(`#card${x} .pokemon-name`).classList.add('darkName');
    } else {
        document.querySelector(`#card${x} .pokemon-name`).classList.remove('darkName');
    }
}

/**
 * The function stopPropagation stops the event from bubbling up the event chain
 * @param event - object that represents the event
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * Displays an advice to rotate the screen in the portrait mode
 */
window.addEventListener("resize", function () {
    if(window.innerHeight < window.innerWidth && window.innerWidth < 1000){
        document.getElementById('rotate-device').style.display = 'flex';
    } else {
        document.getElementById('rotate-device').style.display = 'none';
    }
});