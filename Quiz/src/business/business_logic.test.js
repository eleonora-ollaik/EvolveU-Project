import functions from './business_logic.js'


test('Question Class', () => {
    const question1 = new functions.Question('k1','world', 'What is the capital of France?' )
    expect(question1.key).toBe('k1');
    expect(question1.category).toBe('world')
    expect(question1.question).toBe('What is the capital of France?')

    question1.set_Question('Is it a new question?');
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