
let clipboardBuffer = $('<textarea></textarea>');
$(() => { clipboardBuffer.appendTo('body'); });

class Clipboard {
  copy({html, text}) {
    clipboardBuffer.val(text);
    clipboardBuffer.select();

    var oncopyBackup = document.oncopy;
    document.oncopy = (e) => {
      e.preventDefault();
      e.clipboardData.setData('text/html', html);
      e.clipboardData.setData('text/plain', text);
    };
    document.execCommand('copy');
    document.oncopy = oncopyBackup;
  }
}