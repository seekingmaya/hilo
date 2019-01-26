export function positionSlider(slider) {
    let prevOffset = 0;

    let mediaQueryList = window.matchMedia("(orientation: portrait)");

    mediaQueryList.addListener(preserveSliderPosition);

    slider.addEventListener('scroll', () => {
        console.log(`in scroll handler - prevOffset beg ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`)
        prevOffset = Number.parseFloat(slider.scrollTop / slider.scrollHeight).toFixed(2)
        console.log(`in scroll handler - prevOffset end ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`)
    })


    function preserveSliderPosition() {
        slider.style.opacity = "0";
        let copyPrevOffset = prevOffset;
        setTimeout(() => {
            let offset = (slider.scrollHeight * parseFloat(copyPrevOffset));
            console.log(`before tweenlite - copyPrevOffset ${copyPrevOffset} offset ${offset} prevOffset ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`)
            TweenLite.to(slider, 0, { scrollTo: offset, onComplete: () => { console.log(`in onComplete handler for TweenLite - prevOffset ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`) } });
            slider.style.opacity = "1";
            // prevOffset = Number.parseFloat(slider.scrollTop / slider.scrollHeight).toFixed(2);
            console.log(`after tweenlite - offset ${offset} prevOffset ${prevOffset} scrollTop ${slider.scrollTop} slider.scrollHeight ${slider.scrollHeight}`)
        }, 0);


    }
}

