import data from "./data.js";

const shuffle = array => [...array].sort(() => Math.random() - 0.5);

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

let shuffledData = shuffle(data);

function generateSlides() {
  let str = "";
  let artistStr = "";
  let navStr = "";
  let infoStr = "";
  let slider = document.querySelector(".slider__content");
  let artist = document.querySelector(".artist");
  let nav = document.querySelector(".nav");
  let info = document.querySelector(".info__artists");

  shuffledData.forEach((el, index) => {
    str += `<div id="slide${index}" data-id="${index}" class="slide ${
      index == 0 ? "show-slide" : ""
    }">
                    <div class="slide__img" style="background-image:url('../img/${
                      el.firstname
                    } ${el.lastname}.png');">
                        <div class="slide__img slide__img--desktop" style="background-image:url('../img/${
                          el.firstname
                        } ${el.lastname}.png') !important;width:${
      el.desktopSize
    };">
                        </div>
                    </div>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(
      el.lastname
    )}.pdf" class="slide__artist slide__artist--mobile" download>
                        ${el.firstname.toUpperCase()} ${el.lastname.toUpperCase()}
                    </a>
                    <a href="../assets/${capitalize(el.firstname)} ${capitalize(
      el.lastname
    )}.pdf" class="slide__portfolio slide__portfolio--mobile" download>
                    Download Portfolio
                    </a>
                </div > `;

    artistStr += `<div class='artist__item' id='artist${index}'>
                        <a href="../assets/${capitalize(
                          el.firstname
                        )} ${capitalize(
      el.lastname
    )}.pdf" class="artist__name" download>
                        ${el.firstname.toUpperCase()} ${el.lastname.toUpperCase()}
                        </a>
                        <a href="../assets/${capitalize(
                          el.firstname
                        )} ${capitalize(
      el.lastname
    )}.pdf" class="artist__portfolio" download>
                            Download Portfolio
                        </a>
                    </div>`;

    navStr += `<a href='#slide${index}' class='nav__item'>
                        ${capitalize(el.lastname)}
                   </a>`;

    infoStr += `<a href="../assets/${capitalize(el.firstname)} ${capitalize(
      el.lastname
    )}.pdf" class="info__second-page-text" download>
                        ${capitalize(el.firstname)} ${capitalize(el.lastname)}
                    </a>`;
  });

  slider.innerHTML = str;

  artist.innerHTML = artistStr;

  nav.innerHTML = navStr;

  info.innerHTML = `<h2 class="info__header">
                            Artists
                        </h2>
                        ${infoStr}`;
}

export { generateSlides, shuffledData };
