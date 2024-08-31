import { handleCursor } from '/interact/handleCursor.js';
import { handleInteractable } from '/interact/handleInteractable.js';
import { handlePet } from '/interact/handlePet.js';

console.log('running');

export function main() {
    if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') { // DOM content already loaded
        console.log('already loaded');
        start();
    }
    else {
        document.addEventListener('DOMContentLoaded', start);
    }
}

function start() {
    handlePetProfile();
    handleCursor();
    handleInteractable();
    handlePet();
}

