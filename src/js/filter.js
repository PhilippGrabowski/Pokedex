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

function loadSearchedPokemon(content, search) {
    content.innerHTML = '';
    renderSearchedPokemon(search);
    content.innerHTML += addLoadAllPokemonButtonTemplate();
    document.getElementById('loadListBtn').classList.add('d-none');
}

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


function addToFavorites() {
    switchStar('unlikeStar', 'likeStar');
    favoritPokemon.push(currentPokemon);
    safeFavorites();
    catchPokemonAnimation();
}

function catchPokemonAnimation() {
    displayPokeball('pokemon-img', 'pokeball-container');
    createPokeballContainer();
}

function createPokeballContainer() {
    let container = document.getElementById('pokeball-container');
    container.innerHTML = '';
    container.innerHTML += addPokeballTemplate();
}

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