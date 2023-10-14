/*------------------------------------------------ Pokemon Info Card -------------------------------------*/


/**
 * Displays detailed information about a Pokemon based on its ID
 * @param id - The `id` parameter is the identifier of a specific Pokemon used to retrieve information about the Pokemon and display it on the page
 */
function seeDetails(id) {
    let x = getPokemonListNum(id);
    renderPokemonInfoCard(x);
    document.querySelector('.glossyWindow').classList.remove('d-none');
    document.getElementById('pokemon-info-card').classList.remove('d-none');
}

/**
 * Returns the position of a Pokemon in a list based on its ID
 * @param id - The `id` parameter is the identifier of a specific Pokemon
 * @returns the position of the Pokemon in the `pokemons` array, plus 1
 */
function getPokemonListNum(id) {
    let idnum = getId(id);
    for (let i = 0; i < pokemons.length; i++) {
        if (idnum == pokemons[i]['id']) {
            return i + 1;
        }
    }
}

/**
 * The function `getId` takes an element ID as input, retrieves the innerHTML of the element, removes
 * the '#' character, and returns the resulting value as a number (pokemon ID)
 * @param elementId - string that represents the id of an HTML element
 * @returns returns ID of the pokemon
 */
function getId(elementId) {
    let id = document.querySelector(elementId).innerHTML;
    return +id.replace('#', '');
}

/**
 * Used to display information about a specific Pokemon on a webpage
 * @param x - The parameter "x" is the index of the Pokemon in the "pokemons" array
 * It is used to retrieve the specific Pokemon object from the array and render its information on the info card
 */
function renderPokemonInfoCard(x) {
    currentPokemon = pokemons[x-1];
    deleteTypClass();
    createDetailsContainer(x);
    fillPokemonInfoCardHeader();
    fillPokemonDetails(x);
    checkIfFavoritePokemon();
}

/**
 * Removes all classes from the element with the id 'card' that are present in the `pokemonTypes` array
 */
function deleteTypClass() {
    let infoCard = document.getElementById('card');
    for (let i = 0; i < pokemonTypes.length; i++) {
        let type = pokemonTypes[i];
        if (infoCard.classList.contains(type)) {
            infoCard.classList.remove(type);
        }
    }
}

/**
 * Creates a container with details, including about, stats, evolution, and moves
 * @param x - The parameter "x" is used as an input to the createEvolutionContainer function
 * It is used to determine the specific pokemon details or data
 */
function createDetailsContainer(x) {
    createAboutContainer();
    createStatsContainer();
    createEvolutionContainer(x);
    createMovesContainer();
}

/**
 * Creates an about container element, adds a template to it, creates template abilities, and creates typ icons
 */
function createAboutContainer() {
    let container = document.getElementById(`about-container`);
    container.innerHTML = addTemplateAboutContainer();
    CreateTemplateAbilities();
    createTypIcons();
}

/**
 * Updates the HTML element with class "abilities" to display the abilities of a current Pokemon
 */
function CreateTemplateAbilities() {
    let abilities = document.querySelector('.abilities');
    abilities.innerHTML = '';
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        abilities.innerHTML += addAbilities(i);
    }
}

/**
 * Creates type icons for a given Pokemon and adds them to a container element
 */
function createTypIcons() {
    let container = document.getElementById('icon-container');
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addTypIcons(i);
    }
}

/**
 * Creates a stats container and populates it with HTML templates based on the current Pokemon's stats
 */
function createStatsContainer() {
    let container = document.getElementById(`stats-container`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        container.innerHTML += addTemplateStatsContainer(i);
    }
}

/**
 * Creates an evolution container and checks the evolution possibilities based on a given parameter
 * @param x - The parameter "x" is the index of the Pokemon in the "pokemons" array
 */
function createEvolutionContainer(x) {
    let container = document.getElementById(`evolution-container`);
    checkEvolutionPossibilities(container, x)
}

/**
 * Checks the evolution possibilities of a given Pokémon and updates the HTML container accordingly
 * @param container - HTML element where the evolution possibilities will be displayed
 * @param x - The parameter "x" represents the ID of a Pokemon
 */
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

