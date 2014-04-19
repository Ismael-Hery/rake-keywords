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
			if (stopWords.indexOf(words[i].toLowerCase()) == -1) {
				block += ' ' + words[i];
			} else {
				addLastBlock();
			}
		}
		addLastBlock();

		function addLastBlock() {
			var trimmed = block.trim();
			if (trimmed !== '' && result.indexOf(trimmed) == -1) {
				result.push(trimmed);
				block = '';
			}
		}

	});

	return result;
};


// Replace multiple spaces by a single one
function cleanText(text) {

	return text.replace(/(\s)+/g, ' ');

};
