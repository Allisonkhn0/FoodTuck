// Scroll for Button Up
export function Scroll() {
  document.querySelector('.button-up').addEventListener('click', () => {

    window.scroll({
      top: 0,
      behavior: 'smooth'
    })

  })
}