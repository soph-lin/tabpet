import { getPetInfo } from '/utils/pet-info.js';

export function handlePetProfile() {
    changeProfilePhoto();
}

function changeProfilePhoto() {
    const petInfo = await getPetInfo();
    const src = 

    /*
    const url32 = chrome.runtime.getURL('/icon/32.png');
    const url64 = chrome.runtime.getURL('/icon/64.png');
    */

    const photoEl = document.querySelector('.gb_q.gbii');
    if (photoEl) {
        photoEl.src = src;
        photoEl.srcset = `${src} 1x, ${src} 2x`;
    }
}