import "../scss/main.scss";
import "../img/favicon.ico";
require("intersection-observer");
import { generateSlides, shuffledData } from "./generateSlides";
import BezierEasing from "./BezierEasing";
import { positionSlider } from "./positionSlider";

if (
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true
) {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
} else {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

generateSlides();
document.addEventListener("DOMContentLoaded", function() {
  let sliderLogo = document.querySelectorAll(".logo__wrapper");
  let container = document.querySelector(".container");
  let slider = document.querySelector(".slider__content");
  let sliderParent = document.querySelector(".slider");
  let slides = document.querySelectorAll(".slide");
  let prevSlideIndex = 0;
  let topOffset = 0;
  let cube = document.querySelector(".d__cube");
  let back = document.querySelector(".d__cube-face--back");
  let sliderWrapper = document.querySelector(".slider__wrapper");
  let timerId;
  let slideIndex = 0;
  let artistTimeout;
  let background1 = document.querySelector(".container__background--1");
  let background2 = document.querySelector(".container__background--2");
  let blackCube = document.querySelector(".container__background--3");
  let intro = document.querySelector(".intro");
  let scrollNav = document.querySelectorAll(".nav__item");
  let backgroundFirst = true;
  let artists = document.querySelectorAll(".artist__item");
  let navScrollInProgress = false;
  let landscape = window.matchMedia("(orientation: landscape)");
  let portrait = window.matchMedia("(orientation: portrait)");
  let tablet = window.matchMedia(`(max-width: 1024px),(min-device-width: 1024px) and (max-device-width: 1024px)
    ,(device-width: 1366px) and (device-height: 1024px) `);

  function init() {
    if (!tablet.matches) {
      //intro animation
      intro.addEventListener("animationend", introAnimation);
      let currentSlide = document.querySelector(".show-slide");
      currentSlide.addEventListener("animationstart", () => {
        changeBorder(0);
      });
      currentSlide.addEventListener("animationend", () => {
        currentSlide.style.animation = "initial";
        currentSlide.style.opacity = "1";
        runTimer();
        setTimeout(function() {
          sliderParent.classList.add("slider--big");
          cube.classList.add("d__cube--big");
        }, 20);
      });
    } else {
      tabletAndMobileAnimation();
    }

    checkInteraction();
    positionSlider(slider);
  }

  init();

  function introAnimation() {
    intro.style.animation = "initial";
    document.documentElement.style.setProperty("--edge-width", "5px");
    intro.removeEventListener("animationend", introAnimation);
  }

  function tabletAndMobileAnimation() {
    let currentSlide = document.querySelector(".show-slide");
    currentSlide.style.animation = "initial";
    intro.style.animation = "initial";
    blackCube.style.animation = "initial";
    document.documentElement.style.setProperty("--edge-width", "5px");
    runTimer();
  }

  function checkInteraction() {
    window.addEventListener("click", detectInteraction);
    window.addEventListener("touchstart", detectInteraction);
    slider.addEventListener("wheel", detectInteraction);
  }

  function detectInteraction() {
    clearInterval(timerId);
    slider.classList.add("slider--slides-visible");
    window.removeEventListener("click", detectInteraction);
    window.removeEventListener("touchstart", detectInteraction);
    slider.removeEventListener("wheel", detectInteraction);
  }

  //show info
  sliderLogo.forEach(logo =>
    logo.addEventListener("click", e => {
      container.classList.toggle("show-info");
    })
  );

  //scroll to slide when nav clicked
  scrollNav.forEach(el => {
    el.addEventListener("click", e => {
      if (TweenLite) {
        e.preventDefault();
        detectInteraction();
        let n = parseInt(el.href.split("#slide")[1]);
        // prevOffset = Number.parseFloat(slider.clientHeight * slideIndex / slider.scrollHeight).toFixed(2);
        navScrollInProgress = true;
        //prevents nav dots for slides that's not the tagret lighting up when user clicks on nav
        TweenLite.to(slider, 1, {
          scrollTo: n * slider.clientHeight,
          onComplete: () => (navScrollInProgress = false)
        });
        activateNav(el);

        changeBorderifZoomedOut(n);

        showArtistName(n);
      }
    });
  });

  function activateNav(nav) {
    scrollNav.forEach(nav => nav.classList.remove("scrolled"));
    nav.classList.add("scrolled");
  }

  function showArtistName(index) {
    let currentArtist = artists[prevSlideIndex];

    currentArtist.style.zIndex = "-1";

    animate({
      draw(progress) {
        currentArtist.style.opacity = 1 - progress;
      }
    });

    artists.forEach(el => {
      el.style.opacity = "0";
      el.style.zIndex = "-1";
    });

    let newArtist = artists[index];
    newArtist.style.zIndex = "1";

    clearTimeout(artistTimeout);

    artistTimeout = setTimeout(() => {
      animate({
        draw(progress) {
          newArtist.style.opacity = progress;
        }
      });
    }, 850);
  }

  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        let currentSlide = document.querySelector(".show-slide");

        if (entry.intersectionRatio >= 0.6) {
          if (!navScrollInProgress) {
          }

          let slideIndex = parseInt(entry.target.dataset.id);
          let newSlide = slides[slideIndex];

          if (!newSlide.classList.contains("show-slide")) {
            currentSlide.classList.remove("show-slide");
            newSlide.classList.add("show-slide");

            changeBorderifZoomedOut(slideIndex);
          }
          //show active nav when corresponding slide is visible
          if (!navScrollInProgress) {
            let nav = document.querySelector(`[href='#slide${slideIndex}']`);
            activateNav(nav);

            showArtistName(slideIndex);
          }

          prevSlideIndex = slideIndex;
        }
      });
    },
    { threshold: 0.6 }
  );

  slides.forEach(element => intersectionObserver.observe(element));

  //animate transition

  function animate(options) {
    let start = performance.now();

    let duration = 850;

    let calcBezier = BezierEasing(0.455, 0.03, 0.515, 0.955);

    function timing(timeFraction) {
      return calcBezier(timeFraction);
    }

    requestAnimationFrame(function animate(time) {
      // timeFraction от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing(timeFraction);

      options.draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  function moveUp(e) {
    let current = document.querySelector(".show-slide");
    let currentNumber = parseInt(current.dataset.id);
    if (current) {
      let newIndex = currentNumber > 0 ? currentNumber - 1 : slides.length - 1;
      let newSlide = slides[newIndex];
      current.classList.remove("show-slide");

      animate({
        draw(progress) {
          current.style.opacity = 1 - progress;
        }
      });
      if (TweenLite) {
        setTimeout(() => {
          TweenLite.to(slider, 0, { scrollTo: slider.clientHeight * newIndex });

          animate({
            draw(progress) {
              newSlide.style.opacity = progress;
            }
          });
        }, 850);
      }
      newSlide.classList.add("show-slide");

      changeBorderifZoomedOut(newIndex);
    }
  }

  //show slide lower
  function moveDown(e) {
    let current = document.querySelector(".show-slide");
    let currentNumber = parseInt(current.dataset.id);
    if (current) {
      let newIndex = currentNumber < slides.length - 1 ? currentNumber + 1 : 0;
      let newSlide = slides[newIndex];
      current.classList.remove("show-slide");

      animate({
        draw(progress) {
          current.style.opacity = 1 - progress;
        }
      });

      if (TweenLite) {
        setTimeout(() => {
          TweenLite.to(slider, 0, { scrollTo: slider.clientHeight * newIndex });

          animate({
            draw(progress) {
              newSlide.style.opacity = progress;
            }
          });
        }, 850);
      }

      newSlide.classList.add("show-slide");

      changeBorderifZoomedOut(newIndex);
    }
  }

  //change cubes edge background when gallary image changes

  function changeBorderifZoomedOut(index) {
    //check if zoomed out and not tablet
    if (
      !cube.classList.contains("d__cube--big") &&
      document.documentElement.clientWidth != back.clientWidth
    ) {
      setTimeout(changeBorder, 850, index);
    }
  }

  function changeBorder(newIndex) {
    let slide = shuffledData[newIndex];
    let url = `url('../img/${slide.firstname} ${slide.lastname}.png')`;
    if (!backgroundFirst) {
      background1.style.backgroundImage = url;
      background1.style.backgroundPosition = slide.backgroundPosition;
      background1.style.opacity = "1";
      background2.style.opacity = "0";
    } else {
      background2.style.backgroundImage = url;
      background2.style.backgroundPosition = slide.backgroundPosition;
      background1.style.opacity = "0";
      background2.style.opacity = "1";
    }
    backgroundFirst = !backgroundFirst;
  }

  //change slides every 4secs
  function runTimer() {
    timerId = setInterval(() => {
      moveDown();
    }, 4000);
  }
  function stopTimer() {
    clearInterval(timerId);
  }

  //zoom in
  sliderWrapper.addEventListener("click", zoom);

  function zoom() {
    sliderParent.classList.toggle("slider--big");
    cube.classList.toggle("d__cube--big");

    if (
      !cube.classList.contains("d__cube--big") &&
      document.documentElement.clientWidth != back.clientWidth
    ) {
      let current = document.querySelector(".show-slide");
      let currentNumber = parseInt(current.dataset.id);
      changeBorder(currentNumber);
    }
  }
  //change slides on key press
  window.addEventListener(
    "keydown",
    e => {
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      switch (e.key) {
        case "Up": // IE/Edge specific value
          moveUp(e);
          stopTimer();
        case "ArrowUp":
          moveUp(e);
          stopTimer();
          break;
        case "Down": // IE/Edge specific value
          moveDown(e);
          stopTimer();
        case "ArrowDown":
          moveDown(e);
          stopTimer();
          break;
        case " ":
          zoom(e);
          stopTimer();
          break;
        case "Esc": // IE/Edge specific value
          stopTimer();
          zoom(e);
        case "Escape": // Do something for "esc" key press.
          stopTimer();
          zoom(e);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      } // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true
  );
});
