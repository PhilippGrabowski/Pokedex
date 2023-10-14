/*---------------------------------------------Filter Pokemon Functions---------------------------------------*/

/**
 * The function searches for Pokemon based on user input and displays the results on the webpage
 */
function searchPokemon() {
    let content = document.getElementById('content');
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    if (search.length == 0) {
        renderPokemonCards(1);
    } else if (search.length > 2 && isNaN(search)) {
        loadSearchedPokemon(content, search)
    } else if (isNaN(search) == false) {
        loadSearchedPokemon(content, search)
    }
}

/**
 * TLoads and renders searched Pokemon based on a given search term, and adds a button to load all Pokemon
 * @param content - HTML element where the searched Pokemon will be displayed
 * @param search - string that represents the search term or keyword used to search for a specific Pokemon
 */
function loadSearchedPokemon(content, search) {
    content.innerHTML = '';
    renderSearchedPokemon(search);
    content.innerHTML += addLoadAllPokemonButtonTemplate();
    document.getElementById('loadListBtn').classList.add('d-none');
}

/**
 * Searches for a specific Pokemon based on a given search term (name or id)
 * and renders the Pokemon card if found, otherwise it renders the Pokemon card of a specific type
 * @param search - string that represents the search term or keyword used to search for a specific Pokemon
 */
function renderSearchedPokemon(search) {
    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i]['name'];
        let id = pokemons[i]['id'];
        if (name.toLowerCase().includes(search) || id == search) {
            currentPokemon = pokemons[i];
            createPokemonCard(i+1);
            fillPokemonCard(i+1);
        } else {
            renderPokemonCardOfTyp(search, i);
        }
    }
}

/**
 * Filters and renders a Pokemon card based on the given type
 * @param types - type of Pokemon you want to filter for
 * @param x - index of the pokemon in the `pokemons` array
 */
function renderPokemonCardOfTyp(types, x) {
    for (let j = 0; j < pokemons[x]['types'].length; j++) {
        let typ = pokemons[x]['types'][j]['type']['name'];
        if (types == typ) {
            currentPokemon = pokemons[x];
            createPokemonCard(x+1);
            fillPokemonCard(x+1);
        }
    }
}

/**
 * Sorts and renders Pokemon cards based on a given type
 * @param id - id of the HTML element that contains the sort type
 */
function sortType(id) {
    let sortTyp = document.getElementById(id).innerHTML;
    sortTyp = sortTyp.toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        renderPokemonCardOfTyp(sortTyp, i);
    }
    content.innerHTML += addLoadAllPokemonButtonTemplate();
    document.getElementById('loadListBtn').classList.add('d-none');
}

/**
 * Renders the pokemon with the id of the input value and the following pokemons in the array (max. next 19 pokemons)
 */
function goToPokemon() {
    let x = document.getElementById('load').value;
    if (x !== '') {
        x = +x;
        let content = document.getElementById('content');
        content.innerHTML = '';
        renderPokemonCards(x);
        document.getElementById('load').value = '';
    }
}


/*---------------------------------------------Favorite Pokemon Functions---------------------------------------*/

/**
 * Adds the current Pokemon to the favorites list, updates the star icons, saves the favorites list, and plays a catch animation
 */
function addToFavorites() {
    switchStar('unlikeStar', 'likeStar');
    favoritPokemon.push(currentPokemon);
    safeFavorites();
    catchPokemonAnimation();
}

/**
 * Displays a pokeball image with it's animation
 */
function catchPokemonAnimation() {
    displayPokeball('pokemon-img', 'pokeball-container');
    createPokeballContainer();
}

/**
 * Creates a container for displaying pokeballs on a webpage.
 */
function createPokeballContainer() {
    let container = document.getElementById('pokeball-container');
    container.innerHTML = '';
    container.innerHTML += addPokeballTemplate();
}

/**
 * Removes a Pokemon from the favorites list by switching the star icon, finding the Pokemon's ID, and then removing it from the favoritPokemon array.
 */
function removeFromFavorites() {
    switchStar('likeStar', 'unlikeStar');
    let id = getId(`#card .pokemon-id`);
    for (let i = 0; i < favoritPokemon.length; i++) {
        if (id == favoritPokemon[i]['id']) {
            favoritPokemon.splice(i, 1);
        }
    }
    safeFavorites();
}

/**
 * Renders a list of favorite Pokemon on a webpage.
 */
function renderFavorites() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    if (favoritPokemon.length == 0) {
        content.innerHTML = addNoFavoritesTemplate();
    }
    for (let i = 0; i < favoritPokemon.length; i++) {
        currentPokemon = favoritPokemon[i];
        createPokemonCard(i+1);
        fillPokemonCard(i+1);
    }
    content.innerHTML += addLoadAllPokemonButtonTemplate();
    document.getElementById('loadListBtn').classList.add('d-none');
}