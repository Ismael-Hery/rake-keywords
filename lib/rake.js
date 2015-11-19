var defaultStops = require('./foxStopWords').words;

// Main export
exports.keywordsAndScores = keywordsAndScores;

// Exports for testing
exports.keywords = keywords;
exports.withMostLowerCase = withMostLowerCase;

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

    candidates[candidate].subcomponents.forEach(function(component) {
      score += components[component].score;
    });

    scores.push({
      keyword: withMostLowerCase(candidates[candidate].occurrences),
      score: Math.round(score * 10) / 10
    });

  });

  // Order by score
  scores = scores.sort(function(a, b) {
    return b.score - a.score;
  });

  // Return the first third as recommended by the paper
  return scores.slice(0, Math.round(scores.length * 0.3));
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
  // '(?![ts]) means only match ' if not followed by t or s
  // (so as to not split isn't and dave's)
  var blocksWithStops = text.split(/\n|\.|\?|\(|\)|;|:|,|…|'(?![ts])|"|“|”|–|•/);

  blocksWithStops.forEach(function(blockWithStops) {

    var words = blockWithStops.split(' ');
    var i = 0
    var block = {};
    block.asString = '';
    block.asArray = [];

    // go through the block of words to parse it and split at stop words
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
  var trimmed = block.asString.trim();
  var lowTrimmed = trimmed.toLowerCase();

  if (trimmed !== '') {
    if (result.candidates[lowTrimmed] === undefined) {
      result.candidates[lowTrimmed] = {};
      result.candidates[lowTrimmed].occurrences = [trimmed];
      result.candidates[lowTrimmed].subcomponents = block.asArray;
    } else {
      if (result.candidates[lowTrimmed].occurrences.indexOf(trimmed) == -1)
        result.candidates[lowTrimmed].occurrences.push(trimmed);
    }

    block.asArray.forEach(function(component) {
      if (result.components[component.toLowerCase()] === undefined) {
        result.components[component.toLowerCase()] = {
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

/**
 * Return the word that has the most of lower case letter among an array of the same word with
 *  different combination of lower and upper case. Useful to find lower case common word that begins
 *  a sentence or to manage proper noun
 *
 * @param  {Array} occurrences Array of the same word with different case
 * @return {[type]}            The word that has the more lower case
 */
function withMostLowerCase(occurrences){

  var occurrencesWithLowCount = occurrences.map(function(occurrence){
    var i, count = 0;

    for(i = 0; i < occurrence.length; i++){
      if(occurrence[i].toLowerCase() === occurrence[i])
        count++;
    }

    return {word: occurrence, lowCount: count};
  });

  occurrencesWithLowCount = occurrencesWithLowCount.sort(function(a, b){
    return b.lowCount - a.lowCount;
  });

  return occurrencesWithLowCount[0].word;
};
