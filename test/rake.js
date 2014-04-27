var should = require('should');
var rake = require('../lib/rake');

describe('rake algorithm', function() {

	it('should extract candidate keywords from a single sentence with no punctuation', function() {

		var expected = {
			candidates: [
				{'Compatibility':['Compatibility']},
				{'systems':['systems']},
				{'linear constraints':['linear','constraints']},
			components: [
				{'Compatibility':{aloneFreq:1, totalFreq: 1},
				{'systems':{aloneFreq:1, totalFreq: 1}},
				{'linear':{aloneFreq:1, totalFreq: 1}},
				{'constraints':{aloneFreq:1, totalFreq: 1}}]
		};

		rake.candidates('Compatibility of systems and linear constraints').should.be.eql(expected);

	});


	// it('should extract candidate keywords from two sentences with punctuation', function() {

	// 	var expected = ['Compatibility', 'systems', 'linear constraints', 'class'];

	// 	rake.candidates('Compatibility of systems. And also linear constraints. But with class.').should.be.eql(expected);

	// });

	// it('should extract candidate keywords from two sentences with new line without punctuation', function() {

	// 	var expected = ['Compatibility', 'systems', 'linear constraints', 'Class', 'unclassy'];

	// 	rake.candidates('Compatibility of systems. And also linear constraints\nClass or unclassy.').should.be.eql(expected);

	// });

	// it.only('should extract candidate keywords', function() {

	// 	var text = 'Compatibility of systems of linear constraints over the set of natural numbers\n' +
	// 		'Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.';

	// 	var expected = ['Compatibility', 'systems', 'linear constraints', 'set', 'natural numbers',
	// 		'Criteria', 'compatibility', 'system', 'linear Diophantine equations', 'strict inequations',
	// 		'nonstrict inequations', 'considered', 'Upper bounds', 'components', 'minimal set', 'solutions', 'algorithms',
	// 		'construction', 'minimal generating sets', 'types', 'criteria', 'corresponding algorithms',
	// 		'constructing', 'minimal supporting set', 'solving', 'considered types', 'mixed types'
	// 	];

	// 	rake.candidates(text).should.be.eql(expected);

	// });

});
