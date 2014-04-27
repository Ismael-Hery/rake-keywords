rake
====

Javascript implementation of the "Rake" keywords extraction algorithm


# Problems with the Rake original scientific paper :

* numbers is a stop word => natural numbers can not be a candidate keywords. I removed numbers from fox stop list
* does not find mixed types as a candidate keywords. I've added mixed types as a candidates key words

# TODO :

* Use a better stop word list
* French implementation with 'mots de liaisons' du/des/... excluded from stop list
