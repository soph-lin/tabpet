function handleCustomSearchText() {
    const customSearchText = createCustomSearchText();
    handleRemoveCustomText(customSearchText);
}

function createCustomSearchText() {
    const searchBarContainer = document.querySelector('.a4bIc');

    const customSearchText = document.createElement('div');
    customSearchText.id = 'custom-searchbar-text';
    customSearchText.textContent = 'bla';
    searchBarContainer.appendChild(customSearchText);
    return customSearchText;
}

function handleRemoveCustomText(customSearchText) {
    const searchBarTextArea = document.querySelector('.gLFyf');
    searchBarTextArea.addEventListener('click', ()=> {
        customSearchText.textContent = '';
        customSearchText.style.display = 'none';
    });
}
