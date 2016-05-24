'use strict';

var Hashids = require('hashids'),
hashids = new Hashids('qwertyuiopasdfghjklzxcvbnm', 0, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@#$");

var number = 3844;

var hash = hashids.encode(number);
console.log(hash);

var numbers = hashids.decode(hash);
console.log(numbers);

console.log("=================================");

console.log(number.toString(36));

console.log("=================================");

var Base62 = require('base62');
// Base62.setCharacterSet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
var res = Base62.encode(number);  // 'G7'
console.log(res);
console.log(Base62.decode(res)); // 999

console.log("=================================");

var number = 9999999999;
var count = 19;

generateShareID();

function generateShareID() {
    var num_res = Base62.encode(number);
    console.log(num_res);
    console.log(Base62.decode(num_res));

    var cnt_res = Base62.encode(count);
    console.log(cnt_res);
    console.log(Base62.decode(cnt_res));
}
