export function positionSlider(slider) {
    let prevOffset = 0;

    let mediaQueryList = window.matchMedia("(orientation: portrait)");

    mediaQueryList.addListener(preserveSliderPosition);

    slider.addEventListener('scroll', () => {
        prevOffset = Number.parseFloat(slider.scrollTop / slider.scrollHeight).toFixed(2)

    })


    function preserveSliderPosition() {
        slider.style.opacity = "0";
        let copyPrevOffset = prevOffset;
        setTimeout(() => {
            let offset = (slider.scrollHeight * parseFloat(copyPrevOffset));
            TweenLite.to(slider, 0, { scrollTo: offset, onComplete: () => { console.log(`in onComplete handler for TweenLite - prevOffset ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`) } });
            slider.style.opacity = "1";
        }, 0);


    }
}

