import { randomIntFromRange } from '/utils/general-utils.js';
import { removeElement } from '/utils/content-utils.js';

class Particle {
    constructor(type, position) {
        this.containerEl = this.create(type);

        const xOffset = 50;
        this.x = randomIntFromRange(position.x - xOffset, position.x + xOffset);
        this.y = position.y;

        this.maxTime = randomIntFromRange(2000, 5000); // In milliseconds
        this.xSpeed = randomIntFromRange(10, 30);
        this.ySpeed = randomIntFromRange(10, 50);
    }

    handleFloat() {
        this.updateTime = 1000;
        this.timeLapsed = 0;
        this.floatInterval = setInterval(this.float.bind(this), this.updateTime);
    }

    float() { // Fly up and sway
        let xDir = randomIntFromRange(-1, 1); // Either -1, 0, or 1
        this.x += this.xSpeed * xDir;
        this.y -= this.ySpeed;
        this.setPosition();
        this.timeLapsed += this.updateTime;
        // if (this.timeLapsed >= this.maxTime) this.disappear();
    }

    create(type) {
        const img = document.createElement('img');
        img.classList.add('particle');
        if (type === 'heart') img.src = chrome.runtime.getURL('/assets/particle/heart.png');
        img.style.width = `${randomIntFromRange(50, 100)}px`;
        return img;
    }

    setPosition() {
        this.containerEl.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    disappear() {
        clearInterval(this.floatInterval);
        removeElement(this.containerEl);
    }
}

function createParticles(type, position, parentContainer, n=1) {
    for (let i = 0; i < n; i++) {
        const particle = new Particle(type, position);
        parentContainer.appendChild(particle.containerEl);
        particle.handleFloat();
    }
}

export { createParticles };