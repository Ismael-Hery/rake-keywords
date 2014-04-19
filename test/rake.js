var should = require('should');
var rake = require('../lib/rake');

describe('rake algorithm', function() {

	var text = 'Compatibility of systems of linear constraints over the set of natural numbers\n' +
		'Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.';

	it('should extract candidate keywords', function() {

		var expected = ['Compatibility', 'systems', 'linear constraints', 'set', 'natural numbers',
			'Criteria', 'compatibility', 'system', 'linear Diophantine equations', 'strict inequations',
			'nonstrict inequations', 'Upper bounds', 'components', 'minimal set', 'solutions', 'algorithms',
			'minimal generating sets', 'solutions', 'systems', 'criteria', 'corresponding algorithms',
			'constructing', 'minimal supporting set', 'solving', 'systems', 'systems'
		];

		rake.candidates(text).should.be.eql(expected);

	});

});
