const menu = document.getElementById('menu'),
    hamburgerMenu = document.getElementById('hamburger-button'),
    closeMenu = document.getElementById('close-menu'),
    navLinks = [...document.querySelectorAll('.nav__link')],
    scrollButton = document.getElementById('scroll-button'),
    header = document.querySelector('.header'),
    sections = [...document.querySelectorAll('section')],
    buttonTheme = document.getElementById('change-theme'),
    iconMoon = '<img src="./img/moon.svg" alt="Moon">',
    iconSun = '<img src="./img/sun.svg" alt="Sun">';

let previousTitle = document.title;

/* === Swiper projects ===*/
const swiperProjects = new Swiper(".projects__container", {
	loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 24,
    centerSlide: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
    },
    breakpoints:{
        1024: {
            slidesPerView: 2,
            spaceBetween: -56
        }
    }
})


// Show mobile menu
hamburgerMenu.addEventListener('click', () => {
    menu.classList.toggle('show-menu')
})


// Hide mobile menu
closeMenu.addEventListener('click', () => {
	menu.classList.remove('show-menu')
})

navLinks.forEach(link => {
	link.addEventListener('click', () => menu.classList.remove('show-menu'))
});


// Show scroll top button
const showScrollButton = btn => {
	if (window.scrollY >= 400) scrollButton.classList.add('show-button')
	else scrollButton.classList.remove('show-button')
}


// Change menu style in desktop
const changeMenuStyle = () => {
	if (window.scrollY >= 50) header.classList.add('header-desktop')
	else header.classList.remove('header-desktop')
}


// scroll Spy
const scrollActive = () => {
	const scrollY = window.pageYOffset

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight,
        	sectionTop = section.offsetTop - 50,
            sectionId = section.id,
            sectionLink = document.querySelector(`.nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        	sectionLink.classList.add('active')
        } else sectionLink.classList.remove('active');
    });
}

// Dark / Light theme
const changeTheme = () => {
	if (localStorage.getItem('web-theme') === 'dark') {
		document.body.classList.add('dark-theme');
		buttonTheme.innerHTML = iconSun;
	} else {
		document.body.classList.remove('dark-theme');
		buttonTheme.innerHTML = iconMoon
	}
}

buttonTheme.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	if (document.body.classList.contains('dark-theme')) {
		localStorage.setItem('web-theme', 'dark')
		buttonTheme.innerHTML = iconSun
	} else {
		localStorage.setItem('web-theme', 'light')
		buttonTheme.innerHTML = iconMoon;
	}
})


// Remove mobile menu class when viewport is greater than 1023px
window.addEventListener('resize', () => {
	if (window.innerWidth >= 1024) {
		menu.classList.remove('show-menu')
	}
})

document.addEventListener('scroll', () => {
	showScrollButton()
	changeMenuStyle()
	scrollActive()
})

document.addEventListener('DOMContentLoaded', () => {
	showScrollButton()
	changeMenuStyle()
	scrollActive()
	changeTheme()
})


// For change the web title
window.addEventListener('blur', () => {
    previousTitle = document.title
    document.title = 'No te vayas vuelve'
})
window.addEventListener('focus', () => {
    document.title = previousTitle
})