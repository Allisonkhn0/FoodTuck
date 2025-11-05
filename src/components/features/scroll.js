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