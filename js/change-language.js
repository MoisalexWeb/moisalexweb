let currentLang = document.documentElement.lang;

const textsToChange = document.querySelectorAll('[data-section]'),
	template = document.getElementById('template-modal').content,
	buttonLanguage = document.getElementById('change-language');

/* === Image url for change language === */
const urlFlags = {
    spanish: "./img/flag-spain.svg",
    english: "./img/flag-gb.svg"
}

// Preload images
const preloadImage = url => new Image().src = url;


// Change language
const changeLanguage = async language => {
	try {
		const requestJson = await fetch(`https://moisalexweb.github.io/moisalexweb/languages/${language}.json`)
        const texts = await requestJson.json()

        textsToChange.forEach(textToChange => {
            const section = textToChange.dataset.section
            const value = textToChange.dataset.value

            // For change the input submit value
            if (textToChange.hasAttribute('data-submit')) textToChange.value = texts[section][value]

            textToChange.innerHTML = texts[section][value]
        });

        document.documentElement.lang = language

        if (language === 'es') buttonLanguage.firstElementChild.src = urlFlags.english;

        else buttonLanguage.firstElementChild.src = urlFlags.spanish;
	} catch(error) {
		if (language === 'es') template.querySelector('.modal-paragraph').textContent = "Error al traducir, inténtelo nuevamente";
		else template.querySelector('.modal-paragraph').textContent = "Error al traducir, inténtelo nuevamente";
		
		const fragment = document.createDocumentFragment(),
			templateClone = document.importNode(template, true);
		fragment.appendChild(templateClone)
		document.body.appendChild(fragment)
		console.log(error);
	}
}

console.log(template.querySelector('.modal-paragraph'));

document.addEventListener('click', e => {
	// Change Language
    if (e.target === buttonLanguage) {
        if (currentLang === 'es') {
        	currentLang = 'en'
        	changeLanguage(currentLang)
        } else {
        	currentLang = 'es'
        	changeLanguage(currentLang)
        }
    }

    // Close modal
    if (e.target.matches(".modal-close") || e.target.matches(".modal__container.show-modal")) {
    	const modal = document.querySelector('.modal__container');
    	document.body.removeChild(modal)
    }
})

document.addEventListener('DOMContentLoaded', () => {
	preloadImage(urlFlags.spanish)
	preloadImage(urlFlags.english)
})
