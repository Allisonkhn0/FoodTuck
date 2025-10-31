
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
