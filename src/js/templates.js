function addTemplatePokemonCard(x) {
    return `<div id="card${x}" class="card cards box-shadow curser flex-column" 
    onclick="seeDetails(${x})" onmouseover="changeToShinyImg('pokemon-img-${x}', ${x})" 
    onmouseout="changeToDefaultImg('pokemon-img-${x}', ${x})">
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
    return `<span id="type${x}${i}"></span>`;
}

function addInfoType(i) {
    return `<span id="type${i}"></span>`;
}

function addTemplateAboutContainer() {
    return `<div class="parameter-list flex-column">
    <div class="parameters flex-row"><span>Height:</span><span id="height"></span></div>
    <div class="parameters flex-row"><span>Weight:</span><span id="weight"></span></div>
    <div class="parameters flex-row"><span>Abilities:</span><div class="abilities flex-wrap"></div></div></div>`;
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

function addMove(i) {
    return `<span id="move-${i}"></span>`;
}