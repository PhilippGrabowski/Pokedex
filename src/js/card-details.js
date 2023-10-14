function seeDetails(element) {
    let x = getPokemonListNum(element);
    renderPokemonInfoCard(x);
    document.querySelector('.glossyWindow').classList.remove('d-none');
    document.getElementById('pokemon-info-card').classList.remove('d-none');
}

function getPokemonListNum(element) {
    let idnum = getId(element);
    for (let i = 0; i < pokemons.length; i++) {
        if (idnum == pokemons[i]['id']) {
            return i + 1;
        }
    }
}

function getId(element) {
    let id = document.querySelector(element).innerHTML;
    return +id.replace('#', '');
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

function displayPokeball(img1, img2) {
    document.getElementById(img1).classList.add('d-none');
    document.getElementById(img2).classList.remove('d-none');
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

function switchStar(star1, star2) {
    document.getElementById(star1).classList.add('d-none');
    document.getElementById(star2).classList.remove('d-none');
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

function closeDetails() {
    switchToDetail(`.about`, `.about-container`);
    document.querySelector('.glossyWindow').classList.add('d-none');
    document.querySelector('#pokemon-info-card').classList.add('d-none');
}

function changeToShinyImg(id, element, img) {
    let x = getPokemonListNum(element);
    document.getElementById(id).src = pokemons[x-1]['sprites']['other']['official-artwork'][img];
}

function changeToDefaultImg(id, element, img) {
    changeToShinyImg(id, element, img);
}