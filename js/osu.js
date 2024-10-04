function replaceHeaderSVG() {
    const headerImage = document.querySelector('#osu-top-hat a img');
    let replaced = false;

    if (headerImage) {
        const newSVG = document.createElement('img');
        newSVG.src = chrome.runtime.getURL('images/osu-logo.svg');
        newSVG.className = headerImage.className;
        if (headerImage.alt) newSVG.alt = headerImage.alt;
        if (headerImage.id) newSVG.id = headerImage.id;

        headerImage.parentNode.replaceChild(newSVG, headerImage);
        replaced = true;
    }

    return replaced;
}

replaceHeaderSVG();
