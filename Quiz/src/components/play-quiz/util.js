// Alternative shuffle solution by generating random index;
// function randomizeAnswer() {
//     const answerArray = ["Apple", "Blueberry", "Cherry", "Durian"] 
//     let newAnswerArray = [...answerArray]; 
//     let randomA1, randomA2, randomA3, randomA4, randomArray;
    
//     do { 
//         randomA1 = Math.floor(Math.random() * 4); // Creates random integer between 0 and 3
//         randomA2 = Math.floor(Math.random() * 4);
//         randomA3 = Math.floor(Math.random() * 4);
//         randomA4 = Math.floor(Math.random() * 4);
//         randomArray = [randomA1, randomA2, randomA3, randomA4]
//     }
//     while ((new Set(randomArray)).size !== randomArray.length) 

//     console.log(randomArray)

//     // Now assign new indices to newAnswerArray 
//     newAnswerArray[randomA1] = answerArray[0];
//     newAnswerArray[randomA2] = answerArray[1];
//     newAnswerArray[randomA3] = answerArray[2];
//     newAnswerArray[randomA4] = answerArray[3];

//     return newAnswerArray;
// }



export function randomizeAnswerArray(answerArray){
    let i = 0;
    // the answerArray will always have length of 4,( 4 maxium choices per question)
    while(i !== 4){
        let randomIdx = Math.floor(Math.random() * 4);
        let randomIdxValue = answerArray[randomIdx];
        let tempValue = answerArray[i];
        // swap
        answerArray[i] = randomIdxValue;
        answerArray[randomIdx] = tempValue;
        i++;
    }
    return answerArray;
}

export function checkIfAnswerCorrect(userAnswer, questionsAndAnswers ) {
    let result;
    if (questionsAndAnswers.questiontype_id === 1) {
        // multiple

        if(userAnswer.some((userAnswer) => userAnswer.answer_is_correct === false)){
            result = false;
        } else {
            result = true;
        }
    } else if (questionsAndAnswers.questiontype_id === 3){
        // open

        if(questionsAndAnswers.answers.some((answer)=> answer.answer_statement === userAnswer)){
            result = true;
        } else {
            result = false
        }
    } else {
        // true or false
        const correctAnswer = questionsAndAnswers.answers.find((answer) => answer.answer_is_correct === true );
        if(correctAnswer.answer_statement === userAnswer){
            result = true;
        } else {
            result = false;
        }
        // const intersection = (userAnswer, correctAnswer) => userAnswer.filter(answer => correctAnswer.indexOf(answer) > -1);
        // if (intersection(userAnswer, questionsAndAnswers.correct_answers).length === questionsAndAnswers.correct_answers.length) {
        //     result = true;
        // } else {
        //     result = false; 
        // }
    // } else if (questionsAndAnswers.correct_answers.length > 1) {
    //     if (questionsAndAnswers.correct_answers.indexOf(userAnswer) > -1) {
    //         result = true;
    //     } else {
    //         result = false; 
    //     }
    // } else {
    //     const correctAnswer = questionsAndAnswers.correct_answers[0];
    //     if(userAnswer === correctAnswer){
    //         result = true;
    //     } else {
    //         result = false;
    //     }
    }

    // Send result to server to adjust number of correct/incorrect entries 

    return result;
}