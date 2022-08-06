const printf = console.log


function noalt( blessed, screen ) {

    var list = blessed.list({
      parent: screen,
      align: 'center',
      mouse: true,
      keys: true,
      vi: true,
      width: '50%',
      height: 'shrink',
      //border: 'line',
      top: 5,
      //bottom: 2,
      left: 0,
      style: {
        fg: 'blue',
        bg: 'default',
        selected: {
          bg: 'green'
        }
      },
      items: [
        'one',
        'two',
        'three'
      ]
    });

    list.select(0);

    list.on('select', function(item) {
      console.log(item.getText());
      screen.destroy();
    });

    screen.key('C-c', function() {
      screen.destroy();
    });

    list.focus();

    screen.render();
}

module.exports = noalt
