class Pet {
    constructor(type) {
        this.type = type;
        this.container = this.#createEl();
    }

    #createEl() { // Create elements of pet, return outermost element
        const moveEl = document.createElement('div');
            moveEl.classList.add('move');
        const flipEl = document.createElement('flip');
            flipEl.classList.add('flip');
        const animEl = document.createElement('div');
            animEl.classList.add('anim');
        const imgEl = document.createElement('img');
        imgEl

        this.imgEl = imgEl;

        return moveEl;
    }
}