/*

    Script for managing form. Notable behaviors:
    - On reload, form restarts.
    - Can't change form params, as it will force reload and restart form.

*/

import { FormPage , FormManager } from '/init/classes.js';

let pageNum = 1; // pageNum starts at 1
let currentPageEl = document.getElementById('page-1');
let savedInputs = {};
const formManager = new FormManager();
const testingPage = true;

formManager.handleValidatePattern();
handlePaging();

function getInputs() {
    if (!currentPageEl) {
        console.error('current page element not initialized');
    }
    return currentPageEl.querySelectorAll('input, select');
}

function restartFormOnReload() {
    const urlWithoutParams = window.location.origin + window.location.pathname;
    history.replaceState(createState(1), '', urlWithoutParams);
}

function handlePaging() {
    const pages = [
        new FormPage('color', 'Create a Google', 'Choose a color'),
        new FormPage('name', 'Create a Google', 'Enter a name'),
        new FormPage('birthdaygender', 'Basic information', 'Enter a birthday and gender'),
        new FormPage('profilephoto', 'Profile photo', 'Choose a photo or upload your own')
    ];

    if (testingPage) {
        loadPage(pages);
    }
    else {
        restartFormOnReload();
    }

    handlePhotoUpload();

    // page changes

    window.addEventListener('popstate', (e)=> {
        let newPageNum = e.state.page;
        if (!newPageNum) {
            console.error('Page number not found in state');
        }
        pageNum = newPageNum;

        formManager.clear();
        displayNewPage(pages, pageNum);
    })

    handleNext(pages);
}

function loadPage(pages) {
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        pageNum = urlParams.get('page');
        if (pageNum < 1 || pageNum > pages.length) { // invalid page number
            // hide initialized page and description
            currentPageEl.style.display = 'none';
            const errorEl = document.getElementById('error');
            const descEl = document.getElementById('desc');
            descEl.style.display = 'none';

            // show error message
            errorEl.textContent = `Error, please re-complete the form. Click "Next" to proceed.`;
            errorEl.style.display = 'block';

            // reload form on clicking next button
            handleNextError();

            return; // don't do anything later in handlePaging()
        }
        else {
            displayNewPage(pages, pageNum);
        }
    }
    else { // newly entered form, add params to url
        pageNum = 1;
        updatePageURL(pages, 1);
    }
}

function handlePhotoUpload() {
    const photoContainer = document.getElementById('photo-container');
    const photo = document.getElementById('photo');
    const photoUpload = document.getElementById('photo-upload');
    const selectPhoto = document.getElementById('select-photo');
    let lastSelectValue = '0';
    let isFileDialogOpen = false;
    let processingFile = false; // Ensures reverting to original doesn't happen before file is processed in photoUpload

    selectPhoto.addEventListener('input', function() {
        if (this.value === 'Custom') { // TODO: User can't select same option 'Custom' twice and reupload
            photoUpload.click();
        }
        else {
            photo.src = `/profile-photos/${this.value}.png`;
            lastSelectValue = this.value;
        }
    })

    photoContainer.addEventListener('click', ()=> { // Click on photo container to upload custom photo
        photoUpload.click();
    });

    photoContainer.addEventListener('dragover', (e)=> { // Drag to photo container to  custom photo
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    photoContainer.addEventListener('drop', (e)=> { // Drop to photo container to upload custom photo
        e.stopPropagation();
        e.preventDefault();
        photoUpload.files = e.dataTransfer.files;
        photo.src = window.URL.createObjectURL(photoUpload.files[0]);
    });

    photoUpload.addEventListener('click', ()=> {
        isFileDialogOpen = true;
    })

    photoUpload.addEventListener('change', (e)=> {
        const files = e.target.files;
        if (files && files[0]) {
            uploadCustomPhoto(files);
        }
    })

    photoUpload.addEventListener('blur', ()=> {
        console.log('blur');
        isFileDialogOpen = true; // If file upload loses focus, file dialog may still be open
    });

    window.addEventListener('focus', ()=> {
        if (isFileDialogOpen && !processingFile) { // File dialog is closed AND not processing file
            isFileDialogOpen = false;
            const customPhotos = photoUpload.files;
            console.log(customPhotos);
            if (customPhotos[0]) { // Change to previous custom photo if exists
                uploadCustomPhoto(customPhotos[0]);
            }
            else { // Else, revert photo back to last selected value
                selectPhoto.value = lastSelectValue; 
            }
        }
    })

    function setCustomPhoto(files) {
        processingFile = true;
        console.log('uploading file');
        console.log(files[0]);
        photo.src = window.URL.createObjectURL(files[0]);
        selectPhoto.value = lastSelectValue = 'Custom';
        processingFile = false;
    }
}

function handleNext(pages) {
    const nextButton = document.getElementById('next');

    nextButton.addEventListener('click', ()=> {
        if (!currentPageEl) {
            currentPageEl = document.getElementById(`page-${pageNum}`);
        }

        const isPageComplete = formManager.checkCurrentQuestions(currentPageEl) === null; // Returns null if no empty required answers.

        if (isPageComplete) {
            console.log('Moving on!');
            console.log('Saved inputs on next:'); // This ONLY saves inputs on Next button.
            console.log(formManager.savedInputs);
            pageNum++;
            if (pageNum <= pages.length && document.getElementById(`page-${pageNum}`)) { // Next page exists
                updatePageURL(pages, pageNum);
                displayNewPage(pages, pageNum);
            }
            else {
                console.log('end!');
            }
        }
    })
}

function updatePageURL(pages, pageNum) {
    const state = createState(pageNum);
    const name = pages[pageNum - 1].name; // since pageNum starts at 1
    history.pushState(state, '', `?${name}&page=${pageNum}`);
}

function createState(pageNum) {
    return { page: pageNum };
}

function displayNewPage(pages, pageNum) {
    // hide content until done loading
    const contentEl = document.getElementById('content');
    contentEl.style.display = 'none';

    // hide last page
    const lastPageEl = currentPageEl;
    if (lastPageEl) { 
        lastPageEl.style.display = 'none';
    }
    else { // on reload, currentPageEl will initially be null
        const firstPageEl = document.getElementById('page-1');
        firstPageEl.style.display = 'none';
    }

    // update instructions
    const pageInfo = pages[pageNum - 1];
    document.getElementById('title').textContent = pageInfo.title;
    document.getElementById('desc').textContent = pageInfo.desc;

    // show current page
    currentPageEl = document.getElementById(`page-${pageNum}`);
    
    if (!currentPageEl) {
        console.error(`Page element of ${pageNum} index not found!`);
    }

    currentPageEl.style.display = 'block';

    // show content
    contentEl.style.display = 'block';
}

function loadSavedInputs() { /* This isn't needed since form saves and clears by session. (Either by reload or new URL) */
    if (Object.keys(savedInputs).length === 0) { // no saved inputs
        return;
    }
    if (!currentPageEl) {
        console.error('No current page element set');
    }
    const inputs = getInputs();
    inputs.forEach((input)=> {
        const label = input.getAttribute('aria-label');
        if (label in savedInputs) {
            input.value = savedInputs[label];
        }
    });
}