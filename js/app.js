const header = document.querySelector('header');
header.classList.add('closed');
const hamburger = document.querySelector('.hamburger');

const openMobileNav = gsap.timeline({ paused: true })
    .from('.overlay', .5, { x: 250, opacity: 0 })
    .from('.nav-links a', .5, { x: 100, opacity: 0, stagger: .1 }, "-= .2");

const closeMobileNav = gsap.timeline({ paused: true })
    .to('.overlay', .8, { x: 250, opacity: 0 })
    .to('.nav-links a', .3, { x: 100, stagger: .1 }, "-= .2")
    .to('.nav-links a', .2, { opacity: 0 }, "-= .5");

function screenReady() {
    if (screen.width <= 425) {
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