function isColliding(a, b) { // Given two items a and b (can be either element or point), return information on if a and b are colliding and where b is in relation to a.
    const aInfo = getLeftRightTopBottom(a);
    const bInfo = getLeftRightTopBottom(a);
    if (!aInfo || !bInfo) throw new Error('a and/or b is not a position or element with client rect', a, b);

    const toLeft = aDims.left > bDims.right;
    const toRight = aDims.right < bDims.left;
    const above = aDims.top > bDims.bottom;
    const below = aDims.bottom < bDims.top;

    const yes = !(toLeft || !toRight || !above || !below);
    return {
        yes: yes,
        toLeft: toLeft,
        toRight: toRight,
        above: above,
        below: below
    };
}

function getLeftRightTopBottom(param) { // Param is either point or element
    if (isPt(param)) { // If point, left/right and top/bottom are collapsed as same.
        return {left: param.x, right: param.x, top: param.y, bottom: param.y};
    }
    else if (isEl(param)) {
        const rect = param.getBoundingClientRect();
        return {left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom};
    }
    else {
        return null;
    }
}

function isPt(pt) {
    return pt.x && pt.y;
} 

function isEl(el) {
    return el instanceof HTMLElement;
}