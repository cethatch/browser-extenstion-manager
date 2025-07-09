// Author: Christine Thatcher
// GitHub: cethatch
// Description: Toggles between light and dark mode style sheets.

main();

function main() {

    const toggleButton = document.getElementById('theme-button');
    toggleButton.addEventListener('click', toggleTheme);

}

function toggleTheme() {

    const body = document.body;
    const logo = document.getElementById('logo');
    const isDark = body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode', !isDark);

    let themeIcon = document.getElementById('theme-icon');

    if (isDark) {
        logo.setAttribute('src', './assets/images/logo-dark.svg');
        themeIcon.setAttribute('src', './assets/images/icon-sun.svg');
    } else {
        logo.setAttribute('src', './assets/images/logo-light.svg');
        themeIcon.setAttribute('src', './assets/images/icon-moon.svg');
    }

}