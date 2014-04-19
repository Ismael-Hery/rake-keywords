var stopWords = require('./foxStopWords').words;

exports.cleanText = cleanText;
exports.candidates = candidates;

function candidates(text) {
	var result = [];

	text = cleanText(text);

	// First, split by punctuation
	var wordBlocksWithStops = text.split(/\.|\?|;|:|,|…/);

	wordBlocksWithStops.forEach(function(blockWithStops) {
		var words = blockWithStops.split(' ');
		var i = 0,
			block = '';

		for (i = 0; i < words.length; i++) {
			if (stopWords.indexOf(words[i]) == -1) {
				block += ' ' + words[i];
				console.log('accumulated block', block);
			} else {
				var trimmed = block.trim();
				if (trimmed !== ''){
					result.push(trimmed);
					block = '';
					console.log('\nNEW BLOCK')
				}
			}
		}
	});

	return result;
};


// Replace multiple spaces by a single one
function cleanText(text) {

	return text.replace(/(\s)+/g, ' ');

};
