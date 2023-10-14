/*-------------------------------------------- Templates -------------------------------------------*/

/**
 * Rreturns a template string for creating a Pokemon card with dynamic content
 * @param x - The parameter `x` is used to dynamically generate unique IDs and class names for each Pokemon card
 * It is typically an integer value that represents the index or position of the Pokemon in a list or array
 * @returns a string that represents an HTML template for a Pokemon card.
 */
function addTemplatePokemonCard(x) {
    return `<div id="card${x}" class="card cards box-shadow curser flex-column" 
    onclick="seeDetails('#card${x} .pokemon-id')" onmouseover="changeToShinyImg(${x}, 'front_shiny')" 
    onmouseout="changeToDefaultImg(${x}, 'front_default')">
    <div class="card-header flex-row">
        <h2 class="pokemon-name"></h2>
        <span class="pokemon-id"></span>
    </div>
    <article class="card-cover flex-row">
        <div id="types${x}" class="types flex-column"></div>
        <img id="pokemon-img-${x}" class="pokemon-img" src="">
    </article></div>`;
}

/**
 * Returns an HTML anchor element for the Pokemon types
 * @param x - The parameter `x` represents the first part of the ID for the element
 * @param i - The parameter `i` is used to specify the id of the element.
 * @returns a string that represents an HTML template for the Pokemon types
 */
function addType(x, i) {
    return `<a href="#top"><span id="type${x}${i}" onclick="stopPropagation(event); sortType('type${x}${i}')"></span></a>`;
}

/**
 * Returns an HTML element for the Pokemon types
 * @param i - The parameter "i" is used as an index to generate a unique ID for the span element
 * @returns a string that represents an HTML template for the Pokemon types for info card
 */
function addInfoType(i) {
    return `<span id="type${i}" onclick="stopPropagation(event)"></span>`;
}

/**
 * Returns a string that represents an HTML template for a container with information about height, weight, abilities, and an icon
 * @returns Returns a string that represents an HTML template
 */
function addTemplateAboutContainer() {
    return `<div class="parameter-list flex-column">
    <div class="parameters flex-row"><span>Height:</span><span id="height"></span></div>
    <div class="parameters flex-row"><span>Weight:</span><span id="weight"></span></div>
    <div class="parameters flex-row"><span>Abilities:</span><div class="abilities flex-wrap"></div></div>
    <div id="icon-container" class="flex-row"></div></div>`;
}

/**
 * Returns a div element with a unique id and an empty image tag for the icon of the pokemon type
 * @param i - The parameter "i" is used as an index to generate a unique ID for the icon
 * @returns a string that represents an HTML element for the icon of the pokemon type
 */
function addTypIcons(i) {
    return `<div id="icon${i}" class="icon"><img src=""/></div>`;
}

/**
 * Returns a span element with a unique id for the pokemon abilities
 * @param i - The parameter "i" is used as an index to generate a unique ID for the ability
 * @returns a string that contains an HTML span element for the ability of the pokemon
 */
function addAbilities(i) {
    return `<span id="ability-${i}"></span>`;
}

/**
 * Returns a string that represents an HTML template for a stats container with placeholders for name, value, and progress
 * @param i - The parameter "i" is used as a placeholder for the index of the template
 * It is used to dynamically generate unique IDs for the elements in the template
 * @returns a string that represents an HTML template for a stats container
 */
function addTemplateStatsContainer(i) {
    return `<div class="stat-row flex-row">
    <span id="stat-name-${i}" class="stat-name"></span>
    <span id="stat-value-${i}" class="stat-value"></span>
    <progress id="progress-${i}" max="150" value=""></progress>
    </div>`;
}

/**
 * Returns a string containing HTML code for a container with images representing Eevee's evolutions
 * @returns a string that contains HTML code for an Eevee evolutions container
 */
function addTemplateeeveeEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <div id="eevee-evolutions" class="flex-column">
    <img id="evolution-img-2" class="evolution-img eevee-evolution-img" src="">
    <img id="evolution-img-3" class="evolution-img eevee-evolution-img" src="">
    <img id="evolution-img-4" class="evolution-img eevee-evolution-img" src="">
    </div>`;
}

/**
 * Returns a string containing HTML code for displaying three evolution images with chevron icons in between
 * @returns a string that contains three HTML image elements with corresponding IDs and classes
 * Additionally, there are two HTML icon elements with classes for chevron icons placed between each image element
 */
function addTemplateThreeEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-2" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-3" class="evolution-img" src="">`;
}

/**
 * Returns a string containing HTML code for displaying two evolution images
 * @returns a string that contains HTML code for two image elements and a chevron icon
 */
function addTemplateTwoEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-2" class="evolution-img" src="">`;
}

/**
 * Returns an HTML template for an image element with a specific id and class
 * @returns an HTML string that represents an image element with an id, a class and an empty src attribute
 */
function addTemplateNoEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">`;
}

/**
 * Returns a string containing a message about updating evolution templates in a Pokedex
 * @returns a string that represents an HTML element
 */
function addUnknownEvolutionTemplate() {
    return `<span class="newPokemon"><strong>Pokedex Update!</strong><br><br>Entwicklungen werden bearbeitet.</span>`;
}

/**
 * Returns a string containing an HTML element for a pokemon move
 * @param i -  used to dynamically generate unique IDs for the element
 * @returns a string that contains an HTML element for a pokemon move
 */
function addMove(i) {
    return `<span id="move-${i}"></span>`;
}

/**
 * Returns a template string that displays a message and an image when the user has not caught any Pokemon yet
 * @returns an HTML template as a string.
 */
function addNoFavoritesTemplate() { 
    return `<div class="noFavorites flex-column">
    <h1>Du hast bis jetzt noch keine Pokemon gefangen. Wähle jetzt dein Team!</h1>
    <img src="./src/img/enton.png">
</div>`;
}

/**
 * Returns a string containing HTML code for a pokeball element
 * @returns a string that represents an HTML template for a pokeball
 */
function addPokeballTemplate() {
    return `<div class="pokeball">
    <div class="pokeball__button"></div>
    </div>`;
}

/**
 * Returns a template for a button that, when clicked, triggers the rendering of all Pokemon cards
 * @returns a string that represents an HTML template for a button
 */
function addLoadAllPokemonButtonTemplate() {
    return '<a id="back" href="#top"><button class="box-shadow curser" onclick="renderPokemonCards(1)">Zurück zur Pokemonliste</button></a>'
}