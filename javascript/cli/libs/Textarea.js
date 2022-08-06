

function textarea( blessed, screen ) {

    var box = blessed.textarea({
      parent: screen,
      // Possibly support:
      // align: 'center',
      style: {
        bg: 'blue'
      },
      height: 'half',
      width: 'half',
      top: 'center',
      left: 'center',
      tags: true
    });

    screen.render();

    screen.key('q', function() {
      screen.destroy();
    });

    screen.key('i', function() {
      box.readInput(function() {});
    });

    screen.key('e', function() {
      box.readEditor(function() {});
    });

}

module.exports = textarea
