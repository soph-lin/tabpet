import { getPetInfo } from '/utils/pet-info.js';
import { getProfilePhotoSrc } from '/utils/pet-info.js';

export function handlePetProfile() {
    changeProfilePhoto();
}

async function changeProfilePhoto() {
    const petInfo = await getPetInfo();
    let src32 = '';
    let src64 = '';
    if (petInfo) {
        src32 = src64 = 
    }
    else {
        const url32 = chrome.runtime.getURL('/icon/32.png');
        const url64 = chrome.runtime.getURL('/icon/64.png');
    }
    
    const src = getProfilePhotoSrc(petInfo);
    console.log(src);



    const profilePhotoEl = document.querySelector('.gb_q.gbii');
    if (profilePhotoEl) {
        profilePhotoEl.src = src;
        profilePhotoEl.srcset = photoEl.srcset = `${src32} 1x, ${src64} 2x`;
    }
}