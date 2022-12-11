const primaryNavigation = document.querySelector('.primary-navigation');
const toggleButton = primaryNavigation.querySelector('.toggle-button');
const navMenu = primaryNavigation.querySelector('#primary-nav');

toggleButton.addEventListener('click', e => {
	const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
	const toggleLabel = isExpanded ? 'Open menu' : 'Close menu';
	toggleButton.setAttribute('aria-expanded', !isExpanded);
	toggleButton.setAttribute('aria-label', toggleLabel);
	navMenu.toggleAttribute('data-expanded', !isExpanded);
});