/**
 * Checks if a given Pokémon is one of the three evolutions in a list
 * @param x - The parameter `x` represents the id of a Pokemon
 * @returns a boolean value
 */
function pokemonOfThreeEvolutions(x) {
    return firstEvolutionOfThree.includes(x) || secondEvolutionOfThree.includes(x) || thirdEvolutionOfThree.includes(x);
}

/**
 * Checks if a given Pokemon is either a first or second evolution of a two-stage evolution line
 * @param x - The parameter `x` represents the id of a Pokemon
 * @returns a boolean value
 */
function pokemonOfTwoEvolutions(x) {
    return firstEvolutionOfTwo.includes(x) || secondEvolutionOfTwo.includes(x);
}

/**
 * Checks if a given Pokemon has no evolution
 * @param x - The parameter `x` represents the id of a Pokemon
 * @returns a boolean value whether the input "x" is included in the array "NoEvolution"
 */
function pokemonWithNoEvolution(x) {
    return NoEvolution.includes(x);
}

/**
 * Creates a container for displaying a list of moves for a current Pokemon and populates it with move elements
 */
function createMovesContainer() {
    let container = document.getElementById('moves-list');
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        container.innerHTML += addMove(i);
    }
}

/**
 * The function "fillPokemonInfoCardHeader" is responsible for filling the header section of a Pokemon information card
 */
function fillPokemonInfoCardHeader() {
    createTypesInfoContainer();
    displayPokeball('pokeball-container', 'pokemon-img');
    fillPokemonCard("");
    displayArrows();
}

/**
 * Creates a container in the HTML document and populates it with information about the types of a current Pokemon
 */
function createTypesInfoContainer() {
    let container = document.getElementById(`types`);
    container.innerHTML = '';
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        container.innerHTML += addInfoType(i);
    }
}

/**
 * Displays the pokeball and hides the pokemon image
 * @param img1 - The parameter `img1` is the id of the first image element that you want to hide
 * @param img2 - The `img2` parameter is the ID of the image element that you want to display
 */
function displayPokeball(img1, img2) {
    document.getElementById(img1).classList.add('d-none');
    document.getElementById(img2).classList.remove('d-none');
}

/**
 * Displays left and right arrows based on the current name and the last Pokemon name in the `pokemons` array
 */
function displayArrows() {
    let lastPokemon = pokemons[pokemons.length - 1]['name'];
    let name = document.querySelector(`#card .pokemon-name`).innerHTML;
    displayLeftArrow(name);
    displayRightArrow(name, lastPokemon);
}

/**
 * Checks if the given name is 'Bulbasaur' and adds or removes the 'd-none' class from the element with the id 'arrow-left' accordingly
 * @param name - The name parameter is a string that represents the name of a Pokemon
 */
function displayLeftArrow(name) {
    if (name == 'Bulbasaur') {
        document.getElementById('arrow-left').classList.add('d-none');
    } else {
        document.getElementById('arrow-left').classList.remove('d-none');
    }
}

/**
 * Checks if the given name is the same as the last Pokemon, and if so, hides the right arrow element; otherwise, it shows the right arrow element
 * @param name - The name parameter is the name of the current Pokemon being displayed
 * @param lastPokemon - The lastPokemon parameter is the name of the last Pokemon in a list or sequence
 */
function displayRightArrow(name, lastPokemon) {
    if (name.toLowerCase() == lastPokemon) {
        document.getElementById('arrow-right').classList.add('d-none');
    } else {
        document.getElementById('arrow-right').classList.remove('d-none');
    }
}

/**
 * Used to fill in various details about a Pokemon, including its about, stats, evolution, and moves
 * @param x - The parameter "x" is likely referring to the specific Pokemon that you want to fill the details for
 */
function fillPokemonDetails(x) {
    fillAboutDetails();
    fillStatsDetails();
    fillEvolutionDetails(x);
    fillMovesDetails();
}

/**
 * Updates the height and weight details of a current Pokemon on a webpage
 */
