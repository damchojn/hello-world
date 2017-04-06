const DEFAULTS = {
  fontFamily: 'Calibri',
  fontSize: '11pt'
}

class Storage {

  constructor() { // Set Defaults
    this.getCustomFontFamily()
    .then(fontFamily => fontFamily ? null : this.setCustomFontFamily(DEFAULTS.fontFamily));

    this.getCustomFontSize()
    .then(fontSize => fontSize ? null : this.setCustomFontSize(DEFAULTS.fontSize));
  }

  get(propertyKey) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(propertyKey, o => resolve(o[propertyKey]));
    })
  }

  set(propertyKey, value) {
    let o = {};
    o[propertyKey] = value;
    chrome.storage.local.set(o);
  }

  ////////////////////////////////////////
  // Configuration
  //

  setCustomFontFamily(fontFamily) {
    this.set('FONT_FAMILY', fontFamily);
  }
  getCustomFontFamily() {
    return this.get('FONT_FAMILY');
  }

  setCustomFontSize(fontSize) {
    this.set('FONT_SIZE', fontSize);
  }
  getCustomFontSize() {
    return this.get('FONT_SIZE');
  }
}

const storage = new Storage();