const printf = console.log

function nowrap( blessed, screen ) {

    var fs = require('fs')

    // {open}xxxx{close} xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
    // xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx {red-bg}xxxx xxxx xxxx{/red-bg}


    var box = blessed.box({
      parent: screen,
      width: 60,
      wrap: false,
      tags: true,
      content: fs.readFileSync(__filename, 'utf8')
      //content: '{red-bg}' + blessed.escape('{{{{{}{bold}x{/bold}}') + '{/red-bg}'
      //  + '\nescaped: {green-fg}{escape}{{{}{{a{bold}b{/bold}c{/escape}{/green-fg}'
    });

    box.focus();

    screen.key('q', function() {
      return screen.destroy();
    });

    screen.render();

}

module.exports = nowrap
