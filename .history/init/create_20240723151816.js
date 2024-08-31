handleRipple();
handleNext();

function handleRipple() {
    const rippleTime = 200;
    const buttons = document.querySelectorAll('button');
    buttons.forEach((b)=> {
        b.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let x = e.clientX - e.currentTarget.offsetLeft;
            let y = e.clientY - e.currentTarget.offsetTop;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            setTimeout(() => {
                ripple.remove();
            }, rippleTime);
        })
    })
}

function handleNext() {
    const nextButton = document.getElementById('next');
    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');
    nextButton.addEventListener('click', ()=> {
        const inputs = document.getElementById('input-div').querySelectorAll('input');
        const res = anyInvalid(inputs);
        if (res) {
            warning.textContent = res;
            warning.style.display = 'block';
        }
        else {
            console.log('all good!');
        }
    })
}

function anyInvalid(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (isInvalid(inputs[i])) {
            return inputs[i].getAttribute('aria-label');
        }
    }
    return false;
}

function isInvalid(input) {
    return input.value.trim() === '';
}