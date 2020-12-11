function ibg(){
	let ibg=document.querySelectorAll('.ibg');
		for (var i = 0; i < ibg.length; i++) {
			if(ibg[i].querySelector('img')){
				ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
			}
		}
}
ibg();


document.querySelector('.icon-menu').onclick = function(event) {
	document.querySelector('.icon-menu').classList.toggle('active');
	document.querySelector('.menu__body').classList.toggle('active');
	document.querySelector('body').classList.toggle('lock');

}


