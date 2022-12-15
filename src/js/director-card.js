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
	const hiddenParts = targetCard.querySelectorAll('[data-hidden="true"]');
	const visibleParts = targetCard.querySelectorAll('[data-hidden="false"]');

	/* function to invoke after showing animation ends */
	const showHiddenParts = () => {
		hiddenParts.forEach(part => {
			part.setAttribute('data-hidden', false);
			part.classList.add('animation-fade-in');
			part.addEventListener(
				'animationend',
				_ => {
					part.classList.remove('animation-fade-in');
				},
				{ once: true }
			);
		});
	};

	/* after the animation hidden parts are going to be shown */
	visibleParts.forEach(part => {
		part.classList.add('animation-fade-out');
		part.addEventListener(
			'animationend',
			_ => {
				part.classList.remove('animation-fade-out');
				part.setAttribute('data-hidden', true);
				showHiddenParts();
			},
			{ once: true }
		);
	});
};

directorCardsButtons.forEach(btn => btn.addEventListener('click', handleExpandCardButton));
