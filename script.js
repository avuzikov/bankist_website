'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//section1.scrollIntoView({ behavior: 'smooth' });

//this solution is working, but it is not effecient. If there were
//10 thousand buttons, then 10 thousand copies of the same function would be created, which will
//negatively impact performance
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    //by default page will jump to corresponging section due to href in html.
    //in order to prevent it e.preventDefault(); is used
    e.preventDefault();
    //this.href will give the full path
    //get attribute is used because absolute URL is not needed in this case
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/
//Add event listener to common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    //not smooth:(
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//TABBED COMPONENT
//my implementation
/*
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains('operations__tab') &&
    !e.target.classList.contains('operations__tab--active')
  ) {
    tabs.forEach(function (el) {
      if (el.classList.contains('operations__tab--active')) {
        el.classList.remove('operations__tab--active');
      }
    });
    const btnNum = [...e.target.classList]
      .find(function (el) {
        return el.startsWith('operations__tab--');
      })
      .slice(-1); //if more than 9 buttons will not work
    document
      .querySelector('.operations__content--active')
      .classList.remove('operations__content--active');
    document
      .querySelector(`.operations__content--${btnNum}`)
      .classList.add('operations__content--active');
    e.target.classList.add('operations__tab--active');
  }
});
*/
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //fixes the problem with the case
  //if span element was clicked

  //Guard clause
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

//MENU FADE ANIMATION
const handleOver = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    //instead of moving up manually, closest method will be used
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleOver.bind(0.5));
nav.addEventListener('mouseout', handleOver.bind(1));

//STICKY NAVIGATION
/*
const initialCoords = section1.getBoundingClientRect();

//scroll event is not really efficient and should be avoided, but for the sake of example
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.y) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

//using INTERSECTION OBSERVER API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; //the same as entries[0]
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//REVEALING ELEMENTS ON SCROLL MY ATTEMPT TO SOLVE

//my solution for section1
/*
const sec1 = document.getElementById('section--1');

const sec1Revealing = function (entries) {
  sec1.classList.remove('section--hidden');
};

const section1Observer = new IntersectionObserver(sec1Revealing, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
section1Observer.observe(sec1);
*/

//REVEALING ELEMENTS ON SCROLL
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  //unobserving the section after revealing it
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //will return later. Now hidden for debiggung purpuses
  //section.classList.add('section--hidden');
});

//LAZY LOADING IMAGES
//Idea: two images of different quality. the smaller one is blurred with lazy-img class to hide low quality
//When scrolling approaches the picture change blurred one to a normal one

const imgTargets = document.querySelectorAll('img[data-src]'); //select all images which have property data-src

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  //unblur the image after loading
  entry.target.addEventListener('load', function (e) {
    e.preventDefault();
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //images will start loading a little bit earlier when user reaches them
});

imgTargets.forEach(img => imgObserver.observe(img));

//BUILDING A SLIDER COMPONENT
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
//some code to see how slider actually works

/*
//set scale to 0.3
slider.style.transform = 'scale(0.3)';
//make overflowed slides visible
slider.style.overflow = 'visible';
*/

//my implementation
/*
let slidesPosition = 0;
const moveSlides = function (direction) {
  slidesPosition += direction;
  slides.forEach(
    (s, i) =>
      (s.style.transform = `translateX(${
        (100 * (i + slidesPosition)) % (100 * slides.length)
      }%)`)
  );
};

btnLeft.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked left');
  moveSlides(-1);
});

btnRight.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked right');
  moveSlides(1);
});
*/
let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
};
const init = function () {
  createDots();
  goToSlide(curSlide);
  activateDot(curSlide);
};

init();
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
};

btnRight.addEventListener('click', function (e) {
  e.preventDefault();
  nextSlide();
  goToSlide(curSlide);
  activateDot(curSlide);
});

btnLeft.addEventListener('click', function (e) {
  e.preventDefault();
  prevSlide();
  goToSlide(curSlide);
  activateDot(curSlide);
});

//arrows

document.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.key === 'ArrowLeft') {
    prevSlide();
    goToSlide(curSlide);
    activateDot(curSlide);
  }
  if (e.key === 'ArrowRight') {
    nextSlide();
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    curSlide = slide;
    goToSlide(curSlide);
    activateDot(curSlide);
  }
});
