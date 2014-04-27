var rake = require('./index.js');
var stops = require ('./lib/frenchStops').words;
var fs = require('fs');

var text = fs.readFileSync('guardian.txt').toString();


console.log(rake.keywordsAndScores(text, stops));
