


//********大板块的轮播图*********

//图片宽度
var wid = 790;
//轮播张数
var carouselNumber = 7;
var allBanner = document.getElementsByClassName("all-banner");
var colorArr = ["#6FB9FA","#D8EEFB","#6DD7CB","#FDDD18","#FAFAFA","#91C04C","#F0DACF"]

var imgs = document.querySelectorAll('#carousel img');
for(var i = 0; i < imgs.length; i++) {
	imgs[i].style.left = i * wid + 'px';
}

var span = document.querySelectorAll('.point')
span[0].style.backgroundColor = 'white';
allBanner[0].style.backgroundColor = colorArr[0];
//定义一个变量记录当前显示的图片索引
var currentIndex = 0;

//定时器触发的自动切换图片和手动点击白点切换图片
function moveImg(isAnimate) {
	for(var i = 0; i < imgs.length; i++) {

		if(currentIndex == 0 && !isAnimate) {
			imgs[i].style.transition = 'none';
		} else {
			imgs[i].style.transition = '';
		}
		imgs[i].style.left = (i - currentIndex) * wid + 'px';
	}
}

function changeImg() {

	span[currentIndex % carouselNumber].style.backgroundColor = '';
	currentIndex++;

	if(currentIndex > carouselNumber) {
		currentIndex = 0;
	}
	span[currentIndex % carouselNumber].style.backgroundColor = 'white';
	allBanner[0].style.backgroundColor = colorArr[currentIndex % carouselNumber];
	moveImg(false);
	if(currentIndex == 0 || currentIndex == imgs.length - 1) {
		timer = setTimeout(changeImg, 4000);
	} else {
		timer = setTimeout(changeImg, 8000);
	}
}
var timer = setTimeout(changeImg, 8000);

for(var i = 0; i < span.length; i++) {
	span[i].dataset.index = i;
	span[i].onmouseenter = function() {
		span[currentIndex % carouselNumber].style.backgroundColor = '';
		this.style.backgroundColor = 'white';

		currentIndex = this.dataset.index;
		allBanner[0].style.backgroundColor = colorArr[currentIndex % carouselNumber];
		moveImg(true);
		clearTimeout(timer);
		timer = setTimeout(changeImg, 8000);
	}
}