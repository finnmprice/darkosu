function replaceTaglineWithLink() {
    const tagline = document.querySelector('.header-tagline span');
    if (tagline) {
        const link = document.createElement('a');
        link.href = 'https://uhds.link/bms';
        link.textContent = 'Suggest movies here';
        tagline.parentNode.replaceChild(link, tagline);
        return true;
    }
    return false;
}

function replaceHeaderImage() {
    const headerImages = document.querySelectorAll('.header-image, .header-image.mobile-header');
    let replaced = false;

    headerImages.forEach(headerImage => {
        const newImage = new Image();
        newImage.src = chrome.runtime.getURL('images/header-image.png');
        newImage.className = headerImage.className;
        if (headerImage.alt) newImage.alt = headerImage.alt;
        if (headerImage.id) newImage.id = headerImage.id;
        headerImage.parentNode.replaceChild(newImage, headerImage);
        replaced = true;
    });

    return replaced;
}

function attemptReplacements() {
    const taglineReplaced = replaceTaglineWithLink();
    const imageReplaced = replaceHeaderImage();
    
    if (!taglineReplaced || !imageReplaced) {
        setTimeout(attemptReplacements, 500);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attemptReplacements);
} else {
    attemptReplacements();
}