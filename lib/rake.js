var stopWords = require('./foxStopWords').words;

exports.candidates = candidates;

function candidates(text) {
	var result = [];

	// First, split by punctuation an new lines
	var wordBlocksWithStops = text.split(/\n|\.|\?|;|:|,|…/);

	console.log(wordBlocksWithStops)

	wordBlocksWithStops.forEach(function(blockWithStops) {

		var words = blockWithStops.split(' ');
		var i = 0,
			block = '';

		for (i = 0; i < words.length; i++) {
			console.log('word:', '-' + words[i] + '-');

			if (stopWords.indexOf(words[i].toLowerCase()) == -1) {
				block += ' ' + words[i];
				console.log('accumulated:', block);
			} else {
				console.log(words[i],'is a stop word')
				addLastBlock();
			}
		}
		addLastBlock();

		function addLastBlock() {
			var trimmed = block.trim();
			if (trimmed !== '' && result.indexOf(trimmed) == -1) {
				result.push(trimmed);
				console.log('purged:', trimmed, '\n');
			}

			block = '';
		}

	});

	return result;
};

