function initMsgEl() {
    const msgEl = document.createElement('div');
    msgEl.classList.add('ui');
    msgEl.classList.add('ui-msg');
    msgEl.textContent = 'This is a message';
    document.body.append(msgEl);
    return msgEl;
}

function createMsg(content, type) {
    msgEl.textContent = content;
    animMsg('fadeout');
}

function animMsg(anim) {
    if (anim === 'fadeout') {
        msgEl.style.animation = `1s fadeout`
    }
}

function elOutOfBounds() {

}

export { initMsgEl, createMsg };