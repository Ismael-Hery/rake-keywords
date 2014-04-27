var should = require('should');
var rake = require('../lib/rake');

describe('rake algorithm', function() {

	it('should extract candidate keywords from a single sentence with no punctuation', function() {

		var expected = {
			candidates: {
				'compatibility':['compatibility'],
				'systems':['systems'],
				'linear constraints':['linear','constraints']},
			components: {
				'compatibility':{ aloneFreq:1, totalFreq: 1},
				'systems':{ aloneFreq:1, totalFreq: 1},
				'linear':{ aloneFreq:1, totalFreq: 1},
				'constraints':{ aloneFreq:1, totalFreq: 1}}
		};

		rake.keywords('Compatibility of systems and linear constraints').should.be.eql(expected);

	});

	it('should extract candidate keywords from the original example text', function() {

	var text = 'Compatibility of systems of linear constraints over the set of natural numbers\n' +
			'Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.';

	// 	var expected = ['Compatibility', 'systems', 'linear constraints', 'set', 'natural numbers',
	// 		'Criteria', 'compatibility', 'system', 'linear Diophantine equations', 'strict inequations',
	// 		'nonstrict inequations', 'considered', 'Upper bounds', 'components', 'minimal set', 'solutions', 'algorithms',
	// 		'construction', 'minimal generating sets', 'types', 'criteria', 'corresponding algorithms',
	// 		'constructing', 'minimal supporting set', 'solving', 'considered types', 'mixed types'
	// 	];

	var expected = {
			candidates: {
				'compatibility':['compatibility'],
				'systems':['systems'],
				'linear constraints':['linear','constraints'],
				'set':['set'],
				'natural numbers':['natural','numbers'],
				'criteria': ['criteria'],
				'system': ['system'],
				'linear diophantine equations': ['linear','diophantine','equations'],
				'strict inequations':['strict','inequations'],
				'nonstrict inequations':['nonstrict','inequations'],
				'considered':['considered'],
				'upper bounds':['upper', 'bounds'],
				'components':['components'],
				'minimal set':['minimal','set'],
				'solutions':['solutions'],
				'algorithms':['algorithms'],
				'construction':['construction'],
				'algorithms':['algorithms'],
				'minimal generating sets':['minimal','generating','sets'],
				'types':['types'],
				'corresponding algorithms':['corresponding','algorithms'],
				'constructing':['constructing'],
				'minimal supporting set':['minimal','supporting','set'],
				'solving':['solving'],
				'considered types':['considered','types'],
				'mixed types':['mixed','types'],
			},
			components: {
				'compatibility':{ aloneFreq:2, totalFreq: 2},
				'systems':{ aloneFreq:4, totalFreq: 4},
				'linear':{ aloneFreq:1, totalFreq: 2},
				'constraints':{ aloneFreq:1, totalFreq: 1},
				'set':{ aloneFreq:1, totalFreq: 3},
				'natural':{ aloneFreq:1, totalFreq: 1},
				'numbers':{ aloneFreq:1, totalFreq: 1},
				'criteria':{ aloneFreq:2, totalFreq: 2},
				'system':{ aloneFreq:1, totalFreq: 1},
				'diophantine':{ aloneFreq:1, totalFreq: 1},
				'equations':{ aloneFreq:1, totalFreq: 1},
				'strict':{ aloneFreq:1, totalFreq: 1},
				'inequations':{ aloneFreq:1, totalFreq: 2},
				'nonstrict':{ aloneFreq:1, totalFreq: 1},
				'considered':{ aloneFreq:1, totalFreq: 2},
				'upper':{ aloneFreq:1, totalFreq: 1},
				'bounds':{ aloneFreq:1, totalFreq: 1},
				'components':{ aloneFreq:1, totalFreq: 1},
				'minimal':{ aloneFreq:1, totalFreq: 3},
				'solutions':{ aloneFreq:3, totalFreq: 3},
				'algorithms':{ aloneFreq:1, totalFreq: 2},
				'construction':{ aloneFreq:1, totalFreq: 1},
				'generating':{ aloneFreq:1, totalFreq: 1},
				'sets':{ aloneFreq:1, totalFreq: 1},
				'types':{ aloneFreq:1, totalFreq: 3},
				'corresponding':{ aloneFreq:1, totalFreq: 1},
				'constructing':{ aloneFreq:1, totalFreq: 1},
				'supporting':{ aloneFreq:1, totalFreq: 1},
				'solving':{ aloneFreq:1, totalFreq: 1},
				'mixed':{ aloneFreq:1, totalFreq: 1},
			}
		};

	rake.keywords(text).should.be.eql(expected);

	});

});
