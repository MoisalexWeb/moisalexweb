const $form = document.getElementById('contact-form'),
	$message = $form.message;
	$charactersMessage = document.querySelector('.form__group.message .message-characters');


const spanishErrorMessages = Object.freeze({
	nameValidation: "Ingrese un nombre válido solo acepta letras",
	nameLength: "El Nombre debe tener mínimo 4 caracteres y máximo 15",
	lastnameValidation: "Ingrese un apellido valido, maximo 2 espacios en blanco",
	lastnameLength: "El Apellido debe tener mínimo 4 caracteres y máximo 20",
	emailValidation: "Ingrese un correo válido",
	emailLength: "El Correo debe tener mínimo 10 caracteres",
	subjectValidation: "Ingrese un asunto válido",
	subjectLength: "El asunto debe contener mínimo 8 caracteres y máximo 40",
	subjectSpaces: "El asunto debe contener máximo 4 espacios en blanco",
	messageLength: "El mesaje debe contener entre 30 y 300 caracteres"
})

const englishErrorMessages = Object.freeze({
	nameValidation: "Put a valid name, just accept letters",
	nameLength: "Inglés El Nombre debe tener mínimo 4 caracteres y máximo 15",
	lastnameValidation: "Inglés Ingrese un apellido valido, maximo 2 espacios en blanco",
	lastnameLength: "Inglés El Apellido debe tener mínimo 4 caracteres y máximo 20",
	emailValidation: "Inglés Ingrese un correo válido",
	lastnameSpaces: "Inglés El Apellido debe tener maximo 2 espacios en blanco",
	emailLength: "Inglés El Correo debe tener mínimo 10 caracteres",
	subjectValidation: "Inglés Ingrese un asunto válido",
	subjectLength: "Inglés El asunto debe contener mínimo 8 caracteres y máximo 40",
	subjectSpaces: "Inglés El asunto debe contener máximo 4 espacios en blanco",
	messageLength: "Inglés El mesaje debe contener entre 30 y 300 caracteres"
})

const submitMessage = Object.freeze({
	esError: "Error al enviar los datos, intente nuevamente",
	enError: "Inglés Error al enviar los datos, intente nuevamente",
	esSuccess: "Mensaje enviado correctamente",
	enSuccess: "Inglés Mensaje enviado correctamente"
})

$message.addEventListener('input', () => $charactersMessage.textContent = 350 - $message.value.length)


