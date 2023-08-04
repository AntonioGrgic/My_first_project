/*************************************************************/
//Animacija hamburger menia
/*************************************************************/

let navToggle = document.querySelector('.nav-toggle')
let bars = document.querySelectorAll('.bar')
let menu = document.querySelector(`.menu`)

function toggleHamburger(e) {
  bars.forEach(bar => bar.classList.toggle('x'))
  menu.classList.toggle(`show`)
}

navToggle.addEventListener('click', toggleHamburger)

/*************************************************************/
//Paralaksa
/*************************************************************/

window.addEventListener("scroll", function() {
  parallax(".parallax-header", 0.8);
  parallax(".parallax-section", 0.1);
  parallax(".parallax-footer", 0.1); 
});

function parallax(element, speed) {
  const scrolled = window.scrollY;
  const parallaxElements = document.querySelectorAll(element);

  for (let i = 0; i < parallaxElements.length; i++) {
    const position = scrolled * speed;
    parallaxElements[i].style.transform = `translateY(${position}px)`;
  }
}

/*************************************************************/
// scroll button(strelica dolje)
/*************************************************************/

function scrollToNextSection(event) {
  event.preventDefault(); 
  const nextSection = document.querySelector(".next-section");
  nextSection.scrollIntoView({ behavior: "smooth" });
}

// event listener za scroll button
document.addEventListener('DOMContentLoaded', function() {
  const scrollButton = document.querySelector(".scroll-button");
  if (scrollButton) {
      scrollButton.addEventListener("click", scrollToNextSection);
  }
});

/*************************************************************/
//Galerija yolo
/*************************************************************/

function showImage(navText) {
  const imageElement = document.getElementById('gallery-image');
  let imagePath = '';

  switch (navText) {
      case 'Ship Specs':
          imagePath = 'Assets/Img/Yolo/Frame.png';
          break;
      case 'Sun deck':
          imagePath = 'Assets/Img/Yolo/Blueprint3.png';
          break;
      case 'Main deck':
          imagePath = 'Assets/Img/Yolo/Blueprint4.png';
          break;
      case 'Below deck':
          imagePath = 'Assets/Img/Yolo/Blueprint6.png';
          break;
      default:
          imagePath = 'Assets/Img/Yolo/Frame.png';
  }

  imageElement.src = imagePath;
}

// event listener za navigation link
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
  });

  showImage('Ship Specs');
  document.querySelector('.nav-item:first-child').classList.add('active');
});

function handleNavClick(event) {
  event.preventDefault(); 
  const navText = event.target.textContent;
  showImage(navText);

  // Remove active sa svih linkova i staviti active status na target
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.parentNode.classList.remove('active');
  });
  event.target.parentNode.classList.add('active');
}

/*************************************************************/
//Slider
/*************************************************************/

const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

// Funkcija kalkulacije slajda
function calculateSlideWidth() {
  return slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginLeft);
}

// update slider
function updateSlider() {
  const slideWidth = calculateSlideWidth();
  slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  updateButtons();
}

//  update prevButton i nextButton stanja
function updateButtons() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
}

// Event listener za prevButton click
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

// Event listener za nextButton click
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});
// Variables for tracking cursor movement
let isDragging = false;
let startPosX = 0;
let currentTranslateX = 0;

// Event listener for mousedown on the slides container
slidesContainer.addEventListener('mousedown', (event) => {
  isDragging = true;
  startPosX = event.clientX;
  currentTranslateX = getCurrentTranslateX();
});

// Event listener for mousemove on the document
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const diffX = event.clientX - startPosX;
    const slideWidth = calculateSlideWidth();
    const newTranslateX = currentTranslateX + diffX;
    slidesContainer.style.transform = `translateX(${newTranslateX}px)`;
  }
});

// Event listener for mouseup on the document
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    const slideWidth = calculateSlideWidth();
    const dragThreshold = slideWidth / 4;
    const diffX = event.clientX - startPosX;
    if (diffX < -dragThreshold) {
      currentIndex = (currentIndex + 1) % slides.length;
    } else if (diffX > dragThreshold) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlider();
  }
});

// Helper function to get the current translateX value of the slides container
function getCurrentTranslateX() {
  const transformMatrix = new WebKitCSSMatrix(window.getComputedStyle(slidesContainer).getPropertyValue('transform'));
  return transformMatrix.m41;
}



updateSlider();

/*************************************************************/
//DRUGI SLIDER
/*************************************************************/

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const slidesContainer = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slides > div');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentSlide = 0;

  function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 50}%)`;
  }

  function updateButtons() {
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
    updateButtons();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    updateButtons();
  }

  // Event listeners for prev/next buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

 
  updateButtons();
});



