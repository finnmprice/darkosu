function replaceSuggestWithLink() {
    const suggest = document.querySelector('.header-tagline span');
    if (suggest) {
        const link = document.createElement('a');
        link.href = 'https://my.uhds.oregonstate.edu/bms';
        link.textContent = 'Suggest movies here';
        suggest.parentNode.replaceChild(link, suggest);
        return true;
    }
    return false;
}

function replaceHeaderImage(classToReplace, imageUrl) {
    const headerImages = document.querySelectorAll(classToReplace);
    let replaced = false;

    headerImages.forEach(headerImage => {
        const newImage = new Image();
        newImage.src = imageUrl;
        newImage.className = headerImage.className;
        if (headerImage.alt) newImage.alt = headerImage.alt;
        if (headerImage.id) newImage.id = headerImage.id;
        headerImage.parentNode.replaceChild(newImage, headerImage);
        replaced = true;
    });

    return replaced;
}

const toReplace = [
    ['.header-image, .header-image.mobile-header', chrome.runtime.getURL('images/header-image.png')],
    ['.suggested img', chrome.runtime.getURL('images/header-image.png')]
];

function attemptReplacements() {
    const suggestReplaced = replaceSuggestWithLink();

    let allImagesReplaced = true;

    toReplace.forEach(([classToReplace, imageUrl]) => {
        const imageReplaced = replaceHeaderImage(classToReplace, imageUrl);
        if (!imageReplaced) {
            allImagesReplaced = false;
        }
    });

    if (!suggestReplaced || !allImagesReplaced) {
        setTimeout(attemptReplacements, 500);
        console.log('attempted :(');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attemptReplacements);
} else {
    attemptReplacements();
}
