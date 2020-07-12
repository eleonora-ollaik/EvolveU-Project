class Question {
    constructor(key, category, question) {
        this.key = key;
        this.category = category;
        this.question = question;
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
    constructor(key, correctanswer, answertype) {
        this.key = key;
        this.answertype = answertype;
        this.correctanswer = correctanswer;
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
class Quiz {
    constructor(name, theme) {
        this.name = name;
        this.theme = theme;
        this.quiz  = {};
        this.counter = this.quiz.length
    }

//     createQuestion

// deleteFromQuiz

// searchRandom

// startGame

// setNextQuestion

// showQuestion

// showAnswers

}

export default {Question, Answer, OpenEnded, MultipleChoice, Quiz}