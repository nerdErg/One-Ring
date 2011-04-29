ruleset("Questions") {

    require(['code'])

    def questions = ['428606': 'do you want fries with that?', '428605': 'supersize that coke for ya?']

    rule("Question Prospects") {
        println "questions[${fact.code}] is  ${questions[fact.code]}"
        println "code type is " + fact.code.class
        fact.question = questions[fact.code]
    }

    test(code: '428606') {question 'do you want fries with that?'}
    test(code: '428605') {question 'supersize that coke for ya?'}
}
