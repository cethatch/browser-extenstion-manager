// Author: Christine Thatcher
// GitHub: cethatch
// Description: Fetches the extension data in a file called 'data.json' and uses each
// to generate DOM components for each extension to display them in the UI.

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('tile-container');

        data.forEach(extension => {
            const tile = document.createElement('div');
            tile.className = 'tile';

            const infoContainer = document.createElement('div');
            infoContainer.className = 'infoContainer';

            const extLogoContainer = document.createElement('div');
            extLogoContainer.className = 'extLogoContainer';

            const logo = document.createElement('img');
            logo.className = 'extLogo';
            logo.src = extension.logo;
            logo.alt = extension.name;

            const extTextContainer = document.createElement('div');
            extTextContainer.className = 'extTextContainer';

            const extTitle = document.createElement('h4');
            extTitle.className = 'extTitle';
            extTitle.textContent = extension.name;

            const extDescription = document.createElement('p');
            extDescription.className = 'extDescription';
            extDescription.textContent = extension.description;

            extLogoContainer.appendChild(logo);
            extTextContainer.appendChild(extTitle);
            extTextContainer.appendChild(extDescription);
            
            infoContainer.appendChild(extLogoContainer);
            infoContainer.appendChild(extTextContainer);

            const removeAndToggleActiveContainer = document.createElement('div');
            removeAndToggleActiveContainer.className = 'removeAndToggleActiveContainer';

            const removeButton = document.createElement('button');
            removeButton.className = 'removeButton';
            removeButton.innerText = 'Remove'

            const toggleLabel = document.createElement('label');
            toggleLabel.className = 'toggle';

            toggleLabel.innerHTML = `
            <input type='checkbox'>
            <span class='slider'></span>
            `;

            removeAndToggleActiveContainer.appendChild(removeButton);
            removeAndToggleActiveContainer.appendChild(toggleLabel);

            tile.appendChild(infoContainer);
            tile.appendChild(removeAndToggleActiveContainer);

            container.appendChild(tile);
        });

    })
    .catch(error => {
        console.error('Error loading extensions:', error);
    });