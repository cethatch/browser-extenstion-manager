// Author: Christine Thatcher
// GitHub: cethatch
// Description: Fetches the extension data in a file called 'data.json' and uses each
// to generate DOM components for each extension to display them in the UI.

let extensions = [];
main();

function renderExtensions(filter) {
    const container = document.getElementById('tile-container');
    
    // clear previous HTML to re-render the tiles
    container.innerHTML = '';

    let filtered = extensions;

    if (filter === 'Active') {
        filtered = extensions.filter(ext => ext.isActive);
    } else if (filter === 'Inactive') {
        filtered = extensions.filter(ext => !ext.isActive);
    }

    filtered.forEach(extension => {
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
    renderExtensions(extensions);
}

function renderFilterButtons(filterState) {
    const container = document.getElementById('filter-buttons-container');
    container.innerHTML = '';
    const filterOptions = ['All', 'Active', 'Inactive'];
    filterOptions.forEach(filter => {
        const button = document.createElement('button');
        button.innerText = filter;
        button.classList.add('filterButton');

        if (filter == filterState) {
            button.classList.add('filterOn');
        } else {
            button.classList.add('filterOff');
        }

        button.addEventListener('click', () => {
            changeFilter(filter);
        });

        container.appendChild(button);
    });
}

function changeFilter(newFilter) {
    renderFilterButtons(newFilter);
    renderExtensions(newFilter);
}

function main() {
    
    let defaultFilter = 'All';
    
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {

            extensions = data;

            renderFilterButtons(defaultFilter);
            renderExtensions(defaultFilter);
        })
        .catch(error => {
            console.error('Error rendering extensions:', error);
        });
}
