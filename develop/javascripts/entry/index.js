import Vivus from 'vivus';
import $ from 'jquery';

'use strict';

let a = 10;
let timeoutID1;
let changeFlag = 0; {
  var btn = document.getElementById('page-main');
};

$(function() {
  setTimeout(function() {
    stopload()
  }, 5000);
});

window.onload = function() {
  stopload()
  setTimeout(function() {
    viewAnimeNameWrap()
  }, 600);
  setTimeout(function() {
    layer1.play(1);
    layer2.play(1);
    viewAnimeIcon()
  }, 2500);

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

let modalTriggerProfile = $('.cd-modal-trigger.profile'),
  modalTriggerSpeciality = $('.cd-modal-trigger.speciality'),
  modalTriggerPhotographs = $('.cd-modal-trigger.photographs'),
  transitionLayer = $('.cd-transition-layer'),
  transitionBackground = transitionLayer.children(),
  modalWindowProfile = $('.cd-modal.profile'),
  modalWindowSpeciality = $('.cd-modal.speciality'),
  modalWindowPhotographs = $('.cd-modal.photographs');

let frameProportion = 1.78, //png frame aspect ratio
  frames = 25, //number of png frames
  resize = false;

//set transitionBackground dimentions
setLayerDimensions();
$(window).on('resize', function() {
  if (!resize) {
    resize = true;
    (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300): window.requestAnimationFrame(setLayerDimensions);
  }
});

//open modal window
modalTriggerProfile.on('click', function(event) {
  event.preventDefault();
  transitionLayer.addClass('visible opening');
  let delay = ($('.no-cssanimations').length > 0) ? 0 : 600;
  setTimeout(function() {
    modalWindowProfile.addClass('visible');
  }, delay);
});
modalTriggerSpeciality.on('click', function(event) {
  event.preventDefault();
  transitionLayer.addClass('visible opening');
  let delay = ($('.no-cssanimations').length > 0) ? 0 : 600;
  setTimeout(function() {
    modalWindowSpeciality.addClass('visible');
  }, delay);
});
modalTriggerPhotographs.on('click', function(event) {
  event.preventDefault();
  transitionLayer.addClass('visible opening');
  let delay = ($('.no-cssanimations').length > 0) ? 0 : 600;
  setTimeout(function() {
    modalWindowPhotographs.addClass('visible');
  }, delay);
});
//close modal window
modalWindowProfile.on('click', '.modal-close', function(event) {
  event.preventDefault();
  transitionLayer.addClass('closing');
  modalWindowProfile.removeClass('visible');
  transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    transitionLayer.removeClass('closing opening visible');
    transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
  });
});
modalWindowSpeciality.on('click', '.modal-close', function(event) {
  event.preventDefault();
  transitionLayer.addClass('closing');
  modalWindowSpeciality.removeClass('visible');
  transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    transitionLayer.removeClass('closing opening visible');
    transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
  });
});
modalWindowPhotographs.on('click', '.modal-close', function(event) {
  event.preventDefault();
  transitionLayer.addClass('closing');
  modalWindowPhotographs.removeClass('visible');
  transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    transitionLayer.removeClass('closing opening visible');
    transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
  });
});

function setLayerDimensions() {
  let windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    layerHeight, layerWidth;

  if (windowWidth / windowHeight > frameProportion) {
    layerWidth = windowWidth;
    layerHeight = layerWidth / frameProportion;
  } else {
    layerHeight = windowHeight * 1.2;
    layerWidth = layerHeight * frameProportion;
  }

  transitionBackground.css({
    'width': layerWidth * frames + 'px',
    'height': layerHeight + 'px',
  });

  resize = false;
};

$('.link.web').on('click', function(event) {
  window.open('http://www.kakehashix84.com/')
})
$('.link.video').on('click', function(event) {
  window.open('https://www.youtube.com/watch?v=TyuOkobJHOw')
})
