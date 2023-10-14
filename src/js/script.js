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

function renderPokemonCards(x) {
    if (x == 1) {
        let content = document.getElementById('content');
        content.innerHTML = '';
    }
    renderPokemonCard(x);
    displayLoadMorePokemonButton(x);
    lastLoadedPokemon = x + 20;
}

function renderMorePokemonCards() {
    if (lastLoadedPokemon < 1018) {
        renderPokemonCards(lastLoadedPokemon);
    }
}

function renderPokemonCard(x) {
    for (let i = x; i < x+20; i++) {
        currentPokemon = pokemons[i-1];
        createPokemonCard(i);
        fillPokemonCard(i);
        if (x == 1017) {
            break;
        }
    }
}

function displayLoadMorePokemonButton(x) {
    if (x == 1017) {
        document.getElementById('loadListBtn').classList.add('d-none');
    } else {
        document.getElementById('loadListBtn').classList.remove('d-none');
    }
}

function createPokemonCard(x) {
    let content = document.getElementById('content');
    content.innerHTML += addTemplatePokemonCard(x);
    createTypesContainer(x);
}

function createTypesContainer(x) {
    let container = document.getElementById(`types${x}`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addType(x, i);
    }
}

function fillPokemonCard(x) {
    fillPokemonName(x);
    fillPokemonImg(x);
    fillPokemonId(x);
    fillPokemonTypes(x);
}

function fillPokemonName(x) {
    let name = currentPokemon['name'];
    document.querySelector(`#card${x} .pokemon-name`).innerHTML = firstCharToUppercase(name);
}

function firstCharToUppercase(word) {
    let firstChar = (word.charAt(0)).toUpperCase();
    return firstChar + word.slice(1);
}

function fillPokemonImg(x) {
    let img = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    if (img) {
        document.querySelector(`#card${x} .pokemon-img`).src = img;
    } else {
        document.querySelector(`#card${x} .pokemon-img`).classList.add('d-none');
    }
}

function fillPokemonId(x) {
    let id = +currentPokemon['id'] / 100;
    let newId = id.toFixed(2).replace('.', '');
    document.querySelector(`#card${x} .pokemon-id`).innerHTML = `#${newId}`;
}

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

function fillIcons(x, type, i) {
    if (x == "") {
        document.querySelector(`#icon-container #icon${i}`).classList.add(type);
        document.querySelector(`#icon-container #icon${i} img`).src = `src/img/icons/${type}.svg`;
    }
}

function changeToMoreVisibleColor(type, x) {
    if (type == 'ghost' || type == 'dark' || type == 'fighting' || type == 'psychic') {
        changeIdAndTypColor(x);
    } else {
        changeBackToIdAndTypColor(x);
    }
    changeNameColor(type, x);
}

function changeIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.add('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.add('lightTyp');
    })
}

function changeBackToIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.remove('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.remove('lightTyp');
    })
}

function changeNameColor(type, x) {
    if (type == 'electric') {
        document.querySelector(`#card${x} .pokemon-name`).classList.add('darkName');
    } else {
        document.querySelector(`#card${x} .pokemon-name`).classList.remove('darkName');
    }
}

function stopPropagation(event) {
    event.stopPropagation();
}

window.addEventListener("resize", function () {
    if(window.innerHeight < window.innerWidth && window.innerWidth < 1000){
        document.getElementById('rotate-device').style.display = 'flex';
    } else {
        document.getElementById('rotate-device').style.display = 'none';
    }
});