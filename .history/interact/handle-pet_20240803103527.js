/* TODO: allocate event handling to Event class & Behavior/Event Manager script (to stop() and start() events easily)
- Use settimeout
- Each event has their own timeout id
- Params to reset
*/
import { Pet } from '/interact/classes/pet.js';
import { randomFromRange, randomFromArray , minAsMillisec } from '/utils/general-utils.js'; 
import { getCursor } from '/utils/cursor-utils.js';
import { randomPosInsideEl } from '/utils/position.js';
import { getPetInfo } from '/utils/pet-info.js';
import { getCreatedElement } from '/utils/content-utils.js';

let interactContainer = null;
let pet = null;
let idleTimeoutID = null;
let behaviorLoopID = null;

export default async function handlePet() {
    interactContainer = await getCreatedElement('interact-container');
    pet = await createPet();
    handleEvents();
    handleBehavior();
    randomEmote();
}

function createPet() {
    return new Promise(async (resolve)=> {
        let petInfo = await getPetInfo();
        if (!petInfo) throw new Error('Pet info not defined');

        const createParams = {type: petInfo.type, subtype: petInfo.subtype};
        const pet = new Pet(createParams, petInfo);
        if (interactContainer) interactContainer.appendChild(pet.outerEl);
        resolve(pet);
    })
}

function handleEvents() {
    document.addEventListener('handleInteractable:interactable-created', (e)=> {
        const type = e.detail.type;
        const obj = e.detail.obj;
        if (type === 'food' && obj) pet.addInteractEvent('eat', {food: obj});
    });
    document.addEventListener('click', (e)=> {
        const elClicked = e.target;
        if (!pet.ongoingEvent && !elClicked.noPetFollow) moveToCursor();
    })
}

function handleBehavior() {
    const updateTime = 1000;

    behaviorLoopID = setInterval(async function() {
        if (pet.ongoingEvent) return;
        if (pet.events.length > 0) {
            stopIdle();
            const completed = await pet.executeEvent(pet.events[0]); // Execute first event in queue
            if (completed) pet.events.shift(); // Remove first event if completed, otherwise retain in queue to call again
            pet.emote.idleEmote();
        }
        else if (!idleTimeoutID){ // Do random idle event after some time
            pet.emote.idleEmote();
            idleTimeoutID = setTimeout(idleEvent, randomIdleTime());
        }
    }, updateTime);
}

/* Specific behavior */

function moveToCursor() {
    const cursor = getCursor();
    if (pet.moving && pet.currentLoopID) {
        clearInterval(pet.currentLoopID); // Stop current movement
        pet.moving = false; // Enable moveTo to be called again 
    }
    stopIdle();
    if (cursor && cursor.pos) pet.moveTo(cursor.pos);
}

/* Idle behavior */

function idleEvent() {
    console.log('idle event');
    
    const events = [
        randomPose,
        randomMove,
        randomEmote,
        randomFlip
    ];
    randomFromArray(events)();
    idleTimeoutID = null;
}

function stopIdle() {
    if (!idleTimeoutID) return;
    clearTimeout(idleTimeoutID);
    idleTimeoutID = null;
}

function randomIdleTime() {
    console.log('get idle time');
    const min = minAsMillisec(0.1);
    const max = minAsMillisec(1);
    return randomFromRange(min, max);
}

function randomPose() {
    if (pet.moving) return; // If pet is moving (pose is set as 'side'), don't change pose 
    const allPoses = pet.poses;
    const currentPose = pet.currentPose;
    const newPoses = allPoses.filter(pose => pose !== currentPose); // Get all poses except current pose
    const randomPose = randomFromArray(newPoses);
    pet.setPose(randomPose);
}

function randomMove() {
    pet.moveTo(randomPosInsideEl(interactContainer));
}

function randomEmote() {
    pet.emote.randomEmote();
}

function randomFlip() {
    pet.flip();
}