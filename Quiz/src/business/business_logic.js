class Question {
    static lastKey = 0;

    constructor(obj) {
        const defaults = {key: '', category: '', question: ''};
        const data = {...defaults, ...obj};
        this.key = data.key;
        this.category = data.category;
        this.question = data.question;
    }

    newKey() {
        Question.lastKey++;
        this.key=Question.lastKey;
    }

    set_Question (question) {
        this.question = question;
    }

    set_Category (category) {
        this.category = category;
    }

    get_Question() {
        return this.question;
    }

    get_Category() {
        return this.category;
    }


}

class Answer {
    static lastKey = 0;

    constructor(key, correctanswer, answertype) {
        this.key = key;
        this.answertype = answertype;
        this.correctanswer = correctanswer;
    }

    newKey() {
        Question.lastKey++;
        this.key=Question.lastKey;
    }    
}

class OpenEnded extends Answer {
    constructor(key, correctanswer, answertype, markedcorrect) {
        super(key, correctanswer, answertype);
        this.markedcorrect = markedcorrect;        
    }
}

class MultipleChoice extends Answer {
    constructor(key, correctanswer, answertype, answerA, answerB, answerC, answerD) {
        super(key, correctanswer, answertype);
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
    }

}

class QandA {
    static lastKey = 0;

    constructor (key, questionKey, answerKey) {
        this.key = key;
        this.questionKey = questionKey;
        this.answerKey = answerKey;
    }

    newKey() {
        Question.lastKey++;
        this.key=Question.lastKey;
    }      
}

class Quiz {
    constructor(name, theme) {
        this.name = name;
        this.theme = theme;
        this.lastKey = 0;
        this.QandAPair  = {};
        this.questions  = [];
        this.answers  = {};
        // this.counter = this.quiz.length
    }
getNewQuestion() {
    return new Question({})
}
createQuestion(question, category) {
    let newQ = new Question(key, category, question)

}
    
// deleteFromQuiz

// searchRandom

// startGame

// setNextQuestion

// showQuestion

// showAnswers

}

export default {Question, Answer, OpenEnded, MultipleChoice, Quiz}