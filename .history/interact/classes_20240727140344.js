class Interactable {
    constructor(type, src) {
        this.type = type;
        this.el = document.createElement('img');
        this.el.src = src;
    }

    /* Public functions */

    

    /* Private functions */

    #getCursorPosition(e) {
        return {x: e.clientX, y: e.clientY};
    }
}

export { Interactable };