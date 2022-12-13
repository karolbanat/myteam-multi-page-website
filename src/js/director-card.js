const directorCardsButtons = document.querySelectorAll('.director-card__expand-button');

const handleExpandCardButton = e => {
	const button = e.target;
	const wasExpanded = button.getAttribute('aria-expanded') === 'true';
	button.setAttribute('aria-expanded', !wasExpanded);
	button.setAttribute('aria-label', wasExpanded ? 'Expand card' : 'Collapse card');

	/* card control */
	const targetCardId = button.getAttribute('aria-controls');
	const targetCard = document.querySelector(`#${targetCardId}`);
	targetCard.toggleAttribute('data-expanded', !wasExpanded);
	const toShowElements = targetCard.querySelectorAll('[data-hidden="true"]');
	const toHideElements = targetCard.querySelectorAll('[data-hidden="false"]');
	toShowElements.forEach(element => element.setAttribute('data-hidden', false));
	toHideElements.forEach(element => element.setAttribute('data-hidden', true));
};

directorCardsButtons.forEach(btn => btn.addEventListener('click', handleExpandCardButton));
