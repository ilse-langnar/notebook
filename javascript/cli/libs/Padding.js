const printf = console.log

function padding( blessed, screen ) {

    blessed.box({
      parent: screen,
      border: 'line',
      style: {
        bg: 'red',
      },
      content: 'hello world\nhi',
      align: 'center',
      left: 'center',
      top: 'center',
      width: 22,
      height: 10,
      padding: 2
    });

    screen.key('q', function() {
      return screen.destroy();
    });

    screen.render();

}
module.exports = padding
