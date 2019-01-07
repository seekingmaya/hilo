import "../scss/main.scss";
import '../img/favicon.ico';
require('intersection-observer');
import { generateSlides, shuffledData } from './generateSlides';

generateSlides();
window.addEventListener('load', function () {
    let sliderLogo = document.querySelectorAll(".logo__wrapper");
    let container = document.querySelector(".container");
    let slider = document.querySelector(".slider__content");
    let sliderParent = document.querySelector(".slider");
    let slides = document.querySelectorAll(".slide");
    let cube = document.querySelector('.d__cube');
    let back = document.querySelector(".d__cube-face--back");
    let sliderWrapper = document.querySelector(".slider__wrapper");
    let timerId;
    let slideIndex = 0;
    let background1 = document.querySelector(".container__background--1");
    let background2 = document.querySelector(".container__background--2");
    let intro = document.querySelector(".intro");
    let scrollNav = document.querySelectorAll(".nav__item");
    let backgroundFirst = true;
    let artists = document.querySelectorAll(".artist__item");
    let navScrollInProgress = false;
    let desktop = window.matchMedia("(min-width: 1024px)");
    let tablet = window.matchMedia(`(max-width: 1023px),(min-device-width: 1024px) and (max-device-width: 1024px)
    ,(min-device-width: 1366px) and (max-device-width: 1366px)`);
    let portraitOrientation = window.matchMedia("(orientation: portrait)");
    let landscapeOrientation = window.matchMedia("(orientation: landscape)");
    let landscape = false;


    //intro animation

    function init(tabletMediaQuery, portraitMediaQuery) {
        if (!tabletMediaQuery.matches) {
            intro.addEventListener("animationend", introAnimation);
            let currentSlide = document.querySelector(".show-slide");
            currentSlide.addEventListener("animationend", () => {

                currentSlide.style.animation = "initial";
                changeBorder(0);
                runTimer();
                setTimeout(function () {
                    sliderParent.classList.add("slider--big");
                    cube.classList.add("d__cube--big");
                    checkTimer();
                }, 4850);
            }
            );
        }
        else {
            tabletAndMobileAnimation();
        }

        portraitOrientation.addListener(portraitHandler);
        landscapeOrientation.addListener(landscapeHandler);
        tablet.addListener(checkInteraction);

    }

    init(tablet, portraitOrientation);

    function introAnimation() {
        intro.style.animation = "initial";
        document.documentElement.style.setProperty('--edge-width', "5px");
        intro.removeEventListener("animationend", introAnimation);
    }

    function tabletAndMobileAnimation() {
        let currentSlide = document.querySelector(".show-slide");
        currentSlide.style.animation = "initial";
        runTimer();
        checkInteraction();
    }

    function portraitHandler(mq) {
        if (landscape && tablet.matches) {
            checkInteraction();
            landscape = false;
        }

    }


    function landscapeHandler(mq) {
        landscape = true;
    }


    function checkInteraction() {
        window.addEventListener('click', detectInteraction);
        window.addEventListener('touchstart', detectInteraction);
        slider.addEventListener('wheel', detectInteraction);
    }



    function detectInteraction() {
        clearInterval(timerId);
        slides.forEach(slide => slide.classList.add("slide--visible"));
        window.removeEventListener('click', detectInteraction);
        window.removeEventListener('touchstart', detectInteraction);
        slider.removeEventListener('wheel', detectInteraction);
    }


    //show info
    sliderLogo.forEach(logo => {
        logo.addEventListener('click', (e) => {
            container.classList.toggle("show-info");
        }
        );
    }
    );



    //scroll to slide when nav clicked
    scrollNav.forEach(el => {
        el.addEventListener('click', e => {
            if (TweenLite) {
                e.preventDefault();
                let n = parseInt(el.href.split("#slide")[1]);
                let topOffset = slider.clientHeight * n;
                navScrollInProgress = true;
                //prevents nav dots for slides that's not the tagret lighting up when user clicks on nav
                TweenLite.to(slider, 1, { scrollTo: topOffset, onComplete: () => navScrollInProgress = false });
                scrollNav.forEach(nav => nav.classList.remove("scrolled"));
                el.classList.add("scrolled");
            }
        }
        );
    }
    );

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            let artist = artists[parseInt(entry.target.dataset.id)];
            if (entry.intersectionRatio >= 0.6) {
                artists.forEach(artist => {
                    artist.style.zIndex = "-1";
                    artist.style.opacity = "0";
                });
                artist.style.zIndex = "1";
                artist.style.opacity = "1";
                slideIndex = parseInt(entry.target.dataset.id);
                let newSlide = slides[slideIndex];
                if (!newSlide.classList.contains("show-slide")) {
                    let currentSlide = document.querySelector(".show-slide");
                    currentSlide.classList.remove("show-slide");
                    newSlide.classList.add("show-slide");
                } //show active nav when corresponding slide is visible
                if (!navScrollInProgress) {
                    scrollNav.forEach(nav => {
                        nav.classList.remove("scrolled");
                        if (entry.target.id == nav.href.split("#")[1]) {
                            nav.classList.add("scrolled");
                        }
                    }
                    );
                }
            }
        }
        );
    }
        , {
            threshold: 0.6
        }
    );
    slides.forEach((element) => intersectionObserver.observe(element));
    function moveLeft(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            // if (e) e.stopPropagation();
            let newIndex = currentNumber > 0 ? currentNumber - 1 : slides.length - 1;
            let newSlide = slides[newIndex];
            current.classList.remove("show-slide");
            if (TweenLite) {
                TweenLite.to(slider, 0, {
                    scrollTo: slider.clientHeight * newIndex
                }
                );
            }
            newSlide.classList.add("show-slide");
            setTimeout(changeBorder, 850, newIndex);
        }
    } //show slide to the right
    function moveRight(e) {
        let current = document.querySelector(".show-slide");
        let currentNumber = parseInt(current.dataset.id);
        if (current) {
            let newIndex = currentNumber < slides.length - 1 ? currentNumber + 1 : 0;
            let newSlide = slides[newIndex];
            current.classList.remove("show-slide");
            if (TweenLite) {
                setTimeout(() => {
                    TweenLite.to(slider, 0, {
                        scrollTo: slider.clientHeight * newIndex
                    }
                    );
                }
                    , 850);
            }
            newSlide.classList.add("show-slide");
            setTimeout(changeBorder, 850, newIndex);
        }
    } //change cubes edge background when gallary image changes
    function changeBorder(newIndex) {
        let slide = shuffledData[newIndex];
        let url = `url('../img/${slide.firstname} ${slide.lastname}.png')`;
        if (!backgroundFirst) {
            background1.style.backgroundImage = url;
            background1.style.backgroundPosition = slide.backgroundPosition;
            background1.style.opacity = '1';
            background2.style.opacity = '0';
        }
        else {
            background2.style.backgroundImage = url;
            background2.style.backgroundPosition = slide.backgroundPosition;
            background1.style.opacity = '0';
            background2.style.opacity = '1';
        }
        backgroundFirst = !backgroundFirst;
    } //change slides every 4secs
    function runTimer() {
        timerId = setInterval(() => {
            moveRight();
        }
            , 4000);
    }
    function checkTimer() {
        if (cube.classList.contains("d__cube--big")) {
            clearInterval(timerId);
        }
        else {
            clearInterval(timerId);
            runTimer();
        }
    } //zoom in 
    sliderWrapper.addEventListener('click', zoom);
    function zoom() {
        sliderParent.classList.toggle("slider--big");
        cube.classList.toggle("d__cube--big");
        checkTimer();
        if (!cube.classList.contains("d__cube--big")) {
            changeBorder(parseInt(document.querySelector(".show-slide").dataset.id));
        }
    }
    //change slides on key press
    window.addEventListener('keydown', (e) => {
        if (e.defaultPrevented) {
            return; // Do nothing if the event was already processed
        }
        switch (e.key) {
            case "Left": // IE/Edge specific value
                moveLeft(e);
                checkTimer();
            case "ArrowLeft": moveLeft(e);
                checkTimer();
                break;
            case "Right": // IE/Edge specific value
                moveRight(e);
                checkTimer();
            case "ArrowRight": moveRight(e);
                checkTimer();
                break;
            case " ": zoom(e);
                break;
            case "Esc": // IE/Edge specific value
                zoom(e);
            case "Escape": // Do something for "esc" key press.
                zoom(e);
                break;
            default: return; // Quit when this doesn't handle the key event.
        } // Cancel the default action to avoid it being handled twice
        event.preventDefault();
    }
        , true);
}

);