import functions from './business_logic.js'


test('Question Class', () => {
    const quizCtrl = new functions.Quiz();

    let question1 = quizCtrl.getNewQuestion();

    // expect(functions.Question.lastKey).toBe(0);
    expect(question1.key).toBe('');
    expect(question1.category).toBe(''); 
    expect(question1.question).toBe('');
    question1.key = functions.Question.lastKey;
    question1.category = 'world';
    question1.question= 'What is the capital of France?';

    // const question1 = new functions.Question(functions.Question.lastKey,'world', 'What is the capital of France?' )
    expect(question1.key).toBe(0);
    expect(question1.category).toBe('world');
    expect(question1.question).toBe('What is the capital of France?');
    expect(functions.Question.lastKey).toBe(0);
    question1.newKey();
    expect(functions.Question.lastKey).toBe(1);

    question1.set_Question('Is it a new question?' );
    expect(question1.question).toBe('Is it a new question?');

    question1.set_Category('New Category');
    expect(question1.category).toBe('New Category');

    expect(question1.get_Question()).toBe('Is it a new question?');
    expect(question1.get_Category()).toBe('New Category');


})

test('answers', () =>  {
    const openE = new functions.OpenEnded('k1', 'Paris', 'OpenEnded', true);
    expect(openE.key).toBe('k1')
    expect(openE.answertype).toBe('OpenEnded');
    expect(openE.markedcorrect).toBe(true);
    expect(openE.correctanswer).toBe('Paris')


    // console.log(openE);

    const multC = new functions.MultipleChoice('k2', 'A', 'MultipleChoice', 'Paris', 'Berlin', 'Moscow', 'Toronto')
    expect(multC.key).toBe('k2')
    expect(multC.correctanswer).toBe('A')
    expect(multC.answertype).toBe('MultipleChoice')
    expect(multC.answerA).toBe('Paris');
    expect(multC.answerB).toBe('Berlin');
    expect(multC.answerC).toBe('Moscow');
    expect(multC.answerD).toBe('Toronto');

})