var defaultStops = require('./foxStopWords').words;

exports.keywordsAndScores = keywordsAndScores;
exports.keywords = keywords;

/**
 * Extract keywords from a text and compute a score for each of them.
 * See Rake original paper for algorithm description and explanations.
 *
 * @param  {String} text Text to extract keywords from
 * @return {Object}      Object keys are candidate keywords with score as their values
 */
function keywordsAndScores(text, stops) {
  var words = keywords(text, stops);

  var components = words.components;
  var candidates = words.candidates;

  var scores = [];

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

    scores.push({
      keyword: candidate,
      score: Math.round(score * 10) / 10
    });

  });

  // Order by score
  scores = scores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Return the first third as recommended by the paper
  return scores.slice(0, Math.round(scores.length / 1.5));
};


/**
 * Extract candidate keywords and their sub components with their degree and frequency as
 * described in original Rake paper
 *
 * @param  {String} text Text to extract keywords from
 * @return {Array}       Array of candidate keywords and components, see unit test for examples
 */
function keywords(text, stops) {
  var result = {};
  result.candidates = {};
  result.components = {};

  if (stops === undefined)
    stops = defaultStops;

  // First, split by punctuation an new lines
  var blocksWithStops = text.split(/\n|\.|\?|;|:|,|…|'|"|–/);

  blocksWithStops.forEach(function(blockWithStops) {

    var words = blockWithStops.split(' ');
    var i = 0
    var block = {};
    block.asString = '';
    block.asArray = [];

    for (i = 0; i < words.length; i++) {
      //console.log('word:', '-' + words[i] + '-');

      if (stops.indexOf(words[i].toLowerCase()) == -1) {
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

// Utility private function
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
};
