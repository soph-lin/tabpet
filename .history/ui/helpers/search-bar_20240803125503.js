function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomText();
}

function createCustomSearchText() {
    const searchBarContainer = document.querySelector('.a4bIc');
    const searchBarTextArea = document.querySelector('.gLFyf');

    const customSearchText = document.createElement('div');
    customSearchText.id = 'custom-searchbar-text';
    customSearchText.textContent = 'bla';
    searchBarContainer.appendChild(customSearchText);
    return customSearchText;
}

function handleRemoveCustomText() {
    const
}
