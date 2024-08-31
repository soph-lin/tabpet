export default function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomSearchText(customSearchText);
}

function createCustomSearchText() {
    // Create element
    const customSearchText = document.createElement('div');
    customSearchText.id = 'custom-search-text';
    customSearchText.style.display = 'none';

    // Append to Chrome search bar
    const searchBarContainer = document.querySelector('.a4bIc');
    searchBarContainer.appendChild(customSearchText);

    // Return element to handle
    return customSearchText;
}

function handleRemoveCustomSearchText(customSearchText) {
    const searchBarTextArea = document.querySelector('.gLFyf');
    customSearchText.addEventListener('click', ()=> {
        customSearchText.textContent = '';
        customSearchText.style.display = 'none';
    });
}
