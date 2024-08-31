const samplePetInfo = {
    "type": "gerbil",
    "subtype": "White",
    "firstName": "Lotus",
    "lastName": "Head",
    "month": "1",
    "day": "1",
    "year": "2020",
    "gender": "Female",
    "selectPhoto": "2"
};

function formatFullName(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    return name;
}

function formatBirthday(savedInputs) { // Return birthday with month typed out
    return new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString(); // Month is indexed at 0
}

function getProfilePhotoSrc(savedInputs) {
    if (savedInputs.selectPhoto === 'Custom') return savedInputs.photoUpload;
    else return chrome.runtime.getURL(`/profile-photos/${savedInputs.selectPhoto}.png`);
}


export { formatFullName, formatBirthday , getProfilePhotoSrc };