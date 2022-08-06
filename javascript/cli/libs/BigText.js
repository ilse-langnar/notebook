const printf = console.log

function big_text( blessed, screen ) {

    var box = blessed.bigtext({
      parent: screen,
      content: 'Hello',
      shrink: true,
      width: '80%',
      // height: '80%',
      height: 'shrink',
      // width: 'shrink',
      border: 'line',
      fch: ' ',
      ch: '\u2592',
      style: {
        fg: 'red',
        bg: 'blue',
        bold: false
      }
    });

    screen.key('q', function() {
      return screen.destroy();
    });

    screen.render();

}

module.exports = big_text
