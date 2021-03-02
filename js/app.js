// Animations
const fadeIn = (element, visibility = 1) => {
    element.style.display = 'block';
    gsap.fromTo(element, { opacity: 0 }, { opacity: visibility, duration: .3 });
}

const fadeOut = (element, visibility = 1) => {
    gsap.fromTo(element, { opacity: visibility }, {
        opacity: 0,
        duration: .3,
        onComplete: () => {
            element.style.display = 'none';
        }
    });
}

// Mobile Menu
const header = document.querySelector('header');
header.classList.add('closed');

const hamburger = document.querySelector('.hamburger');

const openMobileNav = gsap.timeline({ paused: true });

const closeMobileNav = gsap.timeline({ paused: true });

function screenReady() {
    if (screen.width <= 425) {
        openMobileNav
            .from('.overlay', .5, { x: 250, opacity: 0 })
            .from('.nav-links a', .5, { x: 100, opacity: 0, stagger: .1 }, "-= .2");
        closeMobileNav
            .to('.overlay', .8, { x: 250, opacity: 0 })
            .to('.nav-links a', .3, { x: 100, stagger: .1 }, "-= .2")
            .to('.nav-links a', .2, { opacity: 0 }, "-= .5");
        hamburger.addEventListener('click', () => {
            if (header.classList.contains('closed') && !header.classList.contains('open')) {
                openMobileNav.restart();
                header.classList.add('open');
                header.classList.remove('closed')
            } else {
                closeMobileNav.restart();
                header.classList.remove('open')
                header.classList.add('closed');
            }
        })
    }
}

screenReady();

// Lightbox
var elem = document.createElement("img");
const lightbox = document.querySelector('.lightbox');
lightbox.addEventListener('click', () => {
    fadeOut(lightbox);
});
const galleryLinks = [];

const showLightbox = (src) => {
    fadeIn(lightbox);
    lightbox.appendChild(elem);
    elem.src = src;
}

const getGalleryItems = () => {
    document.querySelectorAll('.gallery-img img').forEach(element => {

        galleryLinks.push(element.src);

        element.addEventListener('click', () => {
            showLightbox(element.src);
        })
    });
}

getGalleryItems();