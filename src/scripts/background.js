chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'copy-to-email': {
      chrome.tabs.executeScript(null, { file: "scripts/copy-to-email.js" });
      break;
    }
    default: {
      console.log('Unrecognized command');
    }
  }
});