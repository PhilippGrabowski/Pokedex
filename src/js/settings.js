let pokemons = [];
let currentPokemon;
let pokemonTypes = [];
let firstEvolutionOfThree = [1, 4, 7, 10, 13, 16, 29, 32, 43, 60, 63, 66, 69, 74, 92, 147];
let secondEvolutionOfThree = [2, 5, 8, 11, 14, 17, 30, 33, 44, 61, 64, 67, 70, 75, 93, 148];
let thirdEvolutionOfThree = [3, 6, 9, 12, 15, 18, 31, 34, 45, 62, 65, 68, 71, 76, 94, 149];
let firstEvolutionOfTwo = [19, 21, 23, 25, 27, 35, 37, 39, 41, 46, 48, 50, 52, 54, 56, 58, 72, 77, 79, 81, 84, 86, 88, 90, 96, 98, 100, 102, 104, 109, 111, 116, 118, 120, 129, 138, 140];
let secondEvolutionOfTwo = [20, 22, 24, 26, 28, 36, 38, 40, 42, 47, 49, 51, 53, 55, 57, 59, 73, 78, 80, 82, 85, 87, 89, 91, 97, 99, 101, 103, 105, 110, 112, 117, 119, 121, 130, 134, 135, 136, 139, 141];
let NoEvolution = [83, 95, 106, 107, 108, 113, 114, 115, 122, 123, 124, 125, 126, 127, 128, 131, 132, 137, 142, 143, 144, 145, 146, 150, 151];
let animateInterval;

async function loadPokemons() {
    pokemons = [];
    for (let i = 1; i < 152; i++) {
        currentPokemon = await loadPokemon(i);
        pokemons.push(currentPokemon);
        renderPokemonCard(i);
    }
}

async function loadPokemon(x) {
    let url = `https://pokeapi.co/api/v2/pokemon/${x}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    return pokemon;
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
        addToPokemonTypesList(type);
        document.querySelector(`#type${x}${i}`).innerHTML = firstCharToUppercase(type);
        if (i == 0) {
            document.getElementById(`card${x}`).classList.add(type);
        }
    }
}

function addToPokemonTypesList(type) {
    if (pokemonTypes.length == 0) {
        pokemonTypes.push(type);
    } else {
        if (pokemonTypes.includes(type) == false) {
            pokemonTypes.push(type);
        }
    }
}

function seeDetails(x) {
    renderPokemonInfoCard(x);
    document.querySelector('.glossyWindow').classList.remove('d-none');
    document.getElementById('card').classList.remove('d-none');
}

function renderPokemonInfoCard(x) {
    currentPokemon = pokemons[x-1];
    deleteTypClass();
    fillPokemonInfoCardHeader();
    document.querySelector(`#card .pokemon-id`).setAttribute('id', `${x}`);
    createDetailsContainer(x);
    fillPokemonDetails(x);
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
    createTypesContainer("");
    fillPokemonCard("");
    displayArrows();
}

function displayArrows() {
    let name = document.querySelector(`#card .pokemon-name`).innerHTML;
    displayLeftArrow(name);
    displayRightArrow(name);
}

function displayLeftArrow(name) {
    if (name == 'Bulbasaur') {
        document.getElementById('arrow-left').classList.add('d-none');
    } else {
        document.getElementById('arrow-left').classList.remove('d-none');
    }
}

function displayRightArrow(name) {
    if (name == 'Mew') {
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
}

function CreateTemplateAbilities() {
    let abilities = document.querySelector('.abilities');
    abilities.innerHTML = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        abilities.innerHTML += addAbilities(i);
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
    } else {
        container.innerHTML = addTemplateeeveeEvolutionsContainer();
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
    } else {
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
    let id = getId();
    renderPokemonInfoCard(id + counter);
    switchToDetail(`.about`, `.about-container`);
    document.getElementById('card').classList.remove('looper');
}

function getId() {
    let id = +document.querySelector(`#card .pokemon-id`).getAttribute('id');
    return id;
}

function closeDetails() {
    switchToDetail(`.about`, `.about-container`);
    document.querySelector('.glossyWindow').classList.add('d-none');
    document.querySelector('#card').classList.add('d-none');
}

function firstCharToUppercase(word) {
    let firstChar = (word.charAt(0)).toUpperCase();
    return firstChar + word.slice(1);
}

function changeToShinyImg(id, x) {
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_shiny']
}

function changeToDefaultImg(id, x) {
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork']['front_default']
}

function searchPokemon() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    let search = document.getElementById('search').value;
    if (search.length == 0) {
        loadPokemons();
    } else {
        search = search.toLowerCase();
        for (let i = 0; i < pokemons.length; i++) {
            let name = pokemons[i]['name'];
            if (name.toLowerCase().includes(search)) {
                currentPokemon = pokemons[i];
                content.innerHTML += renderPokemonCard(i+1);
            }
        }
    }
}