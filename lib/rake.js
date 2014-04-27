var stopWords = require('./foxStopWords').words;

exports.keywords = keywords;
exports.keywordsAndScores = keywordsAndScores;

function keywords(text) {
  var result = {};
  result.candidates = {};
  result.components = {};

  // First, split by punctuation an new lines
  var blocksWithStops = text.split(/\n|\.|\?|;|:|,|…/);

  blocksWithStops.forEach(function(blockWithStops) {

    var words = blockWithStops.split(' ');
    var i = 0
    var block = {};
    block.asString = '';
    block.asArray = [];

    for (i = 0; i < words.length; i++) {
      //console.log('word:', '-' + words[i] + '-');

      if (stopWords.indexOf(words[i].toLowerCase()) == -1) {
        if (words[i].trim() !== '') {
          block.asString += ' ' + words[i];
          block.asArray.push(words[i].toLowerCase());
        }
        //console.log('accumulated:', block);
      } else {
        //console.log(words[i], 'is a stop word')
        addCandidatesAndComponents(block, result);
      }
    }

    // call one last time for last block
    addCandidatesAndComponents(block, result);

  });

  return result;
};


function addCandidatesAndComponents(block, result) {
  var trimmed = block.asString.toLowerCase().trim();
  if (trimmed !== '') {
    if (result.candidates[trimmed] === undefined) {
      result.candidates[trimmed] = block.asArray;
    }

    block.asArray.forEach(function(component) {
      if (result.components[component] === undefined) {
        result.components[component] = {
          frequency: 0,
          degree: 0
        };
      }

      result.components[component].frequency += 1;
      result.components[component].degree += 1 + block.asArray.length - 1;

    });

    //console.log('empty block:', block, '\n');
  }

  block.asString = '';
  block.asArray = [];
}

function keywordsAndScores(text) {
  var words = keywords(text);

  var components = words.components;
  var candidates = words.candidates;

  var scores = {};

  // compute individual components scores
  Object.keys(components).forEach(function(component) {
    components[component].score = components[component].degree / components[component].frequency;
  });

  // compute keywords scores
  Object.keys(candidates).forEach(function(candidate) {

    var score = 0;

    candidates[candidate].forEach(function(component) {
      score += components[component].score;
    });

    scores[candidate] = Math.round(score * 10) / 10;
  });

  return scores;
};
