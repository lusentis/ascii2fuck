/*jshint node:true */

'use strict';

var readline = require('readline')
  , optimist = require('optimist')
  ;

var argv = optimist
  .usage('Convert ASCII text to brainfuck programs\nUsage: $0 [--pretty] [--dumb]')
  .describe('pretty', 'Pretty bf code. Inserts indents and spaces')
  .describe('dumb', 'Produce inefficient and (very) long code')
  .alias('p', 'pretty')
  .alias('d', 'dumb')
  .alias('h', 'help')
  .boolean('pretty')
  .boolean('dumb')
  .boolean('help')
  .argv
  ;


if (argv.help === true) {
  optimist.showHelp();
  process.exit(0);
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});


rl.question('String to translate: ', function (str) {
  var bf = []
    , tmp = []
    , last = 0
    , ret = ''
    ;
  
  str = str.split('').map(function (c) { return c.charCodeAt(0); });
  
  // - initialize cell 0 to 97
  
  if (argv.pretty === true) {
    bf.push('initialization routine');
  }
  
  bf.push('');
  
  tmp = [];
  _times(10, function () {
    tmp.push('+');
  });
  bf.push(tmp.join(''));
  
  if (argv.dumb === true) {
    last = 0;
  } else {
    // the basic counter is initialized to 97 ("a")
    last = 97;
    bf.push('[ ');
    bf.push(' > +++++++++ ');
    bf.push(' < - ');
    bf.push(']');
    bf.push('> +++++++');
  }
  
  bf.push('');
  
  str.forEach(function (c) {
    var inc = []
      , op = (c > last) ? '+' : '-'
      ;
    
    inc.push('');
    if (argv.pretty === true) {
      inc.push('print "' + String.fromCharCode(c) + '"\t');
    }
    
    _times(Math.abs(c - last), function () {
      inc.push(op);
    });
    
    last = c;
    
    inc.push(' .');
    bf.push(inc.join(''));
  });
  
  ret = bf.join('\n');
  
  if (argv.pretty === false) {
    ret = ret.replace(/\s/g, '');
  }
  
  process.stdout.write(ret + '\n');
  rl.close();
});


function _times(count, fn) {
  for (var i = 0; i < count; i++) {
    fn();
  }
}

