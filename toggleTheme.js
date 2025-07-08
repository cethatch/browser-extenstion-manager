// Author: Christine Thatcher
// GitHub: cethatch
// Description: Toggles between light and dark mode style sheets.


main();

function main() {

    const toggleButton = document.getElementById('color-mode');
    toggleButton.addEventListener('click', toggleTheme);

}

function toggleTheme() {
    let themeLink = document.getElementById('theme-stylesheet');
    let themeIcon = document.getElementById('theme-icon');

    if (themeLink.getAttribute('href') == './styles/light.css') {
        themeLink.setAttribute('href', './styles/dark.css');
        themeIcon.setAttribute('src', './assets/images/icon-sun.svg');
        console.log('switched to dark mode');
    } else if (themeLink.getAttribute('href') == './styles/dark.css') {
        themeLink.setAttribute('href', './styles/light.css');
        themeIcon.setAttribute('src', './assets/images/icon-moon.svg');
        console.log('switched to light mode');
    }
}