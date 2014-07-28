Rake
====

Rake is a Javascript implementation of the "Rake" keywords extraction algorithm, as described in 'Rose, S., Engel, D., Cramer, N., & Cowley, W. (2010). Automatic Keyword Extraction from Individual Documents. In M. W. Berry & J. Kogan (Eds.), Text Mining: Theory and Applications: John Wiley & Sons.'

Test have shown to give equal or better quality of extracted keywords compared to commercial API.

## Install


## How to use


## Some problems with the Rake original scientific paper

### Errors in the paper

* 'numbers' is a stop word in the original Fox stop words list, thus 'natural numbers' can not be a candidate keywords. I removed numbers from the Fox stop list as they probably did for the paper (otherwise they would not have found 'natural numbers')
* the paper does not find mixed types as a candidate keywords. I've added mixed types as a candidates key words

### Non english language

## TODO :

* compute keywords from a corpus of articles (see sci paper with computation of 'essential' keywords)
* French implementation with 'mots de liaisons' du/des/d'/… excluded from stop list

## Comparison with keywords extracted from a typical API extraction system (AlchemyAPI for example)

Rake may keep conjugated verbs and '*ing' words that not found in proposition from keyword extraction API

## Comparison between rake and n-gram approach for cluster of articles keyphrase extraction

* rake may extract keyword 'aa bb cc' in one article but another article contains 'aa bb' and rake does not see 'aa bb' appears in both articles (unless you hack it)
* you should manage a complexe list of stop words with rake, not necessary with n-gram approach
* ngram approche cost a lot more in memory by keeping ngram, but maybe an online with pruning approach could improve that. Basic pruning: filter out noisy ngrams, consider only ngram with n between 2 and 4...

## Licence

MIT
