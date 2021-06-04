'use strict';

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/*



//SELECTING ELEMENTS

//console.log(document.documentElement); //document itself is not a DOM object.
//if it is needed to apply smth to the entire document, document.documentElement
//has to be selected
//console.log(document.head);
//console.log(document.body);
//Selectors for head and body are not needed

const header = document.querySelector('.header'); //return the first element matching the selector
const allSections = document.querySelectorAll('.section'); //all elements with this class
console.log(allSections); //returns a node list
//query selector is available not only on the whole document, but also on elements due to inheritance
//very useful when the access to child elements is needed

document.getElementById('section--1'); // . is not needed, . only for query selector methods
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //returns an html collection.
//it means that if DOM changes, the collecting updates automatically.
//Node list does not have this property
console.log(document.getElementsByClassName('btn')); //also returns a live html collection

//CREATING AND INSERTING ELEMENTS
//.insertAdjacentHTML
const message = document.createElement('div'); //returns a DOM element
//it is just a DOM object that is not on the page yet(and not the DOM tree)
//the methods are the same with the object returned by the query selector
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie"> Got it! </button>';
header.prepend(message);
//prepend added message as the first child of header element
header.append(message);
//element was inserted onse. It is a live element inside the DOM
//and it cannot be at multiple places at the same time
//append moved element from being the first child to being the last child

//if several elements need to be appended, a cloneNode method should be user
//header.append(message.cloneNode(true));

//two more methods to insert are before and after
//header.before(message);
//header.after(message);

//DELETING ELEMENTS
//lets delete a cookie element as "Got it!" button is clicked

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //in the past only child elements could be removed
    //it had to be done this way
    //message.parentElement.removeChild(message);
  });

// Styles, attributes and classes
//STYLES
message.style.backgroundColor = `#37383d`;
message.style.width = '120%';
//this way styles are set directly in the DOM, which is called inline styles

//That would be logical if console.log(message.style.height) would give the value of specified property
//however, it does not work this way. It would work only for style set inline.
//In this case, only for width and backgroudColor
console.log(message.style.color); //prints nothing
console.log(message.style.width);
//if we want to get style anyway, another function has to be used
//console.log(getComputedStyle(message)); //returns a huge list of properties
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
//even if the property is not defined anywhere, browser still needs to compute it

//suppose we want to increase the height of the message
//message.style.height = getComputedStyle(message).height + 40 + 'px'; //will not work because height is already defined in px
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//now will work with css custom properties. Practically, they are css variables
//:root - equivalent to a document in js
document.documentElement.style.setProperty('--color-primary', 'oranged');

//atributes
//for standart attributes:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); //gives a relative path
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
//had to be class, but for historical reason it is className
//if property is not standard, will give undefined
//Non-standart
console.log(logo.designer); //does not work, gives indefined
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
//for full path to source getAttribute has to be used
logo.getAttribute('src');
//the same is true for href

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//DATA ATTRIBUTES
//these are attributes starting with word data
console.log(logo.dataset.versionNumber); //transormed from data-version-number="3.0"

//Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); //not includes

//Don't use because it overwrites all existing classes
//and allows to put only one class on the element
logo.className = 'jonas';

//implement scrolling when the button is pressed
//const btnScrollTo = document.querySelector('.btn--scroll-to');
//const section1 = document.querySelector('#section--1');

//btnScrollTo.addEventListener('click', function (e) {
//firstly get coordinates of the elements we want to scroll to
//  const s1coords = section1.getBoundingClientRect();
*/
/*
  
  console.log(
    'Coordinates of element we want to scroll to(section1):',
    s1coords
  );

  //e.target will give the coordinates of a clicked object
  console.log(
    'Coordiantes of the scrolling button',
    e.target.getBoundingClientRect()
  );

  //current scroll positions:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  //read height and width of the viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
*/

//Fast scrolling, works only if window looks on the top on tha page
//it is happening because top is relative to the viewport, not to the top of the page
//if we want to make it correct, a distance to the top of tha page should ba added
/*window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );*/
//smooth scrolling. In this case an object should be given to the function

//old way:
/*window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });*/

//modern way:
//  section1.scrollIntoView({ behavior: 'smooth' });
//});

//const h1 = document.querySelector('h1');

//https://developer.mozilla.org/ru/docs/Web/Events
//mouse enter fires when the mouse enters a certain area

/*

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  //it is possible to remove an event listener:
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//we can also remove an event listener after, for example, certain timer
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3 * 1000);
//another way to attach an event listener to an element.
//however, addEventListener is prefered. it allows to add several functions to one event,
//while in case with another option the new function will si,ply override the new one
h1.onmouseenter = function (e) {
  alert('onmouseenter: Great! You are reading the heading :D');
};
*/

//EVENT PROPAGATION AND BUBBLING

// rgb(255,255,255)
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
*/
/*
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target);
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  //e.stopPropagation();
});

//normally propagation phase is not that interesting ans bubbling phase.
//however, if it is needed to receive an event during the propagation phase,
//the third parameter to addEventListener has to be added
//in case if the 3rd parameter is true, an event will be listened not during the bubbling phase,
//but during the capturing phase
//normally propagation phase is not used. The only reason whyit is implemented now is historical
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  true
);
*/

/*

//DOM traversing
const h1 = document.querySelector('h1');
//Going downwards. Can be not direct children
console.log(h1.querySelectorAll('.highlight'));
//for direct children:
console.log(h1.childNodes); //gives every single node of every single type
//for elements themselves:
console.log(h1.children); //gives a life collection,
//which updates automatically in case of changes in DOM
//sets the color of the first child, which in this case contains a word "banking", to white
//h1.firstElementChild.style.color = 'white';
//h1.lastElementChild.style.color = 'orangered';

//going upwards
//for direct parents:
console.log(h1.parentNode);
console.log(h1.parentElement);
//works as quey selector. Returns only the closest element
//VERY IMPORTANT
//h1.closest('.header').style.background = 'var(--gradient-secondary)';
//if the method is called on the class to which an object belongs,
//when it will return the element itself
//h1.closest('h1').style.background = 'var(--gradient-secondary)';

//querySelector and closest are in fact just the opposite methods.
//querySelector returns children, while closest returns an element itself or parents

//goind sideways: siblings
//for elements:
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
//for nodes:
console.log(h1.previousSibling);
console.log(h1.nextSibling);
//to get all siblings:
console.log(h1.parentElement.children);
*/
//makes all siblings that are not h1 50% smaller:
/*
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/
//OBSERVER API
/*
const obsCallback = function (entries, observer) {
  //entries:
  entries.forEach(entry => {
    console.log(entry);
  });
  //observer:
};

const obsOptions = {
  root: null, //an element the target is intersecting.
  //If null, we will be observing target element intersecting with entire viewport
  threshold: [0, 0.2], //percentage of intersection at which an observer will be called. 0.1 for 10%
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
//LIFECYCLE OF DOM EVENTS
//DOMContentLoaded event is fired when thw HTML is completely parsed
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML Parsed and DOM tree built!', e);
});

//load event is fired by the window when all content(not only HTML, but images and css files) is loaded

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//fired when user is about to leave the page
/*
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
