class Interactable {
    constructor(type, src, position, containerEl, size) {
        this.type = type;
        this.width = size || 100; // in px
        this.el = this.#createImgEl(src);
        this.containerEl = containerEl;

        if (position && position.x && position.y) {
            if (containerEl) this.#positionInBounds(position.x, position.y);
            else this.#position(position.x, position.y);
            
        }
    }

    /* Public functions */



    /* Private functions */

    #createImgEl(src) {
        const el = document.createElement('img');
        el.src = src;
        el.style.position = 'absolute';
        el.style.width = '100px';

        el.classList.add('interactable');

        return el;
    }

    #position(x, y) {
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }

    #positionInBounds(x, y) {
        if (x ) {

        }
    }

    #move(xDis, yDis) {

    }
}

export { Interactable };