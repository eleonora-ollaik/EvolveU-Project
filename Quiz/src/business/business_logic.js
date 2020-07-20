
class QuestionsAndAnswers {

    // static lastKey = 0;

    constructor () {
        this.category = null;
        this.type = null;
        this.question = null;
        this.number_of_correct_entries = 0;
        this.number_of_incorrect_entries = 0;
        this.correct_answers = [];
        this.incorrect_answers = [];        
    }

    assignType (type, optionlist) {
        for (let i = 0; i < optionlist.length; i++){
            if (type === optionlist[i]) {
                this.type = type;
            }
        }
    }

    assignCorrectAnsw (answers) {

        let types = [
            {'type': 'multiple choice', 'min': 1, 'max': 1,},
            {'type': 'true or false', 'min': 1, 'max': 1,},
            {'type': 'open ended question', 'min': 1, 'max': 5,}
        ]        

        for (let i=0; i < types.length; i++) {
            if(this.type === types[i].type) {
                if(types[i].min <= answers.length && answers.length <= types[i].max) {
                    this.correct_answers = answers;
                } 

            }
        }
    }
        assignInCorrectAnsw (answers) {

            let types = [
                {'type': 'multiple choice', 'min': 3, 'max': 3,},
                {'type': 'true or false', 'min': 1, 'max': 1,},
                {'type': 'open ended question', 'min': 0, 'max': 0,}
            ]        
    
            for (let i=0; i < types.length; i++) {
                if(this.type === types[i].type) {
                    if(types[i].min <= answers.length && answers.length <= types[i].max) {
                        this.incorrect_answers = answers;
                    } 
                    
                }
            }   
    }

    calculate_difficulty() {
        let total_answers = (this.correct_answers + this.incorrect_answers);        
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

    // Generate new key (UUID) for new questions and answers object
    // newKey() {
    //     return ++QuestionsAndAnswers.lastKey;
    // }    
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

