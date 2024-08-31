function createIcon(content) {
    const icon = document.createElement('a');
    icon.classList.add('icon');
    const iconCircle = document.createElement('div');
    iconCircle.noPetFollow = true;
    iconCircle.classList.add('icon-circle');

    // Set content as emoji or image
    if (content.length === 1) { // Cntent is emoji
        iconCircle.textContent = content;
    }
    else { // Content is image src
        const iconImageContainer = document.createElement('div');
        iconImageContainer.classList.add('icon-image-container');

        const iconImage = document.createElement('img');
        iconImage.classList.add('icon-image');

        iconImageContainer.appendChild(iconImage);
    }
    
    icon.appendChild(iconCircle);
    return icon;
}

export { createIcon };