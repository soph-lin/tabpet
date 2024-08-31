import { Interactable } from '/interact/classes/interactable.js';

/* Handling Interactables */

function isInteractableEl(el) { // Recursive function, returns interactable element by searching parents
    if (el.classList.contains('interactable')) return el;
    else if (el.classList.contains('interactable-child') && el.parentElement) return isInteractableEl(el.parentElement);
    else return null;
}

function isInteractable(x) {
    return x instanceof Interactable;
}

function isFood(food) {
    return isInteractable(food) && food.type === 'food';
}

/* Elements */
function waitUntilImgLoaded(imgEl) {
    return new Promise((resolve, reject)=> {
        if (!imgEl) reject('');

        imgEl.addEventListener('load', ()=>{
            resolve();
        });
    })
}

/* Position functions

    Note that isElAtPos, isTouching, and isPosInsideEl have similar code, but are semantically different and/or have different params.
    TODO: Refactor isElAtPos and isTouching into same function.
*/

function randomPosInsideEl(el) {
    const dims = el.getBoundingClientRect();

}

function collisionLogic(toLeft, toRight, above, below) {
    const yes = !(toLeft || !toRight || !above || !below);
    return {
        yes: yes,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function isElAtPos(el, pos) { // Returns info on where pos is in relation to el.
    if (!pos.x || !pos.y) throw new Error('Position must have x and y defined', pos);
    const dims = el.getBoundingClientRect();
    return collisionLogic(pos.x < dims.left, pos.x > dims.right, pos.y > dims.top, pos.y < dims.bottom);
}

function isTouching(a, b) { // Given two elements a and b, returns information on if a and b are touching and where b is in relation to a.
    const aDims = a.getBoundingClientRect();
    const bDims = b.getBoundingClientRect();
    if (!aDims || !bDims) return null;

    return collisionLogic(aDims.left > bDims.right, aDims.right < bDims.left, aDims.top > bDims.bottom, aDims.bottom < bDims.top);
}

function isAt(a, b) {
    
}

function isPosInsideEl(pos, el) { // Returns position relative to element if inside element.
    return new Promise((resolve)=> {
        if (!pos) {
            throw new Error('Position not found', pos);
        } 
        const elDimensions = el.getBoundingClientRect();
        let relativePos = null;

        if (pos.x >= elDimensions.left && pos.x <= elDimensions.right && pos.y >= elDimensions.top && pos.y <= elDimensions.bottom) { 
            relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top}; // If is inside, set relative position
        }
        resolve(relativePos);
    })
}

/* Cursor functions */

function resetCursor(el) {
    el.style.cursor = '';
}

function setCursor(el, type) {
    el.style.cursor = type;
}

/* Old cursor position getters by detecting position right after mouse movement */
function getCursorPosition() { // Returns cursor position right after mouse movement
    return new Promise((resolve)=> {
        document.addEventListener('mousemove', (e)=> {
            resolve({x: e.clientX, y: e.clientY});
        }, {once: true});
    })
}

function getCursorPositionRelativeTo(el) { // Returns cursor position relative to element
    return new Promise(async (resolve)=> {
        const pos = await getCursorPosition();
        const elDimensions = el.getBoundingClientRect();
        const relativePos = {x: pos.x - elDimensions.left, y: pos.y - elDimensions.top};
        resolve(relativePos);
    });
}

export { isInteractableEl, isInteractable, isFood, waitUntilImgLoaded, isElAtPos, isTouching, resetCursor, setCursor, isPosInsideEl };