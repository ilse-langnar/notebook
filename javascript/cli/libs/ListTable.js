const printf = console.log

function list_table( blessed, screen ) {
    var DU = '杜';
    var JUAN = '鹃';

    var table = blessed.listtable({
      //parent: screen,
      top: 'center',
      left: 'center',
      data: null,
      border: 'line',
      align: 'center',
      tags: true,
      keys: true,
      //width: '80%',
      width: 'shrink',
      height: '70%',
      vi: true,
      mouse: true,
      style: {
        border: {
          fg: 'red'
        },
        header: {
          fg: 'blue',
          bold: true
        },
        cell: {
          fg: 'magenta',
          selected: {
            bg: 'blue'
          }
        }
      }
    });

    var data1 = [
      [ 'Animals',  'Foods',  'Times'  ],
      [ 'Elephant', 'Apple',  '1:00am' ],
      [ 'Bird',     'Orange', '2:15pm' ],
      [ 'T-Rex',    'Taco',   '8:45am' ],
      [ 'Mouse',    'Cheese', '9:05am' ]
    ];

    // data1[1][0] = '{red-fg}' + data1[1][0] + '{/red-fg}';
    // data1[2][0] += ' (' + DU + JUAN + ')';

    var data2 = [
      [ 'Animals',  'Foods',  'Times',   'Numbers' ],
      [ 'Elephant', 'Apple',  '1:00am',  'One'     ],
      [ 'Bird',     'Orange', '2:15pm',  'Two'     ],
      [ 'T-Rex',    'Taco',   '8:45am',  'Three'   ],
      [ 'Mouse',    'Cheese', '9:05am',  'Four'    ]
    ];

    data2[1][0] = '{red-fg}' + data2[1][0] + '{/red-fg}';
    data2[2][0] += ' (' + DU + JUAN + ')';

    screen.key('q', function() {
      return screen.destroy();
    });

    table.focus();

    table.setData(data2)

    screen.append(table)

    screen.render();

    setTimeout(function() {
      table.setData(data1);
      screen.render();
    }, 3000);

}

module.exports = list_table
