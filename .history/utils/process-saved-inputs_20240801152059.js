function getProcessedPersonalInfo(savedInputs) {
    let name = savedInputs.firstName;
    if (savedInputs.lastName) name += ' ' + savedInputs.lastName;

    const birthday = new Date(savedInputs.year, savedInputs.month - 1, savedInputs.year).toDateString;
    return {};
}

export { getProcessedPersonalInfo };