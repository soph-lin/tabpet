function overlaps1(obj1, obj2) {  
    const rect1 = obj1.getBoundingClientRect();    
    const rect2 = obj2.getBoundingClientRect();      
    return (rect1.x + rect1.width >= rect2.x && rect1.x <= rect2.x + rect2.width) &&
           (rect1.y + rect1.height >= rect2.y && rect1.y <= rect2.y + rect2.height)
  }

function overlaps(a, b) {
    const aDims = a.getBoundingClientRect();
    const bDims = b.getBoundingClientRect();
    if (!aDims || !bDims) return null;
    console.log('a dims', aDims);
    console.log('b dims', bDims);

    return !(   aDims.right < bDims.left || 
                aDims.left > bDims.right ||
                aDims.bottom < bDims.top ||
                aDims.top > bDims.bottom);
}

function resetCursor(el) {
    el.style.cursor = '';
}

function setCursor(el, type) {
    el.style.cursor = type;
}

function isInside(pos, el) { // Returns position relative to element if inside element
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

export { overlaps, isColliding, resetCursor, setCursor, isInside };