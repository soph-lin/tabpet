class FormPage {
    constructor(name, title, desc) {
        this.name = name;
        this.title = title;
        this.desc = desc;
    }
}

class InvalidInputs {
    constructor() {
        this.info = {}; // Dictionary for invalid inputs info, indexed by aria-label
        this.stack = [];  // Stack of unique invalid inputs, by label
    }

    add(label, el, msg) {
        if (label in this.info) { // If input already invalid, update message only
            this.info[label].msg = msg;
        }
        else { // Create new input and log
            this.stack.push(label);
            this.info[label] = {
                el: el,
                msg: msg
            };
        }

        this.displayInvalid(label);
    }

    remove(label) {
        const indexInList = this.stack.indexOf(label);
        const inList = indexInList !== -1;
        const inInfo = label in this.info;

        if (!inList || !inInfo) {
            if (!inList) console.error(`${label} not in stack:` + this.stack);
            if (!inInfo) console.error(`${label} not in info: ` + this.info); 
            return;
        }

        // clear aria-invalid on element
        this.displayValid(label);
        
        // remove from storage
        this.info[label] = null;
        this.splice(indexInList, 1);
    }

    clear() {
        this.list.forEach(label => {
            this.displayValid(label);
        });
    }

    /* For appearance */
    displayValid(label) {
        if (label in this.info) {
            const el = this.info[label].el;
            el.setAttribute('aria-invalid', false);
        }
        else {
            console.error(`${label} not found in info: ${this.info}`);
        }
    }

    displayInvalid(label) {
        if (label in this.info) {
            const el = this.info[label].el;
            el.setAttribute('aria-invalid', true);
        }
        else {
            console.error(`${label} not found in info: ${this.info}`);
        }
    }

    updateWarning(msg) {
        const warningContainer = document.querySelector('.warning');
        const warningText = document.querySelector('.warning-text');
        warningText.textContent = msg;
        warningContainer.style.display = 'block';
        input.setAttribute('aria-invalid', true);
        input.focus();
    }
}

export { FormPage , InvalidInputs };