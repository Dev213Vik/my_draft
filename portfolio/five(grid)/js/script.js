document.querySelector('.header__burger').onclick = function(event) {
	document.querySelector('.header__menu').classList.toggle('active');
	document.querySelector('.header__burger').classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');
}



