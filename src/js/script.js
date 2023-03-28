let loader = document.querySelector('.loader');

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