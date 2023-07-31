// Function to toggle dark mode
function toggleDarkMode() {
	const body = document.querySelector('body');
	body.classList.toggle('dark-mode');

	// Store the user preference in localStorage
	const isDarkModeEnabled = body.classList.contains('dark-mode');
	localStorage.setItem('darkMode', isDarkModeEnabled);
}

// Function to apply the theme based on user preference
function applyThemePreference() {
	const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const body = document.querySelector('body');
	const savedDarkMode = localStorage.getItem('darkMode');

	if (savedDarkMode !== null) {
		// Apply user preference from localStorage
		if (savedDarkMode === 'true') {
			body.classList.add('dark-mode');
		} else {
			body.classList.remove('dark-mode');
		}
	} else {
		// Apply system preference
		if (prefersDarkMode) {
			body.classList.add('dark-mode');
		} else {
			body.classList.remove('dark-mode');
		}
	}
}

// Detect system theme on page load and apply the appropriate theme
applyThemePreference();