let pokemons = [];
let pokemonTypes = [];
let favoritPokemon = [];
let currentPokemon;
let lastLoadedPokemon;
let firstEvolutionOfThree = [1, 4, 7, 10, 13, 16, 29, 32, 43, 60, 63, 66, 69, 74, 92, 147];
let secondEvolutionOfThree = [2, 5, 8, 11, 14, 17, 30, 33, 44, 61, 64, 67, 70, 75, 93, 148];
let thirdEvolutionOfThree = [3, 6, 9, 12, 15, 18, 31, 34, 45, 62, 65, 68, 71, 76, 94, 149];
let firstEvolutionOfTwo = [19, 21, 23, 25, 27, 35, 37, 39, 41, 46, 48, 50, 52, 54, 56, 58, 72, 77, 79, 81, 84, 86, 88, 90, 96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 138, 140];
let secondEvolutionOfTwo = [20, 22, 24, 26, 28, 36, 38, 40, 42, 47, 49, 51, 53, 55, 57, 59, 73, 78, 80, 82, 85, 87, 89, 91, 97, 99, 101, 103, 105, 110, 112, 117, 119, 121, 130, 134, 135, 136, 139, 141];
let NoEvolution = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 131, 132, 137, 142, 143, 144, 145, 146, 150, 151];
loadFavorites();

function safeFavorites() {
    let favoritesAsText = JSON.stringify(favoritPokemon);
    localStorage.setItem('favorites', favoritesAsText);
}

function loadFavorites() {
    let favoritesAsText = localStorage.getItem('favorites');
    if (favoritesAsText) {
        favoritPokemon = JSON.parse(favoritesAsText);
    }
}

function loadData() {
    loadAllPokemon();
    loadPokemonTypes();
}

async function loadAllPokemon() {
    pokemons = [];
    for (let i = 1; i < 1011; i++) {
        let pokemon = await loadPokemon(i);
        pokemons.push(pokemon);
        if (i == 21) {
            renderPokemonCard(1);
        }
    };
}

async function loadPokemon(x) {
    let url = `https://pokeapi.co/api/v2/pokemon/${x}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
}

async function loadPokemonTypes() {
    let url = `https://pokeapi.co/api/v2/type`;
    let response = await fetch(url);
    let types = await response.json();
    for (let i = 0; i < 20; i++) {
        let type = types['results'][i]['name'];
        pokemonTypes.push(type);
    }
}

function renderPokemonCard(x) {
    if (x == 1) {
        let content = document.getElementById('content');
        content.innerHTML = '';
    }
    for (let i = x; i < x+20; i++) {
        currentPokemon = pokemons[i-1];
        createPokemonCard(i);
        fillPokemonCard(i);
        if (x == 1010) {
            break;
        }
    }
    if (x == 1010) {
        document.getElementById('loadListBtn').classList.add('d-none');
    } else {
        document.getElementById('loadListBtn').classList.remove('d-none');
    }
    lastLoadedPokemon = x + 20;
}

function renderMorePokemonCards() {
    if (lastLoadedPokemon < 1031) {
        renderPokemonCard(lastLoadedPokemon);
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

function fillPokemonImg(x) {
    document.querySelector(`#card${x} .pokemon-img`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
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

function changeToMoreVisibleColor(type, x) {
    if (type == 'ghost' || type == 'dark' || type == 'fighting' || type == 'psychic') {
        changeIdAndTypColor(x);
    } else {
        changeBackToIdAndTypColor(x);
    }
    changeNameColor(type, x);
}

function changeBackToIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.remove('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.remove('lightTyp');
    })
}

function changeIdAndTypColor(x) {
    document.querySelector(`#card${x} .pokemon-id`).classList.add('lightId');
    document.querySelectorAll(`#card${x} .types span`).forEach(e => {
        e.classList.add('lightTyp');
    })
}

function changeNameColor(type, x) {
    if (type == 'electric') {
        document.querySelector(`#card${x} .pokemon-name`).classList.add('darkName');
    } else {
        document.querySelector(`#card${x} .pokemon-name`).classList.remove('darkName');
    }
}

function fillIcons(x, type, i) {
    if (x == "") {
        document.querySelector(`#icon-container #icon${i}`).classList.add(type);
        document.querySelector(`#icon-container #icon${i} img`).src = `src/img/icons/${type}.svg`;
    }
}

function seeDetails(element) {
    let x = getPokemonListNum(element);
    renderPokemonInfoCard(x);
    document.querySelector('.glossyWindow').classList.remove('d-none');
    document.getElementById('pokemon-info-card').classList.remove('d-none');
}

function renderPokemonInfoCard(x) {
    currentPokemon = pokemons[x-1];
    deleteTypClass();
    createDetailsContainer(x);
    fillPokemonInfoCardHeader();
    fillPokemonDetails(x);
    checkIfFavoritePokemon();
}

function deleteTypClass() {
    let infoCard = document.getElementById('card');
    for (let i = 0; i < pokemonTypes.length; i++) {
        let type = pokemonTypes[i];
        if (infoCard.classList.contains(type)) {
            infoCard.classList.remove(type);
        }
    }
}

function fillPokemonInfoCardHeader() {
    createTypesInfoContainer();
    displayPokeball('pokeball-container', 'pokemon-img');
    fillPokemonCard("");
    displayArrows();
}

function createTypesInfoContainer() {
    let container = document.getElementById(`types`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addInfoType(i);
    }
}

function displayArrows() {
    let lastPokemon = pokemons[pokemons.length - 1]['name'];
    let name = document.querySelector(`#card .pokemon-name`).innerHTML;
    displayLeftArrow(name);
    displayRightArrow(name, lastPokemon);
}

function displayLeftArrow(name) {
    if (name == 'Bulbasaur') {
        document.getElementById('arrow-left').classList.add('d-none');
    } else {
        document.getElementById('arrow-left').classList.remove('d-none');
    }
}

function displayRightArrow(name, lastPokemon) {
    if (name.toLowerCase() == lastPokemon) {
        document.getElementById('arrow-right').classList.add('d-none');
    } else {
        document.getElementById('arrow-right').classList.remove('d-none');
    }
}

function createDetailsContainer(x) {
    createAboutContainer();
    createStatsContainer();
    createEvolutionContainer(x);
    createMovesContainer();
}

function createAboutContainer() {
    let container = document.getElementById(`about-container`);
    container.innerHTML = addTemplateAboutContainer();
    CreateTemplateAbilities();
    createTypIcons();
}

function CreateTemplateAbilities() {
    let abilities = document.querySelector('.abilities');
    abilities.innerHTML = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        abilities.innerHTML += addAbilities(i);
    }
}

function createTypIcons() {
    let container = document.getElementById('icon-container');
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addTypIcons(i);
    }
}