function fillAboutDetails() {
    let height = currentPokemon['height'] * 10;
    let weight = currentPokemon['weight'] / 10;
    document.getElementById('height').innerHTML = `${height} cm`;
    document.getElementById('weight').innerHTML = `${weight} kg`;
    fillAbilityDetails();
}

/**
 * Populates the HTML elements with the names of the abilities of a current Pokemon
 */
function fillAbilityDetails() {
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let ability = currentPokemon['abilities'][i]['ability']['name'];
        document.getElementById(`ability-${i}`).innerHTML = firstCharToUppercase(ability);
    }
}

/**
 * Populates the HTML elements with the stats details of a current Pokemon
 */
function fillStatsDetails() {
    for (let i = 0; i < currentPokemon['stats'].length; i++) {
        let statname = currentPokemon['stats'][i]['stat']['name'];
        document.querySelector(`#stat-name-${i}`).innerHTML = firstCharToUppercase(statname);
        document.querySelector(`#stat-value-${i}`).innerHTML = currentPokemon['stats'][i]['base_stat'];
        document.querySelector(`#progress-${i}`).setAttribute('value', `${currentPokemon['stats'][i]['base_stat']}`);
    }
}

/**
 * Determines the evolution details of a given Pokémon and fills in the corresponding information
 * @param x - The parameter `x` represents the index/ ID of a Pokémon
 */
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

/**
 * Determines the order of three evolutions based on the input value and calls another function to fill in the details
 * @param x - The parameter `x` represents the index/ ID of a Pokémon
 */
function fillThreeEvolutionsDetails(x) {
    if (firstEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsImg(1, 2, 3, x-1, x, x+1);
    } else if (secondEvolutionOfThree.includes(x)) {
        fillThreeEvolutionsImg(2, 1, 3, x-1, x-2, x);
    } else {
        fillThreeEvolutionsImg(3, 1, 2, x-1, x-3, x-2);
    }
}

/**
 * Takes in three image IDs and three evolution IDs, and sets the source of each image to the front default artwork of the corresponding evolution
 * @param img1 - The parameter `img1` is the ID of the HTML element where you want to display the image of the first evolution
 * @param img2 - The `img2` parameter is the ID of the HTML element where you want to display the image of the second evolution
 * @param img3 - The `img3` parameter is the ID of the HTML element where the image of the third evolution will be displayed
 * @param evolution1 - The parameter `evolution1` represents the index or name of the first evolution of a Pokemon
 * @param evolution2 - The `evolution2` parameter is the ID or name of the second evolution of a Pokémon
 * @param evolution3 - The `evolution3` parameter is the ID or name of the third evolution of a Pokémon
 */
function fillThreeEvolutionsImg(img1, img2, img3, evolution1, evolution2, evolution3) {
    document.querySelector(`#evolution-img-${img1}`).src = pokemons[evolution1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img2}`).src = pokemons[evolution2]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img3}`).src = pokemons[evolution3]['sprites']['other']['official-artwork']['front_default'];
}

/**
 * Determines the evolution details of a given Pokémon and calls another function to fill in the corresponding images
 * @param x - The parameter `x` represents the index of a Pokemon array
 */
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

/**
 * Takes in three image IDs and three evolution IDs, and sets the source of each image to the front default artwork of the corresponding evolution
 * @param img1 - The parameter `img1` is the ID of the HTML element where you want to display the image of the first evolution
 * @param img2 - The `img2` parameter is the ID of the HTML element where you want to display the image of the second evolution
 * @param evolution1 - The `evolution1` parameter represents the index or name of the first evolution of a Pokémon
 * @param evolution2 - The `evolution2` parameter is the name or index of the second evolution of a Pokémon
 */
function fillTwoEvolutionsImg(img1, img2, evolution1, evolution2) {
    document.querySelector(`#evolution-img-${img1}`).src = pokemons[evolution1]['sprites']['other']['official-artwork']['front_default'];
    document.querySelector(`#evolution-img-${img2}`).src = pokemons[evolution2]['sprites']['other']['official-artwork']['front_default'];
}

/**
 * Updates the source of 4 HTML image elements with the official artwork of the eevee Pokémon evolutions
 */
