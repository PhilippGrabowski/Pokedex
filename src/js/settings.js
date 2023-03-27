let pokemons = [];
let currentPokemon;
let firstEvolutionOfThree = [1, 4, 7, 10, 13, 16, 29, 32, 43, 60, 63, 66, 69, 74, 92, 147];
let secondEvolutionOfThree = [2, 5, 8, 11, 14, 17, 30, 33, 44, 61, 64, 67, 70, 75, 93, 148];
let thirdEvolutionOfThree = [3, 6, 9, 12, 15, 18, 31, 34, 45, 62, 65, 68, 71, 76, 94, 149];
let firstEvolutionOfTwo = [19, 21, 23, 25, 27, 35, 37, 39, 41, 46, 48, 50, 52, 54, 56, 58, 72, 77, 79, 81, 84, 86, 88, 90, 96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 138, 140];
let secondEvolutionOfTwo = [20, 22, 24, 26, 28, 36, 38, 40, 42, 47, 49, 51, 53, 55, 57, 59, 73, 78, 80, 82, 85, 87, 89, 91, 97, 99, 101, 103, 105, 110, 112, 117, 119, 121, 130, 134, 135, 136, 139, 141];
let NoEvolution = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 131, 132, 137, 142, 143, 144, 145, 146, 150, 151];
let eeveeEvolution = [133];
let animateInterval;

async function loadPokemons() {
    for (let i = 1; i < 152; i++) {
        currentPokemon = await loadPokemon(i);
        pokemons.push(currentPokemon);
        renderPokemonCard(i);
    }
}

function renderPokemonCard(x) {
    createPokemonCard(x);
    fillPokemonCard(x);
}

function createPokemonCard(x) {
    let content = document.getElementById('content');
    content.innerHTML += addTemplatePokemonCard(x);
    createTypesContainer(x);
}

function createTypesContainer(x) {
    let container = document.getElementById(`types-${x}`);
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addType(x, i);
    }
}

function fillPokemonCard(x) {
    fillPokemonInfo(x);
    fillPokemonId(x);
    fillPokemonTypes(x);
}

function fillPokemonInfo(x) {
    let name = currentPokemon['name'];
    document.querySelector(`#card-${x} .pokemon-name`).innerHTML = firstCharToUppercase(name);
    document.querySelector(`#card-${x} .pokemon-img`).src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function fillPokemonId(x) {
    let id = +currentPokemon['id'] / 100;
    let newId = id.toFixed(2).replace('.', '');
    document.querySelector(`#card-${x} .pokemon-id`).innerHTML = `#${newId}`;
}

function fillPokemonTypes(x) {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let type = currentPokemon['types'][i]['type']['name'];
        document.querySelector(`#type-${x}${i}`).innerHTML = firstCharToUppercase(type);
        if (i == 0) {
            addTypeBgrColor(type, x);
        }
    }
}

function seeDetails(x) {
    renderPokemonInfoCard(x);
    document.querySelector('.glossyWindow').classList.remove('d-none');
    document.getElementById('pokemon-info-card').classList.remove('d-none');
    document.querySelector(`#pokemon-details`).classList.remove('d-none');
}

function renderPokemonInfoCard(x) {
    fillPokemonInfoHeader(x);
    createDetailsContainer(x);
    fillPokemonDetails(x);
}

function fillPokemonInfoHeader(x) {
    createInfoTypesContainer(x);
    fillPokemonHeaderInfo(x)
}

