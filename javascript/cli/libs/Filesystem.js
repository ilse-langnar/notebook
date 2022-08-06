const printf = console.log

function Filesystem( blessed, location = null ) {

    if( !location ) throw new Error( "ERROR: Filesystem.js -> location IS NULL" )

    var fm = blessed.filemanager({
        parent: screen,
        border: 'line',
        style: {
            selected: {
                bg: 'blue'
            }
        },
        height: 'half',
        width: 'half',
        top: 'center',
        left: 'center',
        label: ' {blue-fg}%path{/blue-fg} ',
        // cwd: process.env.HOME,
        // cwd: "/home/viktor/Downloads/zettel/",
        cwd: location,
        keys: true,
        vi: true,
        scrollbar: {
            bg: 'white',
            ch: ' '
        }
    });

    var box = blessed.box({
        parent: screen,
        style: {
            bg: 'green'
        },
        border: 'line',
        height: 'half',
        width: 'half',
        top: 'center',
        left: 'center',
        hidden: true
    });

    fm.refresh();

    screen.render();

    screen.key('q', function() {
        screen.destroy();
    });

    fm.key( "enter", function( event ) {
        printf( "Filesystem -> Event -> ", event )
    })

    screen.key(['s', 'p'], function() {
        fm.hide();
        screen.render();
        setTimeout(function() {
            fm.pick(function(err, file) {
                box.show();
                box.setContent(err ? err + '' : file);
                screen.render();
                setTimeout(function() {
                    box.hide();
                    fm.reset(function() {
                        fm.show();
                        screen.render();
                    });
                }, 2000);
            });
        }, 2000);
    });
}

module.exports = Filesystem
