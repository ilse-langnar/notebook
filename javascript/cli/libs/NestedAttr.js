const printf = console.log


function nested_attr( blessed, screen ) {

    blessed.box({
      parent: screen,
      left: 'center',
      top: 'center',
      width: '80%',
      height: '80%',
      style: {
        bg: 'black',
        fg: 'yellow'
      },
      tags: true,
      border: 'line',
      content: '{red-fg}hello {blue-fg}how{/blue-fg}'
        + ' {yellow-bg}are{/yellow-bg} you?{/red-fg}'
    });

    screen.key('q', function() {
      return screen.destroy();
    });

    screen.render();

}

module.exports = nested_attr