function fillPokemonHeaderInfo(x) {
    let name = pokemons[x-1]['name'];
    document.querySelector(`#pokemon-info-card .pokemon-name`).innerHTML = firstCharToUppercase(name);
    document.querySelector(`#pokemon-info-card .pokemon-img`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    fillPokemonInfoId(x);
    fillPokemonInfoTypes(x);
    if (name == 'bulbasaur') {
        document.getElementById('arrow-left').classList.add('d-none');
    } else {
        document.getElementById('arrow-left').classList.remove('d-none');
    }
    if (name == 'mew') {
        document.getElementById('arrow-right').classList.add('d-none');
    } else {
        document.getElementById('arrow-right').classList.remove('d-none');
    }
}

function fillPokemonInfoId(x) {
    let id = +pokemons[x-1]['id'] / 100;
    let newId = id.toFixed(2).replace('.', '');
    document.querySelector(`#pokemon-info-card .pokemon-id`).innerHTML = `#${newId}`;
    document.querySelector(`#pokemon-info-card .pokemon-id`).setAttribute('id', `${x}`);
}

function fillPokemonInfoTypes(x) {
    for (let i = 0; i < pokemons[x-1]['types'].length; i++) {
        let type = pokemons[x-1]['types'][i]['type']['name'];
        document.querySelector(`#type-${i}`).innerHTML = firstCharToUppercase(type);
        if (i == 0) {
            addTypeBgrColor(type, x);
        }
    }
}

function createInfoTypesContainer(x) {
    let container = document.getElementById(`types`);
    container.innerHTML = '';
    for (let i = 0; i < pokemons[x-1]['types'].length; i++) {
        container.innerHTML += addInfoType(i);
    }
}

function createDetailsContainer(x) {
    createAboutContainer(x);
    createStatsContainer(x);
    createEvolutionContainer(x);
    createMovesContainer(x);
}

function createAboutContainer(x) {
    let container = document.getElementById(`about-container`);
    container.innerHTML = addTemplateAboutContainer();
    CreateTemplateAbilities(x);
}

function CreateTemplateAbilities(x) {
    let abilities = document.querySelector('.abilities');
    abilities.innerHTML = '';
    for (let i = 0; i < pokemons[x-1]['abilities'].length; i++) {
        abilities.innerHTML += addAbilities(i);
    }
}

function createStatsContainer(x) {
    let container = document.getElementById(`stats-container`);
    container.innerHTML = '';
    for (let i = 0; i < pokemons[x-1]['stats'].length; i++) {
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
    } else {
        container.innerHTML = addTemplateeeveeEvolutionsContainer();
    }
}

function createMovesContainer(x) {
    let container = document.getElementById('moves-list');
    container.innerHTML = '';
    for (let i = 0; i < pokemons[x-1]['moves'].length; i++) {
        container.innerHTML += addMove(i);
    }
}

function fillPokemonDetails(x) {
    fillAboutDetails(x);
    fillStatsDetails(x);
    fillEvolutionDetails(x);
    fillMovesDetails(x);
}

function fillAboutDetails(x) {
    let height = pokemons[x-1]['height'] * 10;
    let weight = pokemons[x-1]['weight'] / 10;
    document.getElementById('height').innerHTML = `${height} cm`;
    document.getElementById('weight').innerHTML = `${weight} kg`;
    fillAbilityDetails(x);
}

function fillAbilityDetails(x) {
    for (let i = 0; i < pokemons[x-1]['abilities'].length; i++) {
        let ability = pokemons[x-1]['abilities'][i]['ability']['name'];
        document.getElementById(`ability-${i}`).innerHTML = firstCharToUppercase(ability);
    }
}

function fillStatsDetails(x) {
    for (let i = 0; i < pokemons[x-1]['stats'].length; i++) {
        let statname = pokemons[x-1]['stats'][i]['stat']['name'];
        document.querySelector(`#stat-name-${i}`).innerHTML = firstCharToUppercase(statname);
        document.querySelector(`#stat-value-${i}`).innerHTML = pokemons[x-1]['stats'][i]['base_stat'];
        document.querySelector(`#progress-${i}`).setAttribute('value', `${pokemons[x-1]['stats'][i]['base_stat']}`);
    }
}

function fillEvolutionDetails(x) {
    if (firstEvolutionOfThree.includes(x) || secondEvolutionOfThree.includes(x) || thirdEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsDetails(x);
    } else if (firstEvolutionOfTwo.includes(x) || secondEvolutionOfTwo.includes(x)) {
        fillTwoEvolutionsDetails(x);
    } else if (NoEvolution.includes(x)) {
        document.querySelector(`#evolution-img-1`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    } else {
        filleeveeEvolutionDetails(x);
    }
}

async function filleeveeEvolutionDetails(x) {
    let waterEvolution = pokemons[133]['sprites']['other']['official-artwork']['front_default'];
    let electricEvolution = pokemons[134]['sprites']['other']['official-artwork']['front_default'];;
    let fireEvolution = pokemons[135]['sprites']['other']['official-artwork']['front_default'];
    addFourEvolutionsImg(x, waterEvolution, electricEvolution, fireEvolution);
}

function addFourEvolutionsImg(x, evolution1, evolution2, evolution3) {
    document.querySelector(`#evolution-img-1`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-2`).src = evolution1;
    document.querySelector(`#evolution-img-3`).src = evolution2;
    document.querySelector(`#evolution-img-4`).src = evolution3;
}

function fillThreeEvolutionsDetails(x) {
    if (firstEvolutionOfThree.includes(x)) {
        let secondEvolution = pokemons[x]['sprites']['other']['official-artwork']['front_default'];
        let thirdEvolution = pokemons[x+1]['sprites']['other']['official-artwork']['front_default'];
        addThreeEvolutionsImg(x, 1, 2, 3, secondEvolution, thirdEvolution);
    } else if (secondEvolutionOfThree.includes(x)) {
        let firstEvolution = pokemons[x-2]['sprites']['other']['official-artwork']['front_default'];
        let thirdEvolution = pokemons[x]['sprites']['other']['official-artwork']['front_default'];
        addThreeEvolutionsImg(x, 2, 1, 3, firstEvolution, thirdEvolution);
    } else {
        let firstEvolution = pokemons[x-3]['sprites']['other']['official-artwork']['front_default'];
        let secondEvolution = pokemons[x-2]['sprites']['other']['official-artwork']['front_default'];
        addThreeEvolutionsImg(x, 3, 1, 2, firstEvolution, secondEvolution);
    }
}

function addThreeEvolutionsImg(x, i, j, k, evolution1, evolution2) {
    document.querySelector(`#evolution-img-${i}`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${j}`).src = evolution1;
    document.querySelector(`#evolution-img-${k}`).src = evolution2;
}

function fillTwoEvolutionsDetails(x) {
    if (firstEvolutionOfTwo.includes(x)) {
        let secondEvolution = pokemons[x]['sprites']['other']['official-artwork']['front_default'];
        addTwoEvolutionsImg(x, 1, 2, secondEvolution);
    } else {
        if (x == 136) {
            let firstEvolution = pokemons[x-4]['sprites']['other']['official-artwork']['front_default'];
            addTwoEvolutionsImg(x, 2, 1, firstEvolution);
        } else if (x == 135) {
            let firstEvolution = pokemons[x-3]['sprites']['other']['official-artwork']['front_default'];
            addTwoEvolutionsImg(x, 2, 1, firstEvolution);
        } else {
            let firstEvolution = pokemons[x-2]['sprites']['other']['official-artwork']['front_default'];
            addTwoEvolutionsImg(x, 2, 1, firstEvolution);
        }
    }
}

function addTwoEvolutionsImg(x, i, j, evolution) {
    document.querySelector(`#evolution-img-${i}`).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${j}`).src = evolution;
}

function fillMovesDetails(x) {
    for (let i = 0; i < pokemons[x-1]['moves'].length; i++) {
        let move = pokemons[x-1]['moves'][i]['move']['name'];
        document.getElementById(`move-${i}`).innerHTML = firstCharToUppercase(move);
    }
}

function closeDetails() {
    switchToDetail(`.about`, `.about-container`);
    document.querySelector(`#pokemon-details`).classList.add('d-none');
    document.querySelector('.glossyWindow').classList.add('d-none');
    document.querySelector('#pokemon-info-card').classList.add('d-none');
    document.querySelector('#pokemon-info-card').classList.remove('open-info');
}

function switchToDetail(element, element2) {
    let detailLinks = document.querySelectorAll(`a`);
    detailLinks.forEach(link => {
        link.classList.remove('active');
    })
    document.querySelector(element).classList.add('active');
    changeDetailContainer(element2);
}

function changeDetailContainer(element) {
    let containers = document.querySelectorAll(`.details-container .container`);
    containers.forEach(container => {
        container.classList.add('d-none');
    })
    document.querySelector(element).classList.remove('d-none');
}

async function loadPokemon(x) {
    let url = `https://pokeapi.co/api/v2/pokemon/${x}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
}

function firstCharToUppercase(word) {
    let firstChar = (word.charAt(0)).toUpperCase();
    return firstChar + word.slice(1);
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

function pokemonWithOnlyOneMove(x) {
    return x == 132;
}

function pokemonHasOnlyOneMove() {
    return currentPokemon['moves'].length == 1;
}

function pokemonHaslessThanTwentyMoves() {
    return currentPokemon['moves'].length > 1 && currentPokemon['moves'].length < 10;
}

function changeToShiny(id, x) {
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_shiny']
}

function changeToDefault(id, x) {
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default']
}

function clickThroughPokemonList(counter) {
    document.getElementById('pokemon-info-card').classList.add('looper');
    setTimeout(function() {
        rotatePokemonInfoCard(counter);
    }, 500);
}

function rotatePokemonInfoCard(counter) {
    let id = getId();
    renderPokemonInfoCard(id + counter);
    switchToDetail(`.about`, `.about-container`);
    document.getElementById('pokemon-info-card').classList.remove('looper');
}

function getId() {
    let id = +document.querySelector(`#pokemon-info-card .pokemon-id`).getAttribute('id');
    return id;
}

function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        currentPokemon = pokemons[i];
        let name = pokemons[i]['name'];
        if (name.toLowerCase().includes(search)) {
            content.innerHTML += renderPokemonCard(i+1);
        }
    }
}