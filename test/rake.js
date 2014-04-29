var should = require('should');
var rake = require('../lib/rake');

describe('rake algorithm', function() {

	it('should extract candidate keywords from a single sentence', function() {

		var expected = {
			candidates: {
				'compatibility':{occurrences: ['Compatibility'], subcomponents: ['compatibility']},
				'systems':{occurrences: ['systems'], subcomponents: ['systems']},
				'linear constraints':{occurrences: ['linear constraints'], subcomponents: ['linear','constraints']}
      },
			components: {
				'compatibility':{ frequency:1, degree: 1},
				'systems':{ frequency:1, degree: 1},
				'linear':{ frequency:1, degree: 2},
				'constraints':{ frequency:1, degree: 2}}
		};

		rake.keywords('Compatibility of systems and linear constraints').should.be.eql(expected);

	});

  it.only('should manage occurrences with different cases', function() {

    var expected = {
      candidates: {
        'compatibility':{occurrences: ['Compatibility','compatibility'], subcomponents: ['compatibility']},
        'systems':{occurrences: ['systems'], subcomponents: ['systems']},
        'linear constraints':{occurrences: ['linear constraints'], subcomponents: ['linear','constraints']}
      },
      components: {
        'compatibility':{ frequency:2, degree: 2},
        'systems':{ frequency:1, degree: 1},
        'linear':{ frequency:1, degree: 2},
        'constraints':{ frequency:1, degree: 2}}
    };

    rake.keywords('Compatibility of systems and linear constraints with compatibility').should.be.eql(expected);

  });

  it('should take optional stop words array', function() {

    var expected = {
      candidates: {
        'compatibility':['compatibility'],
        'systems':['systems'],
        'linear constraints':['linear','constraints']},
      components: {
        'compatibility':{ frequency:1, degree: 1},
        'systems':{ frequency:1, degree: 1},
        'linear':{ frequency:1, degree: 2},
        'constraints':{ frequency:1, degree: 2}}
    };

    rake.keywords('Compatibility stop1 systems stop2 linear constraints',['stop1','stop2']).should.be.eql(expected);

  });

	it('should extract candidate keywords from the original example text', function() {

		var text = 'Compatibility of systems of linear constraints over the set of natural numbers\n' +
				'Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.';

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
					'compatibility':{ frequency:2, degree: 2},
					'systems':{ frequency:4, degree: 4},
					'linear':{ frequency:2, degree: 5},
					'constraints':{ frequency:1, degree: 2},
					'set':{ frequency:3, degree: 6},
					'natural':{ frequency:1, degree: 2},
					'numbers':{ frequency:1, degree: 2},
					'criteria':{ frequency:2, degree: 2},
					'system':{ frequency:1, degree: 1},
					'diophantine':{ frequency:1, degree: 3},
					'equations':{ frequency:1, degree: 3},
					'strict':{ frequency:1, degree: 2},
					'inequations':{ frequency:2, degree: 4},
					'nonstrict':{ frequency:1, degree: 2},
					'considered':{ frequency:2, degree: 3},
					'upper':{ frequency:1, degree: 2},
					'bounds':{ frequency:1, degree: 2},
					'components':{ frequency:1, degree: 1},
					'minimal':{ frequency:3, degree: 8},
					'solutions':{ frequency:3, degree: 3},
					'algorithms':{ frequency:2, degree: 3},
					'construction':{ frequency:1, degree: 1},
					'generating':{ frequency:1, degree: 3},
					'sets':{ frequency:1, degree: 3},
					'types':{ frequency:3, degree: 5},
					'corresponding':{ frequency:1, degree: 2},
					'constructing':{ frequency:1, degree: 1},
					'supporting':{ frequency:1, degree: 3},
					'solving':{ frequency:1, degree: 1},
					'mixed':{ frequency:1, degree: 2},
				}
			};

		rake.keywords(text).should.be.eql(expected);
	});

  it('should compute scores', function() {

    var text = 'Compatibility of systems of linear constraints over the set of natural numbers\n' +
        'Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given. These criteria and the corresponding algorithms for constructing a minimal supporting set of solutions can be used in solving all the considered types of systems and systems of mixed types.';

    var scores = rake.keywordsAndScores(text);

    scores[0].should.be.eql({keyword: 'minimal generating sets', score:8.7});
  });

});
