
class QuestionsAndAnswers {
    
    constructor () {
        this.category = null;
        this.type = null;
        this.typename = null;
        this.question = null;
        this.number_of_correct_entries = 0;
        this.number_of_incorrect_entries = 0;
        this.correct_answers = [];
        this.wrong_answers = [];        
    }

    calculate_difficulty() {
        let total_answers = (this.correct_answers + this.wrong_answers);        
        let acurracy = total_answers===0 ? 0: this.correct_answers / total_answers;
        
        let comlexityInfo = [
            {'lowest': 0.76, 'highest': 1, 'level': 'easy'},
            {'lowest': 0.33, 'highest': 0.76, 'level': 'normal'},
            {'lowest': 0, 'highest': 0.33, 'level': 'hard'}
        ]        

        let result = 'Undetermined';

        for (let i=0; i < comlexityInfo.length; i++) {            
            if (acurracy > comlexityInfo[i].lowest && acurracy <= comlexityInfo[i].highest ) {
                result = comlexityInfo[i].level;
            }               
        }
        return result;
    } 
}

class Quiz {
    static lastKey = 0;

    constructor(name, theme) {
        this.name = name;
        this.theme = theme;
        this.QuestionsAndAnswers = {};
    }

    // Generate new key (UUID) for new questions and answers object
    newKey() {
        return ++Quiz.lastKey;
    }

    addQuestionsAndAnswers () {
        const key = this.newKey();

        this.QuestionsAndAnswers[key] = new QuestionsAndAnswers();

        return key;
    }    

    deleteQuestionsAndAnswers (key) {
        delete this.QuestionsAndAnswers[key];
    }

    getQuestionAndAnswers (key) {
        return this.QuestionsAndAnswers[key];
    }
}

export default {QuestionsAndAnswers, Quiz}