function createStatsContainer() {
    let container = document.getElementById(`stats-container`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        container.innerHTML += addTemplateStatsContainer(i);
    }
}

function createEvolutionContainer(x) {
    let container = document.getElementById(`evolution-container`);
    checkEvolutionPossibilities(container, x)
}

function checkEvolutionPossibilities(container, x) {
    if (pokemonOfThreeEvolutions(x)) {
        container.innerHTML = addTemplateThreeEvolutionsContainer();
    } else if (pokemonOfTwoEvolutions(x)) {
        container.innerHTML = addTemplateTwoEvolutionsContainer();
    } else if (pokemonWithNoEvolution(x)) {
        container.innerHTML = addTemplateNoEvolutionsContainer();
    } else if (x == 133) {
        container.innerHTML = addTemplateeeveeEvolutionsContainer();
    } else {
        container.innerHTML = addUnknownEvolutionTemplate();
    }
}

function pokemonOfThreeEvolutions(x) {
    return firstEvolutionOfThree.includes(x) || secondEvolutionOfThree.includes(x) || thirdEvolutionOfThree.includes(x);
}

function pokemonOfTwoEvolutions(x) {
    return firstEvolutionOfTwo.includes(x) || secondEvolutionOfTwo.includes(x);
}

function pokemonWithNoEvolution(x) {
    return NoEvolution.includes(x);
}

function createMovesContainer() {
    let container = document.getElementById('moves-list');
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        container.innerHTML += addMove(i);
    }
}

function fillPokemonDetails(x) {
    fillAboutDetails();
    fillStatsDetails();
    fillEvolutionDetails(x);
    fillMovesDetails();
}

function fillAboutDetails() {
    let height = currentPokemon['height'] * 10;
    let weight = currentPokemon['weight'] / 10;
    document.getElementById('height').innerHTML = `${height} cm`;
    document.getElementById('weight').innerHTML = `${weight} kg`;
    fillAbilityDetails();
}

function fillAbilityDetails() {
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let ability = currentPokemon['abilities'][i]['ability']['name'];
        document.getElementById(`ability-${i}`).innerHTML = firstCharToUppercase(ability);
    }
}

function fillStatsDetails() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let statname = currentPokemon['stats'][i]['stat']['name'];
        document.querySelector(`#stat-name-${i}`).innerHTML = firstCharToUppercase(statname);
        document.querySelector(`#stat-value-${i}`).innerHTML = currentPokemon['stats'][i]['base_stat'];
        document.querySelector(`#progress-${i}`).setAttribute('value', `${currentPokemon['stats'][i]['base_stat']}`);
    }
}