function filleeveeEvolutionDetails() {
    for (let i = 1; i < 5; i++) {
        document.querySelector(`#evolution-img-${i}`).src = pokemons[131+i]['sprites']['other']['official-artwork']['front_default'];
    }
}

/**
 * Populates the details of each move for a given Pokemon on a web page
 */
function fillMovesDetails() {
    for (let i = 0; i < currentPokemon['moves'].length; i++) {
        let move = currentPokemon['moves'][i]['move']['name'];
        document.getElementById(`move-${i}`).innerHTML = firstCharToUppercase(move);
    }
}

/**
 * Checks if the current Pokemon is in the favorite Pokemon list and updates the star icon accordingly
 */
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

/**
 * The switchStar function hides one star element and shows another star element
 * @param star1 - The parameter `star1` is the ID of the first star element
 * @param star2 - The `star2` parameter is the ID of the star element that you want to switch to
 */
function switchStar(star1, star2) {
    document.getElementById(star1).classList.add('d-none');
    document.getElementById(star2).classList.remove('d-none');
}

/**
 * Changes the active link and the detail container based on the provided elements
 * @param element1 - element that represents the link or button that was clicked to switch to the detail view
 * @param element2 - element that you want to switch to
 */
function switchToDetail(element1, element2) {
    changeActiveLink(element1)
    changeDetailContainer(element2);
}

/**
 * Changes the active link by adding the 'active' class to the specified element and removing it from all other links
 * @param element - string that represents the CSS selector of the link element that you want to set as active
 */
function changeActiveLink(element) {
    let detailLinks = document.querySelectorAll(`a`);
    detailLinks.forEach(link => {
        link.classList.remove('active');
    })
    document.querySelector(element).classList.add('active');
}

/**
 * Changes the visibility of a specific container element within a details container
 * @param element - The `element` parameter is a string that represents the CSS selector of the container element that you want to display
 */
function changeDetailContainer(element) {
    let containers = document.querySelectorAll(`.details-container .container`);
    containers.forEach(container => {
        container.classList.add('d-none');
    })
    document.querySelector(element).classList.remove('d-none');
}

/**
 * Adds a CSS class to an element, waits for 500 milliseconds, and then calls another function to rotate the Pokemon information card
 * @param counter - The counter parameter is used to keep track of the current position in the Pokemon list
 * It is passed to the rotatePokemonInfoCard function to determine which Pokemon's information to display on the card
 */
function clickThroughPokemonList(counter) {
    document.getElementById('card').classList.add('looper');
    setTimeout(function() {
        rotatePokemonInfoCard(counter);
    }, 500);
}

/**
 * Rotates the Pokemon info card by updating the ID, rendering the new card, and switching to the detail view
 * @param counter - The `counter` parameter is a number that determines how much the `id` value should be incremented or decremented
 */
function rotatePokemonInfoCard(counter) {
    let id = getId(`#card .pokemon-id`);
    renderPokemonInfoCard(id + counter);
    switchToDetail(`.about`, `.about-container`);
    document.getElementById('card').classList.remove('looper');
}

/**
 * The closeDetails function hides the about section, glossy window, and pokemon info card
 */
function closeDetails() {
    switchToDetail(`.about`, `.about-container`);
    document.querySelector('.glossyWindow').classList.add('d-none');
    document.querySelector('#pokemon-info-card').classList.add('d-none');
}

/**
 * Changes the image source of a specified element to a shiny version of a Pokémon image
 * @param id - The `id` parameter is the identifier of the Pokemon card or element that you want to change the image of
 * @param image - The `image` parameter is a string that represents the type of image you want to change to
 */
function changeToShinyImg(id, image) {
    let x = getPokemonListNum(`#card${id} .pokemon-id`);
    let img = pokemons[x-1]['sprites']['other']['official-artwork'][image];
    if (img !== null) {
        document.getElementById(`pokemon-img-${id}`).src = img;
    }
}

/**
 * Changes the image of an element to a default image
 * @param id - The `id` parameter is the identifier of the Pokemon card or element that you want to change the image of
 * @param image - The `image` parameter is a string that represents the type of image you want to change to
 */
function changeToDefaultImg(id, image) {
    changeToShinyImg(id, image);
}