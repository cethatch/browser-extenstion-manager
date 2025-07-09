// Author: Christine Thatcher
// GitHub: cethatch
// Description: Fetches the extension data in a file called 'data.json' and uses each
// to generate DOM components for each extension to display them in the UI.

let extensions = [];
let filterState = 'All';
main();

function renderExtensions() {
    const container = document.getElementById('tile-container');
    
    // clear previous HTML to re-render the tiles
    container.innerHTML = '';

    let filtered = extensions;

    if (filterState === 'Active') {
        filtered = extensions.filter(ext => ext.isActive);
    } else if (filterState === 'Inactive') {
        filtered = extensions.filter(ext => !ext.isActive);
    }

    filtered.forEach(extension => {
        const tile = document.createElement('div');
        tile.className = 'tile';

        const infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';

        const extLogoContainer = document.createElement('div');
        extLogoContainer.className = 'ext-logo-container';

        const logo = document.createElement('img');
        logo.className = 'ext-logo';
        logo.src = extension.logo;
        logo.alt = extension.name;

        const extTextContainer = document.createElement('div');
        extTextContainer.className = 'ext-text-container';

        const extTitle = document.createElement('h3');
        extTitle.className = 'ext-title';
        extTitle.textContent = extension.name;

        const extDescription = document.createElement('p');
        extDescription.className = 'ext-description';
        extDescription.textContent = extension.description;

        extLogoContainer.appendChild(logo);
        extTextContainer.appendChild(extTitle);
        extTextContainer.appendChild(extDescription);
        
        infoContainer.appendChild(extLogoContainer);
        infoContainer.appendChild(extTextContainer);

        const removeAndToggleActiveContainer = document.createElement('div');
        removeAndToggleActiveContainer.className = 'remove-and-toggle-active-container';

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerText = 'Remove';
        removeButton.addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${extension.name}?`)) {
                // delete the extension from data.json
                deleteExtensionByName(extension.name, extensions); 
            } else {
                // Do nothing, print to console
                console.log(`User aborted delete operation for: ${extension.name}`);
            }
        });

        const toggleLabel = document.createElement('label');
        toggleLabel.className = 'toggle';

        const active = document.createElement('input');
        active.type = 'checkbox';
        active.checked = extension.isActive; 

        // Respond to toggle of active state
        active.addEventListener('change', () => {
            extension.isActive = active.checked;
        })

        const slider = document.createElement('span');
        slider.className = 'slider';
        
        toggleLabel.appendChild(active);
        toggleLabel.appendChild(slider);

        removeAndToggleActiveContainer.appendChild(removeButton);
        removeAndToggleActiveContainer.appendChild(toggleLabel);

        tile.appendChild(infoContainer);
        tile.appendChild(removeAndToggleActiveContainer);

        container.appendChild(tile);
    });
}

// Deletes the given extension from the list of extensions by filtering for name
// Re-renders the extensions
function deleteExtensionByName(name) {
    extensions = extensions.filter(ext => ext.name !== name);
    renderExtensions();
}

function renderFilterButtons() {
    const container = document.getElementById('filter-buttons-container');
    container.innerHTML = '';
    const filterOptions = ['All', 'Active', 'Inactive'];
    filterOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('filter-button');

        if (option == filterState) {
            button.classList.add('filter-on');
        } else {
            button.classList.add('filter-off');
        }

        button.addEventListener('click', () => {
            changeFilter(button.innerText);
        });

        container.appendChild(button);
    });
}

function changeFilter(newFilterState) {
    filterState = newFilterState;
    renderFilterButtons();
    renderExtensions();
}

function main() {
        
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {

            extensions = data;

            renderFilterButtons(filterState);
            renderExtensions(filterState);
        })
        .catch(error => {
            console.error('Error rendering extensions:', error);
        });
}
