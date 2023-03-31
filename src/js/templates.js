function addTemplatePokemonCard(x) {
    return `<div id="card${x}" class="card cards box-shadow curser flex-column" 
    onclick="seeDetails('#card${x} .pokemon-id')" onmouseover="changeToShinyImg('pokemon-img-${x}', '#card${x} .pokemon-id', 'front_shiny')" 
    onmouseout="changeToDefaultImg('pokemon-img-${x}', '#card${x} .pokemon-id', 'front_default')">
    <div class="card-header flex-row">
        <h2 class="pokemon-name"></h2>
        <span class="pokemon-id"></span>
    </div>
    <article class="card-cover flex-row">
        <div id="types${x}" class="types flex-column"></div>
        <img id="pokemon-img-${x}" class="pokemon-img" src="">
    </article></div>`;
}

function addType(x, i) {
    return `<a href="#top"><span id="type${x}${i}" onclick="stopPropagation(event); sortType('type${x}${i}')"></span></a>`;
}

function addInfoType(i) {
    return `<span id="type${i}" onclick="stopPropagation(event)"></span>`;
}

function addTemplateAboutContainer() {
    return `<div class="parameter-list flex-column">
    <div class="parameters flex-row"><span>Height:</span><span id="height"></span></div>
    <div class="parameters flex-row"><span>Weight:</span><span id="weight"></span></div>
    <div class="parameters flex-row"><span>Abilities:</span><div class="abilities flex-wrap"></div></div>
    <div id="icon-container" class="flex-row"></div></div>`;
}

function addTypIcons(i) {
    return `<div id="icon${i}" class="icon"><img src=""/></div>`;
}

function addAbilities(i) {
    return `<span id="ability-${i}"></span>`;
}

function addTemplateStatsContainer(i) {
    return `<div class="stat-row flex-row">
    <span id="stat-name-${i}" class="stat-name"></span>
    <span id="stat-value-${i}" class="stat-value"></span>
    <progress id="progress-${i}" max="150" value=""></progress>
    </div>`;
}

function addTemplateeeveeEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <div id="eevee-evolutions" class="flex-column">
    <img id="evolution-img-2" class="evolution-img eevee-evolution-img" src="">
    <img id="evolution-img-3" class="evolution-img eevee-evolution-img" src="">
    <img id="evolution-img-4" class="evolution-img eevee-evolution-img" src="">
    </div>`;
}

function addTemplateThreeEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-2" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-3" class="evolution-img" src="">`;
}

function addTemplateTwoEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">
    <i class='bx bx-chevrons-right'></i>
    <img id="evolution-img-2" class="evolution-img" src="">`;
}

function addTemplateNoEvolutionsContainer() {
    return `<img id="evolution-img-1" class="evolution-img" src="">`;
}

function addUnknownEvolutionTemplate() {
    return `<span class="newPokemon"><strong>Pokedex Update!</strong><br><br>Entwicklungen werden bearbeitet.</span>`;
}

function addMove(i) {
    return `<span id="move-${i}"></span>`;
}

function addNoFavoritesTemplate() { 
    return `<div class="noFavorites flex-column">
    <h1>Du hast bis jetzt noch keine Pokemon gefangen. Wähle jetzt dein Team!</h1>
    <img src="./src/img/enton.png">
</div>`;
}

function addPokeballTemplate() {
    return `<div class="pokeball">
      <div class="pokeball__button"></div>
    </div>`;
}

function addLoadAllPokemonButtonTemplate() {
    return '<a href="#top"><button class="box-shadow curser" onclick="renderPokemonCard(1)">Zurück zur Pokemonliste</button></a>'
}