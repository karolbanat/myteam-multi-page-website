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
	/* only first text input error will be displayed after submit */
	return textInputs.every(validateInput);
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
	const hiddenInputLabel = createHiddenSpan(inputElement.getAttribute('aria-label'));
	parentInputContainer.setAttribute('data-error', true);

	/* append hidden span with field name and message to error element */
	errorElement.appendChild(hiddenInputLabel);
	errorElement.appendChild(document.createTextNode(message));
};

const createHiddenSpan = innerText => {
	const span = document.createElement('span');
	span.classList.add('visually-hidden');
	span.innerText = innerText + ' field.';
	return span;
};

const removeError = inputElement => {
	const parentInputContainer = inputElement.closest('.contact-form__input-container');
	const errorElement = parentInputContainer.querySelector('.contact-form__error-message');
	parentInputContainer.removeAttribute('data-error');
	errorElement.innerHTML = '';
};

/* event handlers */
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
