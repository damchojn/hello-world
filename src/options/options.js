function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

getValue = (selector) =>
    document.getElementById(selector).value;

setValue = (selector, value) =>
    document.getElementById(selector).value = value;

ready(() => {
    storage.getCustomFontFamily()
        .then(fontFamily => setValue('copy-custom-font-family', fontFamily));

    storage.getCustomFontSize()
        .then(fontSize => setValue('copy-custom-font-size', fontSize));
})

document.getElementById('save')
    .addEventListener('click', () => {
        storage.setCustomFontFamily(getValue('copy-custom-font-family'));
        storage.setCustomFontSize(getValue('copy-custom-font-size'));
        chrome.runtime.sendMessage({
            type: 'options-changed'
        }, close);
    });