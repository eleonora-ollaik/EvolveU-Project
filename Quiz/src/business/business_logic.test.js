import functions from './business_logic.js'


test('Question Class', () => {

    const question1 = new functions.QuestionsAndAnswers();

    expect(question1.type).toBe(null);
    expect(question1.category).toBe(null); 
    expect(question1.question).toBe(null);
    question1.type = 'multiple choice';
    question1.category = 'world';
    question1.question= 'What is the capital of France?';
    question1.correct_answers.push('Paris')
    question1.wrong_answers.push('Berlin', 'Moscow', 'Beijing')

    expect(question1.correct_answers[0]).toBe('Paris');
    expect(question1.wrong_answers[1]).toBe('Moscow');

    expect(question1.category).toBe('world');
    expect(question1.question).toBe('What is the capital of France?');

})

test('Quiz Class', () => {
    let ctrl = new functions.Quiz('World Capitals', 'Geography');
    let key1 = ctrl.addQuestionsAndAnswers();

    let qandA1 = ctrl.QuestionsAndAnswers[key1]
    let length = Object.keys(ctrl.QuestionsAndAnswers).length
    qandA1.type = 'multiple choice';
    qandA1.category = 'world';

    expect(qandA1.category).toBe('world');
    expect(qandA1.type).toBe('multiple choice');
    expect(qandA1.question).toBe(null);
    expect(qandA1.number_of_correct_entries).toBe(0);
    expect(qandA1.number_of_incorrect_entries).toBe(0);
    expect(qandA1.correct_answers).toEqual([]);
    expect(qandA1.wrong_answers).toEqual([]);
    expect(qandA1.number_of_incorrect_entries).toBe(0);
    expect(length).toBe(1);
    
    ctrl.deleteQuestionsAndAnswers(key1);
    length = Object.keys(ctrl.QuestionsAndAnswers).length;
    expect(length).toBe(0);

    let key2 = ctrl.addQuestionsAndAnswers();
    let qandA2 = ctrl.QuestionsAndAnswers[key2];
    length = Object.keys(ctrl.QuestionsAndAnswers).length;
    qandA2.type = 'multiple choice';
    qandA2.category = 'world';
    qandA2.correct_answers = 8;
    qandA2.wrong_answers = 2;
    expect(qandA2.calculate_difficulty()).toBe('easy')
    expect(ctrl.getQuestionAndAnswers(key2).category).toBe('world');

    qandA2.correct_answers = 2;
    qandA2.wrong_answers = 7;
    expect(qandA2.calculate_difficulty()).toBe('hard');

    qandA2.correct_answers = 5;
    qandA2.wrong_answers = 5;
    expect(qandA2.calculate_difficulty()).toBe('normal');

    qandA2.correct_answers = 0;
    qandA2.wrong_answers = 0;
    expect(qandA2.calculate_difficulty()).toBe('Undetermined');
})
