function createIcon(content) {
    const icon = document.createElement('a');
    icon.classList.add('icon');
    const iconCircle = document.createElement('div');
    iconCircle.noPetFollow = true;
    iconCircle.classList.add('icon-circle');
    if (content.length === 1) { // Emoji
        iconCircle.textContent = content;
    }
    else {
        const iconImage = document.createElement('img');
        iconImage.classList.add();
    }
    
    icon.appendChild(iconCircle);
    return icon;
}

export { createIcon };