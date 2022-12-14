const contactForm = document.querySelector('.contact-form');
const contactFormTextInputs = contactForm.querySelectorAll('input[type="text"]');
const contactFormEmailInput = contactForm.querySelector('input[type="email"]');
const contactFormMessageInput = contactForm.querySelector('textarea');
const successMessageElement = contactForm.querySelector('.contact-form__success-message');
const submitButton = contactForm.querySelector('button[type="submit"]');
const textInputs = [...contactFormTextInputs, contactFormMessageInput];

const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateTextInputs = () => {
	/* first maps to boolean values so it will display error for every input that has error */
	return textInputs.map(validateInput).every(el => el);
};

const validateInput = inputElement => {
	if (inputElement.value === '') {
		displayError(inputElement);
		return false;
	} else {
		removeError(inputElement);
		return true;
	}
};

const validateEmailInput = input => {
	const email = input.value;
	if (email === '') {
		displayError(input);
		return false;
	} else if (!EMAIL_REGEX.test(email)) {
		displayError(input, 'Please provide valid email address.');
		return false;
	} else {
		removeError(input);
		return true;
	}
};

const displayError = (inputElement, message = 'This field is required') => {
	const parentInputContainer = inputElement.closest('.contact-form__input-container');
	const errorElement = parentInputContainer.querySelector('.contact-form__error-message');
	parentInputContainer.setAttribute('data-error', true);
	errorElement.innerText = message;
};

const removeError = inputElement => {
	const parentInputContainer = inputElement.closest('.contact-form__input-container');
	const errorElement = parentInputContainer.querySelector('.contact-form__error-message');
	parentInputContainer.removeAttribute('data-error');
	errorElement.innerText = '';
};

submitButton.addEventListener('click', e => {
	e.preventDefault();
	const everyTextInputIsValid = validateTextInputs();
	const isEmailValid = validateEmailInput(contactFormEmailInput);
	const allInputsValid = everyTextInputIsValid && isEmailValid;

	successMessageElement.classList.toggle('visible', allInputsValid);
});

textInputs.forEach(input => input.addEventListener('blur', e => validateInput(e.target)));
textInputs.forEach(input => input.addEventListener('focus', e => removeError(e.target)));

contactFormEmailInput.addEventListener('blur', e => validateEmailInput(e.target));
contactFormEmailInput.addEventListener('focus', e => removeError(e.target));
