// Import HTML Elements
const carousel = document.querySelector(".carousel");
const prevButton = carousel.querySelector(".previous-button");
const nextButton = carousel.querySelector(".next-button");
const contents = carousel.querySelector(".carousel__contents");
const dotsContainer = carousel.querySelector(".carousel__dots");
const dots = Array.from(dotsContainer.children);
const slides = Array.from(contents.children);

nextButton.addEventListener("click", () => {
  const currentSlide = contents.querySelector(".is-selected");
  const nextSlide = currentSlide.nextElementSibling;
  const destination = getComputedStyle(nextSlide).left;

  contents.style.left = `-${destination}`;
  currentSlide.classList.remove("is-selected");
  nextSlide.classList.add("is-selected");

  //Show previous button
  prevButton.removeAttribute("hidden");

  //   If there is a no next slide hide nextSlide Button
  !nextSlide.nextElementSibling ? nextButton.setAttribute("hidden", true) : true;

  // Highlight dot
  const currentDot = dotsContainer.querySelector(".is-selected");
  const nextDot = currentDot.nextElementSibling;
  currentDot.classList.remove("is-selected");
  nextDot.classList.add("is-selected");
});

prevButton.addEventListener("click", () => {
  const currentSlide = contents.querySelector(".is-selected");
  const prevSlide = currentSlide.previousElementSibling;
  const destination = getComputedStyle(prevSlide).left;

  contents.style.left = `-${destination}`;
  currentSlide.classList.remove("is-selected");
  prevSlide.classList.add("is-selected");

  // Show next button
  nextButton.removeAttribute("hidden");

  // If there is no previous slide hide the prevSlide Button
  !prevSlide.previousElementSibling ? prevButton.setAttribute("hidden", true) : true;

  // Highlight dot
  const currentDot = dotsContainer.querySelector(".is-selected");
  const previousDot = currentDot.previousElementSibling;
  currentDot.classList.remove("is-selected");
  previousDot.classList.add("is-selected");
});

// Adding Functionality to the Dots
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    let clickedDotIndex;

    for (const dotIndex of dots) {
      dots.indexOf(dotIndex) === dots.indexOf(dot)
        ? (clickedDotIndex = dots.indexOf(dotIndex))
        : false;
    }

    const slideToShow = slides[clickedDotIndex];
    const destination = getComputedStyle(slideToShow).left;
    contents.style.left = `-${destination}`;

    // need to update the location of the is-selected class.
    // (Without this, our previous and next buttons will not work).
    slides.forEach((slide) => slide.classList.remove("is-selected"));
    slideToShow.classList.add("is-selected");

    dots.forEach((d) => d.classList.remove("is-selected"));
    dot.classList.add("is-selected");

    // Show / hide buttons
    if (clickedDotIndex === 0) {
      prevButton.setAttribute("hidden", true);
      nextButton.removeAttribute("hidden");
    } else if (clickedDotIndex === dots.length - 1) {
      prevButton.removeAttribute("hidden");
      nextButton.setAttribute("hidden", true);
    } else {
      prevButton.removeAttribute("hidden");
      nextButton.removeAttribute("hidden");
    }
  });
});

// Positing the slides with JS
const slideWidth = slides[0].getBoundingClientRect().width;

slides[0].style.left = `${slideWidth * 0}px`;
slides[1].style.left = `${slideWidth * 1}px`;
slides[2].style.left = `${slideWidth * 2}px`;

slides.forEach((slide, index) => {
  slide.style.left = `${slideWidth * index}px`;
});
