'use strict';

//const { orangered } = require("color-name");

//const { fuchsia } = require("color-name");

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header= document.querySelector('.header');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


///smooth scrolling

const buttonScrollTo=document.querySelector('.btn--scroll-to');
const section1= document.querySelector('#section--1');
buttonScrollTo.addEventListener('click', function(e){
//   const s1coords= section1.getBoundingClientRect();
// window.scrollTo({
//   left:s1coords.left+window.pageXOffset,
//   top: s1coords.top+window.pageYOffset,
//   behavior: 'smooth' 
// });

section1.scrollIntoView({behavior:'smooth'})
});

///event handling

// const h1= document.querySelector('h1');

// const alertH1= function(e){
//   alert('Hey this is from event handler');

// }

// h1.addEventListener('mouseenter',alertH1);
// setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000);


///Generating random color

const randomInt= (min,max)=> 
 Math.floor(Math.random()*(max-min+1)+min);
 const randomColor= () =>
 `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

 document.querySelector('.nav__item').addEventListener('mouseenter',function(e){
   this.style.backgroundColor= randomColor();
 });

/////////////////page navigation

// document.querySelectorAll('.nav__link').forEach
// (function(el){
//   el.addEventListener('click',function(e){
//    e.preventDefault();
//     const id= this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// })

//////////////////////delegation
//1.add evene tlistener to common parent elemet
//2. determine which element originateed the event

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    e.preventDefault();
    const id= e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }

})


////Tabbed content

const tabs= document.querySelectorAll('.operations__tab');
const tabsContainer= document.querySelector('.operations__tab-container');
const tabsContent= document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked= e.target.closest('.operations__tab'); ///making sure we capture event when we click on span number
    //Guard clause
  if(!clicked) return;

  //removing contents
  tabs.forEach(t =>t.classList.remove
    ('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));


  //activate area
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});

/////menu fade anime
const nav=document.querySelector('.nav');

const handleHover= function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo= link.closest('.nav').querySelector('img');
  
    siblings.forEach(el=>{
      if(el!==link){
        el.style.opacity=this;
      }
    })
    logo.style.opacity=this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////sticky navigation
const initialCoords= section1.getBoundingClientRect();
window.addEventListener('scroll', function(e){
if (window.scrollY> initialCoords.top){
nav.classList.add('sticky')
}
else{
  nav.classList.remove('sticky');
}
})

///reveal sections
const allSections= document.querySelectorAll('.section');
const revealSection= function(entries, observer){
const [entry]= entries;
if(!entry.isIntersecting) return;
entry.target.classList.remove('section--hidden');
observer.unobserve(entry.target);
};

const sectionObserver= new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


////////lazy loading imgs
const imgTarget= document.querySelectorAll('img[data-src]');
const loadImg = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  ///replace placeholder img
  entry.target.src= entry.target.dataset.src;


  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
 
const imgObserver= new IntersectionObserver(loadImg,
  {
    root:null,
    threshold:0,
    rootMargin:'-200px',
  });

  imgTarget.forEach(img=> imgObserver.observe(img));
///////////

/////slider
const slides= document.querySelectorAll('.slide');
const btnLeft= document.querySelector('.slider__btn--left');
const btnRight= document.querySelector('.slider__btn--right');
const dotContainer= document.querySelector('.dots');
let curSlide= 0;
const maxSlide = slide.length;

// const slider= document.querySelector('.slider');
// slider.style.transform= 'scale(0.4) translateX(-800px)';
// slider.style.overflow='visible';

const createDots= function(){
  slides.forEach(function(s,i){
    dotContainer.insertAdjacentElement('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};
createDots();
const goToSlide= function(slide){
  slide.forEach((s,i)=> (s.style.transform=
    `translateX(${100 * (i-slide)}%)`));
};
goToSlide(0);

  ///next slide
  const nextSlide=function(){
    if(curSlide===maxSlide-1){
      curSlide=0;
    }else{
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide= function(){
    if(curSlide===0){
      curSlide=maxSlide-1;
    }else{
    curSlide--;}
    goToSlide(curSlide);
  }
  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);

  document.addEventListener('keydown',function(e){
    if(e.key='ArrowLeft') prevSlide();
    if(e.key='ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click',function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide}= e.target.dataset.slide;
    goToSlide(slide);
    }
  })




// //////////////////////////testing////////////
// console.log(document.documentElement);
// console.log(document.head);

// const allSections=document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons=document.getElementsByTagName('button');
// console.log(allButtons);

// document.getElementsByClassName('btn');

// ///creating and insering element

// const message=document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent = 'We try to increase usability';
// message.innerHTML='We try to increase usability <button class="btn btn--close-cookie"> Got it!</button>';

// ////header.prepend(message);
// //header.append(message.cloneNode(true));

// header.append(message);
// ////delete button

// document.querySelector('.btn--close-cookie').addEventListener('click', function(){
//   message.remove();
// })


//////////////////////////////////////////////

////styling

// message.style.backgroundColor='#37383d';
// message.style.width='120%';

// console.log(message.style.backgroundColor);

// message.style.height= Number.parseFloat(getComputedStyle(message).height,10) +30+'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');
// //document.body.style.setProperty('background-color', '#f39999');

// //atributes

// const logo= document.querySelector('.nav__logo');


// logo.alt='Beatutiful minimal logo';
// logo.setAttribute('company','Bankist');