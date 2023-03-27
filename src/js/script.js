let loader = document.querySelector('.loader');

function addTypeBgrColor(type, x) {
    switch(type) {
        case 'grass':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--green-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--green-color)';
            break;
        case 'fire':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--red-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--red-color)';
            break;
        case 'water':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--blue-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--blue-color)';
            break;
        case 'ice':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--blue-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--blue-color)';
            break;
        case 'bug':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--lightgreen-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--lightgreen-color)';
            break;
        case 'normal':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--grey-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--grey-color)';
            break;
        case 'fairy':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--grey-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--grey-color)';
            break;
        case 'fighting':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--grey-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--grey-color)';
            break;
        case 'poison':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--purple-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--purple-color)';
            break;
        case 'electric':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--yellow-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--yellow-color)';
            break;
        case 'ground':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--brown-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--brown-color)';
            break;
        case 'psychic':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--darkpurple-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--darkpurple-color)';

            break;
        case 'ghost':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--darkpurple-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--darkpurple-color)';
            break;
        case 'rock':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--darkgrey-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--darkgrey-color)';
            break;
        case 'dragon':
            document.getElementById(`card-${x}`).style.backgroundColor = 'var(--orange-color)';
            document.getElementById(`pokemon-info-card`).style.backgroundColor = 'var(--orange-color)';
            break;
    }
}

function startLoadAnimation() {
    setInterval(function() {
      if (loader.style.backgroundColor === 'var(--loader-color)') {
        loader.style.backgroundColor = 'var(--yellow-color)';
      } else {
        loader.style.backgroundColor = 'var(--loader-color)';
      }
    }, 1000);
  }
  
function stopLoadAnimation() {
    clearInterval(animateInterval);
}