// Form validation and send email
$form.addEventListener('submit', e => {
	e.preventDefault();
	let lang = document.documentElement.lang;
	const $name = $form.name.value,
		$lastname = $form.lastname.value,
		$email = $form.email.value,
		$subject = $form.subject.value,
		validName = new RegExp(/^[A-Za-zÑñáÁéÉíÍóÓúÚ]+$/),
		validEmail = new RegExp(/^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/),
		validMessage = new RegExp(/^[A-Za-z0-9ÑñáÁéÉíÍóÓúÚ]{1,255}$/),
		validSubject = new RegExp(/^[A-Za-zÑñáÁéÉíÍóÓúÚ\s]+$/),
		$nameError = document.querySelector('.error-field.name'),
		$lastnameError = document.querySelector('.error-field.lastname'),
		$emailError = document.querySelector('.error-field.email'),
		$subjectError = document.querySelector('.error-field.subject'),
		$messageError = document.querySelector('.error-field.message');

	const $loaderImg = document.querySelector('.loader-img'),
		$response = document.querySelector('.loader-response');

	// Name validation
	if (!validName.test($name)) {
		$nameError.classList.add('is-error')
		$nameError.textContent = (lang === 'es') ? spanishErrorMessages.nameValidation : englishErrorMessages.nameValidation;
	} else if ($name.length > 15 || $name.length < 4) {
		$nameError.textContent = (lang === 'es') ? spanishErrorMessages.nameLength : englishErrorMessages.nameLength;
		$nameError.classList.add('is-error');
	} else $nameError.classList.remove('is-error');

	// Lastname validation
	if (!validSubject.test($lastname)) {
		$lastnameError.textContent = (lang === 'es') ? spanishErrorMessages.lastnameValidation : englishErrorMessages.lastnameValidation
		$lastnameError.classList.add('is-error')
	} else if ($lastname.length < 4 || $lastname.length > 20) {
		$lastnameError.textContent = (lang === 'es') ? spanishErrorMessages.lastnameLength : englishErrorMessages.lastnameLength;
		$lastnameError.classList.add('is-error');
	} else if($lastname.includes(' ')){
		let blanksSpaces = $lastname.split(' ')
		blanksSpaces = blanksSpaces.filter(el => el === '')
		if (blanksSpaces.length > 2) {
			$lastnameError.textContent = (lang === 'es') ? spanishErrorMessages.lastnameValidation : spanishErrorMessages.lastnameValidation;
			$lastnameError.classList.add('is-error');
		} else $lastnameError.classList.remove('is-error');
	} else $lastnameError.classList.remove('is-error');

	// Email validation
	if (!validEmail.test($email)) {
		$emailError.textContent = (lang === 'es') ? spanishErrorMessages.emailValidation : englishErrorMessages.emailValidation;
		$emailError.classList.add('is-error');
	} else if ($email.length < 10){
		$emailError.textContent = (lang === 'es') ? spanishErrorMessages.emailLength : englishErrorMessages.emailLength;
		$emailError.classList.add('is-error');
	} else $emailError.classList.remove('is-error');

	// Subject Validation
	if (!validSubject.test($subject)) {
		$subjectError.textContent = (lang === 'es') ? spanishErrorMessages.subjectValidation : englishErrorMessages.subjectValidation;
		$subjectError.classList.add('is-error');
	} else if ($subject.length < 8 || $subject.length > 40) {
		$subjectError.textContent = (lang === 'es') ? spanishErrorMessages.subjectLength : englishErrorMessages.subjectLength;
		$subjectError.classList.add('is-error');
	} else if ($subject.includes(' ')) {
		let blanksSpaces = $subject.split(' ')
		blanksSpaces = blanksSpaces.filter(el => el === '')
		if (blanksSpaces.length >= 5) {
			$subjectError.textContent = (lang === 'es') ? spanishErrorMessages.subjectSpaces : englishErrorMessages.subjectSpaces;
			$subjectError.classList.add('is-error');
		} else $subjectError.classList.remove('is-error');
	} else $subjectError.classList.remove('is-error');

	// Valid message
	if ($message.value.length < 30 || $message.value.length >= 350) {
		$messageError.textContent = (lang === 'es') ? spanishErrorMessages.messageLength : englishErrorMessages.messageLength;
		$messageError.classList.add('is-error');
	} else $messageError.classList.remove ('is-error');


	// Send email
	if (document.querySelectorAll('.is-error').length === 0) {
		$loaderImg.classList.remove('d-none');
		fetch("https://formsubmit.co/ajax/moises.08.caraballo@gmail.com",{
			method: "POST",
			body: new FormData($form)
		})
		.then(res => {
			if (res.ok) return res.json()
			else Promise.reject(res)
		})
		.then(json => {
			console.log(json);
			$loaderImg.classList.add('d-none');
			$response.classList.remove('d-none');
			$response.textContent = (lang === 'es') ? submitMessage.esSuccess : submitMessage.enSuccess;
			setTimeout(() => $response.classList.add('d-none'), 4000);
			$form.reset()
		})
		.catch(err => {
			$loaderImg.classList.add('d-none');
			$response.textContent = (lang === 'es') ? submitMessage.esError : submitMessage.enError;
			$response.classList.remove('d-none')
			setTimeout(() => $response.classList.add('d-none'), 4000);
		})
	}
})