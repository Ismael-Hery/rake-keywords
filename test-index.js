var rake = require('./index.js');
var stops = require ('./lib/englishStops').words;
var fs = require('fs');

var text = fs.readFileSync('guardian.txt').toString();


console.log(rake.keywordsAndScores(text, stops));
