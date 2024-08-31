import { randomFromRange } from '/utils/general-utils';

function randomPosInsideEl(el) {
    const rect = el.getBoundingClientRect();
    if (!rect) throw new Error(`Element's bounding client rect is undefined`, 'Element: ', el, 'Rect: ', rect);
    const x = randomFromRange(this.left, this.right);
    const y = randomFromRange(this.top, this.bottom);
    return {x: x, y: y};
}

export { randomPosInsideEl };