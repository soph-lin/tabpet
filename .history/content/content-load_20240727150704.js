/* Dynamic import to allow content script to import modules */
(async () => {
    const mainContentScript = await import('/content-main.js');
    mainContentScript.main();
})();