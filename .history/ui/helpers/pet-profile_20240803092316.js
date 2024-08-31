import { createIcon } from '/utils/icon.js';
import { createIDElement, appendChildren } from '/utils/content-utils.js';
import { formatFullName, formatBirthday, formatAge } from '/utils/pet-info.js';

export function setupPetProfile(petInfo) {
    const petProfileIcon = createPetProfileIcon();
    const petProfileWindow = createPetProfileWindow(petInfo);
    petProfileIcon.appendChild(petProfileWindow);

    handleTogglePetProfileWindow(petProfileIcon, petProfileWindow);

    return { petProfileIcon, petProfileWindow };
}

function createPetProfileIcon() {
    const icon = createIcon('🐹');
    icon.id = 'pet-profile-icon';
    return icon;
}

function createPetProfileWindow(petInfo) {
    // Create window
    const window = document.createElement('div');
    window.id = 'pet-profile-window';
    window.classList.add('ui');
    window.classList.add('ui-window');
    window.noPetFollow = true;
    window.isOpen = true;
    window.style.display = 'block';

    // Create information
    const { heading, primaryInfo, secondaryInfo } = createPetProfileInformation(petInfo);

    // Append information to window
    appendChildren(window, [heading, primaryInfo, secondaryInfo]);

    return window;
}

function createPetProfileInformation(petInfo) {
    // Heading
    const heading = createIDElement('div', 'pet-profile-heading', formatFullName(petInfo));

    // Primary information (in same line)
    const primaryInfo = createIDElement('div', 'pet-profile-primary', `${formatAge(petInfo)} • ${petInfo.gender} • ${petInfo.subtype}`);

    // Secondary information
    const secondaryInfo = createIDElement('div', 'pet-profile-secondary');
    const birthday = createIDElement('div', 'pet-profile-birthday', `Born ${formatBirthday(petInfo)}`);
    
    appendChildren(secondaryInfo, [birthday]);

    // Return to handle
    return { heading, primaryInfo, secondaryInfo };
}

function handleTogglePetProfileWindow(icon, profileWindow) {
    icon.addEventListener('click', (icon, profileWindow)=> showPetProfileWindow(icon, profileWindow));
}

function togglePetProfileWindow(e) {
    const petProfileWindow = document.getElementById('pet-profile-window');
    const isOpen = petProfileWindow.isOpen;

    // Prevent opening window from clicking on elements other than icon
    if (!isOpen && e.target.id !== 'pet-profile-icon') return;

    // Toggle isOpen value
    petProfileWindow.isOpen = !petProfileWindow.isOpen;

    if (petProfileWindow.isOpen) petProfileWindow.style.display = 'block';
    else petProfileWindow.style.display = 'none';
}

function showPetProfileWindow(icon, profileWindow) {
    profileWindow.isOpen = true;
}

function hidePetProfileWindow(icon, profileWindow) {
    profileWindow.isOpen = false;
    icon.addEventListener('click', {once: true})
}