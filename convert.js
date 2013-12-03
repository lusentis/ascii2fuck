/*jshint node:true */

'use strict';

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stderr
});

rl.question('String to translate: ', function (str) {
  var bf = []
    , tmp = []
    , last = 97
    , ret = ''
    ;
  
  str = str.split('').map(function (c) { return c.charCodeAt(0); });
  
  // - initialize cell 0 to 97
  tmp = [];
  _times(10, function () {
    tmp.push('+');
  });
  bf.push(tmp.join(''));
  
  bf.push('[ ');
  bf.push(' > +++++++++ ');
  bf.push(' < - ');
  bf.push(']');
  bf.push('> +++++++');
  
  str.forEach(function (c) {
    var inc = []
      , op = (c > last) ? '+' : '-'
      ;
    
    inc.push(' ');
    
    _times(Math.abs(c - last), function () {
      inc.push(op);
    });
    
    last = c;
    
    inc.push(' .');
    bf.push(inc.join(''));
  });
  
  ret = bf.join('\n');
  ret = ret.replace(/\s/g, '');
  
  process.stdout.write(ret + '\n');
  rl.close();
});


function _times(count, fn) {
  for (var i = 0; i < count; i++) {
    fn();
  }
}

