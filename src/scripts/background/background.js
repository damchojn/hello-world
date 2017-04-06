chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'copy-to-email': {
      chrome.tabs.executeScript(null, { file: 'scripts/copy-to-email.js' });
      break;
    }
    default: {
      console.log('Unrecognized command');
    }
  }
});

let clipboard = new Clipboard();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'copy-to-clipboard': {
      let { Url, Title, Id } = message.data;
      clipboard.copy({
        html: `<a href='${Url}'>${Id}</a>: <em>${Title}</em><br><p></p>`,
        text: `${Id}: ${Title}`
      });
      sendResponse({isSuccess: true});
      break;
    }
    default: {
      console.log(`Unrecognized message type [${message.type}]`);
    }
  }
  return true;
});

