function scrollUp() {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
}

let burger = document.querySelector('.burger');
let list = document.querySelector('.list');

burger.addEventListener('click', e => {
  e.stopPropagation();
  list.classList.toggle('active')
  console.log('Клик!');
})

document.addEventListener('click', e => {

	if (!list.contains(e.target)) {
		list.classList.remove('active');
    console.log('Чтот не так');
	}

  console.log('Угабуга политех');

});