function fillEvolutionDetails(x) {
    if (firstEvolutionOfThree.includes(x) || secondEvolutionOfThree.includes(x) || thirdEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsDetails(x);
    } else if (firstEvolutionOfTwo.includes(x) || secondEvolutionOfTwo.includes(x)) {
        fillTwoEvolutionsDetails(x);
    } else if (NoEvolution.includes(x)) {
        document.querySelector(`#evolution-img-1`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    } else if (x == 133) {
        filleeveeEvolutionDetails();
    }
}

function fillThreeEvolutionsDetails(x) {
    if (firstEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsImg(1, 2, 3, x-1, x, x+1);
    } else if (secondEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsImg(2, 1, 3, x-1, x-2, x);
    } else {
        fillThreeEvolutionsImg(3, 1, 2, x-1, x-3, x-2);
    }
}

function fillThreeEvolutionsImg(img1, img2, img3, evolution1, evolution2, evolution3) {
    document.querySelector(`#evolution-img-${img1}`).src = pokemons[evolution1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img2}`).src = pokemons[evolution2]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img3}`).src = pokemons[evolution3]['sprites']['other']['official-artwork']['front_default'];
}

function fillTwoEvolutionsDetails(x) {
    if (firstEvolutionOfTwo.includes(x)) {
        fillTwoEvolutionsImg(1, 2, x-1, x);
    } else {
        if (x == 136) {
            fillTwoEvolutionsImg(2, 1, x-1, x-4);
        } else if (x == 135) {
            fillTwoEvolutionsImg(2, 1, x-1, x-3);
        } else {
            fillTwoEvolutionsImg(2, 1, x-1, x-2);
        }
    }
}

function fillTwoEvolutionsImg(img1, img2, evolution1, evolution2) {
    document.querySelector(`#evolution-img-${img1}`).src = pokemons[evolution1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img2}`).src = pokemons[evolution2]['sprites']['other']['official-artwork']['front_default'];
}

function filleeveeEvolutionDetails() {
    for (let i = 1; i < 5; i++) {
        document.querySelector(`#evolution-img-${i}`).src = pokemons[131+i]['sprites']['other']['official-artwork']['front_default'];
    }
}

function fillMovesDetails() {
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        let move = currentPokemon['moves'][i]['move']['name'];
        document.getElementById(`move-${i}`).innerHTML = firstCharToUppercase(move);
    }
}

function checkIfFavoritePokemon() {
    let id = currentPokemon['id'];
    for (let i = 0; i < favoritPokemon.length; i++) {
        if (id == favoritPokemon[i]['id']) {
            switchStar('unlikeStar', 'likeStar');
            break;
        } else {
            switchStar('likeStar', 'unlikeStar');
        }
    }
}

function switchToDetail(element1, element2) {
    changeActiveLink(element1)
    changeDetailContainer(element2);
}

function changeActiveLink(element) {
    let detailLinks = document.querySelectorAll(`a`);
    detailLinks.forEach(link => {
        link.classList.remove('active');
    })
    document.querySelector(element).classList.add('active');
}

function changeDetailContainer(element) {
    let containers = document.querySelectorAll(`.details-container .container`);
    containers.forEach(container => {
        container.classList.add('d-none');
    })
    document.querySelector(element).classList.remove('d-none');
}

function clickThroughPokemonList(counter) {
    document.getElementById('card').classList.add('looper');
    setTimeout(function() {
        rotatePokemonInfoCard(counter);
    }, 500);
}

function rotatePokemonInfoCard(counter) {
    let id = getId(`#card .pokemon-id`);
    renderPokemonInfoCard(id + counter);
    switchToDetail(`.about`, `.about-container`);
    document.getElementById('card').classList.remove('looper');
}

function getId(element) {
    let id = document.querySelector(element).innerHTML;
    id = id.replace('#', '');
    let newId = +id; 
    return newId;
}

function closeDetails() {
    switchToDetail(`.about`, `.about-container`);
    document.querySelector('.glossyWindow').classList.add('d-none');
    document.querySelector('#pokemon-info-card').classList.add('d-none');
}

function firstCharToUppercase(word) {
    let firstChar = (word.charAt(0)).toUpperCase();
    return firstChar + word.slice(1);
}

function changeToShinyImg(id, element, img) {
    let x = getPokemonListNum(element);
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork'][img];
}

function changeToDefaultImg(id, element, img) {
    changeToShinyImg(id, element, img);
}

function stopPropagation(event) {
    event.stopPropagation();
}

function searchPokemon() {
    let content = document.getElementById('content');
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    if (search.length == 0) {
        renderPokemonCard(1);
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

function displayPokeball(img1, img2) {
    document.getElementById(img1).classList.add('d-none');
    document.getElementById(img2).classList.remove('d-none');
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

function switchStar(star1, star2) {
    document.getElementById(star1).classList.add('d-none');
    document.getElementById(star2).classList.remove('d-none');
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

function getPokemonListNum(element) {
    let idnum = getId(element);
    let x;
    for (let i = 0; i < pokemons.length; i++) {
        if (idnum == pokemons[i]['id']) {
            x = i + 1;
            break;
        }
    }
    return x;
}

function changeInputOption(element1, element2) {
    switchStar(element1, element2)
}

function goToPokemon() {
    let x = document.getElementById('load').value;
    x = +x;
    let content = document.getElementById('content');
    content.innerHTML = '';
    renderPokemonCard(x);
    document.getElementById('load').value = '';
}