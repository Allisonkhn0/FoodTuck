// OPEN ASIDE
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