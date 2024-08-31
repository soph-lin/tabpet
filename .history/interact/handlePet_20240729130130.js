import { Pet } from '/interact/classes/pet.js';

let interactContainer = null;

export async function handlePet() {
    interactContainer = await getInteractContainer();
    createPet();
}

function getInteractContainer() {
    return new Promise((resolve)=> {
        let el = document.getElementById('interact-container');

        // Interact container already created, resolve
        if (el) resolve(el);

        // Wait for interact container to be created
        document.addEventListener('handleInteractable:interact-container-created', ()=> {
            resolve(document.getElementById('interact-container'));
        }, {once: true});
    })
}

function createPet() {
    const createParams = {type: 'gerbil', subtype: 'white'};
    const personalInfo = getPersonalInfo();
    const pet = new Pet(createParams, personalInfo);
    document.body.appendChild(pet.outerEl);
}

function getPersonalInfo() {
    return {};
}