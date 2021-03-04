// Variables
var staggerFrom = 'center';
if (screen.width <= 425) {
    staggerFrom = 'start';
}
// Durations
const durationFast = .5;

// Utilities Animations
const fadeIn = (element, visibility = 1, dur = durationFast, display = 'block') => {
    element.style.display = display;
    gsap.fromTo(element, { opacity: 0 }, { opacity: visibility, duration: dur });
}

const fadeOut = (element, visibility = 1, dur = durationFast) => {
    gsap.fromTo(element, { opacity: visibility }, {
        opacity: 0,
        duration: dur,
        onComplete: () => {
            element.style.display = 'none';
        }
    });
}

// Mobile Menu
const header = document.querySelector('header');
const logo = header.querySelectorAll('.logo');

const hamburger = header.querySelector('.hamburger');
hamburger.classList.add('closed');

const navLinksContainer = header.querySelector('.nav-links');
fadeOut(navLinksContainer, 1, 0);
const navLinks = navLinksContainer.children;

const overlay = header.querySelector('.overlay');
gsap.to(overlay, { x: 100, opacity: 0, duration: 0 });

const openMobileNav = () => {
    fadeIn(navLinksContainer, 1, 0, 'flex');
    gsap.to(overlay, { x: 0, opacity: 1, duration: .3 })
    gsap.to(navLinks, { x: 0, opacity: 1, stagger: .1, duration: .2 });
}

const closeMobileNav = () => {
    gsap.to(navLinks, { x: '500%', opacity: 0, duration: .5, stagger: 0, onComplete: () => { fadeOut(navLinksContainer, 1, 0) } })
    gsap.to(overlay, { x: '100%', opacity: 0, duration: durationFast });
    fadeIn(navLinksContainer, 1, 0, 'flex');
}

if (screen.width <= 425) {

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('closed') && !hamburger.classList.contains('open')) {
            hamburger.classList.add('open');
            hamburger.classList.remove('closed');
            openMobileNav();
        } else {
            hamburger.classList.remove('open');
            hamburger.classList.add('closed');
            closeMobileNav();
        }
    });
} else {
    gsap.to(navLinks, { opacity: 1, duration: 0 });
}

// gallery Section
const galleryContainer = document.querySelector('#gallery');
if (galleryContainer) {
    const gallery = galleryContainer.querySelectorAll('.gallery-container .gallery-img');

    // Lightbox
    var elem = document.createElement("img");
    const lightbox = document.querySelector('.lightbox');

    const showLightbox = (src) => {
        fadeIn(lightbox);
        lightbox.appendChild(elem);
        elem.src = src;
    }

    lightbox.addEventListener('click', () => {
        fadeOut(lightbox);
    });

    gallery.forEach(element => {

        element.addEventListener('click', () => {
            showLightbox(element.querySelector('img').src);
        })
    });
}