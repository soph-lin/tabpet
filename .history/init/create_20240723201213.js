let pageNum = null;
let currentPageEl = null;


handleRipple();
handlePaging();

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

function handlePaging() {
    const pages = [
        'name',
        'birthdaygender'
    ];

    // init page
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        pageNum = urlParams.get('page');
        for (const param of urlParams) console.log(param);
        console.log(pageNum);
    } 
    else { // newly entered form, add params to url

        updatePage(pages, 0);
        currentPageEl = document.getElementById();
        pageNum = 0;
    }

    // page changes

    window.addEventListener('popstate', (e)=> {
        let newPageNum = e.state.page;
        if (!newPageNum) {
            console.error('Page number not found in state');
            pageNum = newPageNum;
        }
    })

    handleNext(pages);
}

function handleNext(pages) {
    const nextButton = document.getElementById('next');
    const warningContainer = document.querySelector('.warning');
    const warningText = document.querySelector('.warning-text');

    nextButton.addEventListener('click', ()=> {
        const inputs = document.getElementById('inputs-div').querySelectorAll('input');
        const res = anyInvalid(inputs);
        if (res) { // invalid input
            warningText.textContent = `Enter ${res.getAttribute('aria-label')}`;
            warningContainer.style.display = 'block';
            res.setAttribute('aria-invalid', true);
            res.select();
        }
        else { // move to next page
            console.log('moving on!');
            updatePage(pages, ++pageNum);
        }
    })
}

function updatePage(pages, pageNum) {
    const state = { page: pageNum };
    history.pushState(state, '', `?${pages[pageNum]}&page=${pageNum}`);

    // first page, already initialized
    if (pageNum == 0) {
        return;
    }

    // update page if not

}

function anyInvalid(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        if (isInvalid(inputs[i])) {
            return inputs[i];
        }
    }
    return false;
}

function isInvalid(input) {
    const ariaRequired = input.getAttribute('aria-required');
    if (!ariaRequired || ariaRequired === 'false') {
        return false;
    }
    else {
        return input.value.trim() === '';
    }
}