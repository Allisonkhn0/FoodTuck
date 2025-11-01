
// Scroll for Button Up
export function Scroll() {
  document.querySelector('.button-up').addEventListener('click', () => {
    scrollUp()
  })

  function scrollUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// BURGER MENU
export function Burger () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.list');

  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
  });

}


export function OpenAside() {
  const openButton = document.querySelector('.open-aside');
  const closeButton = document.querySelector('.close-aside');
  const aside = document.querySelector('.S_aside');

  openButton.addEventListener('click', () => {
    aside.classList.toggle('active');
  })

  closeButton.addEventListener('click', () => {
    aside.classList.remove('active');
  })
}



// Hide/Show Loader
const loader = document.createElement('div');
loader.className = 'loader';
loader.innerHTML = `
  <div class="loader-spinner"></div>
`;

export function showLoader() {
  document.body.appendChild(loader);
}

export function hideLoader() {
  if (document.body.contains(loader)) {
    document.body.removeChild(loader);
  }
}
