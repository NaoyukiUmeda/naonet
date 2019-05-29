import Vivus from 'vivus';
import $ from 'jquery';

'use strict';

let a = 10;
let timeoutID1;

{
  // console.log(this);
  var btn = document.getElementById('page-main');
  // btn.addEventListener('click', e => {
  // 	call(e)
  // }, false);
};


// timeoutID1 = window.setTimeout(sayBaz(), 2000);


// const icon1 = () => {
// 	document.querySelectorAll('.page-icon').forEach((icon) => {
// 		icon.classList.add('moved');
// 		icon.classList.add('spin');
// 	});
// };
$(function() {
  // var h = $(window).height();
  // $('#page-main').css('display', 'none');
  // $('#loader-bg ,#loader').height(h);
  // setTimeout(function(){viewAnimeSvg();viewAnimeIcon();}, 1000);
  setTimeout(function() {
    stopload()
  }, 5000);
});

window.onload = function() {
  // $('#loader-bg').delay(900).fadeOut(800);
  // $('#loader').delay(600).fadeOut(300);
  // $('#page-main').css('display', 'flex');
  stopload()
  setTimeout(function() {
    viewAnimeNameWrap()

  }, 600);
	setTimeout(function(){
		layer1.play(1);
		layer2.play(1);
		viewAnimeIcon()
	},2500);
  // .then(
  //   isAuth => {
  //     if (isAuth) {
  //       return viewAnimeSvg()
  //     }
  //   }
  // )
  // .then(
  //   isAuth => {
  //     if (isAuth) {
  //       return viewAnimeIcon()
  //     }
  //   })
};

function stopload() {
  return new Promise((resolve, reject) => {
    $('#page-main').delay(800).css('display', 'flex');
    $('#loader-bg').delay(600).fadeOut(800);
    $('#loader').fadeOut(300);
    resolve(true);
  });
}

let layer1;
let layer2;

// function viewAnimeSvg() {
//   return new Promise((resolve, reject) => {
//
//     resolve(true);
//   });
// }
layer1 = new Vivus('Layer_1', {
	duration: 100,
	start: 'manual',
	type: 'delayed',
	pathTimingFunction: Vivus.EASE_OUT,
}, (obj) => {
	obj.el.classList.add('fill');
});
layer2 = new Vivus('Layer_2', {
	duration: 100,
	start: 'manual',
	type: 'delayed',
	pathTimingFunction: Vivus.EASE_OUT,
}, (obj) => {
	obj.el.classList.add('fill');
});

function viewAnimeNameWrap() {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('.content[name="1"]').forEach((icon) => {
      icon.classList.add('in');
    });
    resolve(true);
  })
}

function viewAnimeIcon() {
  return new Promise((resolve, reject) => {
    document.querySelectorAll('.page-icon').forEach((icon) => {
      icon.classList.add('moved');
    });
    resolve(true);
  })
}

function call(e) {
  alert(e);
  sayBaz();
}

var modalTrigger = $('.cd-modal-trigger'),
	transitionLayer = $('.cd-transition-layer'),
	transitionBackground = transitionLayer.children(),
	modalWindow = $('.cd-modal');

var frameProportion = 1.78, //png frame aspect ratio
	frames = 25, //number of png frames
	resize = false;

//set transitionBackground dimentions
setLayerDimensions();
$(window).on('resize', function(){
	if( !resize ) {
		resize = true;
		(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
	}
});

//open modal window
modalTrigger.on('click', function(event){
	event.preventDefault();
	transitionLayer.addClass('visible opening');
	var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
	setTimeout(function(){
		modalWindow.addClass('visible');
	}, delay);
});

//close modal window
modalWindow.on('click', '.modal-close', function(event){
	event.preventDefault();
	transitionLayer.addClass('closing');
	modalWindow.removeClass('visible');
	transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
		transitionLayer.removeClass('closing opening visible');
		transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
	});
});

function setLayerDimensions() {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		layerHeight, layerWidth;

	if( windowWidth/windowHeight > frameProportion ) {
		layerWidth = windowWidth;
		layerHeight = layerWidth/frameProportion;
	} else {
		layerHeight = windowHeight*1.2;
		layerWidth = layerHeight*frameProportion;
	}

	transitionBackground.css({
		'width': layerWidth*frames+'px',
		'height': layerHeight+'px',
	});

	resize = false;
}
