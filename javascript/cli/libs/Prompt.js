const printf = console.log

function prompt( blessed, screen, string ) {

    var prompt = blessed.prompt({
        parent: screen,
        border: 'line',
        height: 'shrink',
        width: 'half',
        top: 'center',
        left: 'center',
        label: ' {blue-fg}Prompt{/blue-fg} ',
        tags: true,
        keys: true,
        vi: true
    });

    var question = blessed.question({
        parent: screen,
        border: 'line',
        height: 'shrink',
        width: 'half',
        top: 'center',
        left: 'center',
        label: ' {blue-fg}Question{/blue-fg} ',
        tags: true,
        keys: true,
        vi: true
    });

    var msg = blessed.message({
        parent: screen,
        border: 'line',
        height: 'shrink',
        width: 'half',
        top: 'center',
        left: 'center',
        label: ' {blue-fg}Message{/blue-fg} ',
        tags: true,
        keys: true,
        hidden: true,
        vi: true
    });

    var loader = blessed.loading({
        parent: screen,
        border: 'line',
        height: 'shrink',
        width: 'half',
        top: 'center',
        left: 'center',
        label: ' {blue-fg}Loader{/blue-fg} ',
        tags: true,
        keys: true,
        hidden: true,
        vi: true
    });

    prompt.input(string, '', function(err, value) {
        question.ask('Question?', function(err, value) {
            screen.destroy();
        });
    });


    /*
    prompt.input('Question?', '', function(err, value) {
        question.ask('Question?', function(err, value) {
            msg.display('Hello world!', 3, function(err) {
                msg.display('Hello world again!', -1, function(err) {
                    loader.load('Loading...');
                    setTimeout(function() {
                        loader.stop();
                        screen.destroy();
                    }, 3000);
                });
            });
        });
    });
    */

    screen.key('q', function() {
        screen.destroy();
    });

    screen.render();
}

module.exports = prompt
