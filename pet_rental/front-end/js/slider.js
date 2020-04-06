var slideIndex = 1; // Define starting point slide counter
showSlides(slideIndex); // loads showSlides funtion with slideIndex as given parameter

// NEXT/PREVIOUS CONTROLS
function plusSlides(n) {
  showSlides(slideIndex += n); // "n" is given by html 'onclick' function call
}

// THUMBNAIL IMAGE CONTROLS  --> Unused at the moment
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }


// SHOW HOMEPAGE SLIDES
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1 // Resets slide counter to default starting point when end of existing slides is reached
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; // Hides that specific slide
  }
  slides[slideIndex-1].style.display = "block"; // Shows that specific slide
}
