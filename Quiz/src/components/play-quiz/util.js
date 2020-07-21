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



export function randomizeAnswerArray(correct_answers, incorrect_answers){
    const answerArray = [...correct_answers, ...incorrect_answers];
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

export function checkIfAnswerCorrect(value, questionAndAnswer) {
    let result;
    if (questionAndAnswer.type === "multiple") {
        const intersection = (userAnswer, correctAnswer) => userAnswer.filter(answer => correctAnswer.indexOf(answer) > -1);
        if (intersection(value, questionAndAnswer.correct_answers).length === questionAndAnswer.correct_answers.length) {
            result = true;
        } else {
            result = false; 
        }
    } else if (questionAndAnswer.correct_answers.length > 1) {
        if (questionAndAnswer.correct_answers.indexOf(value) > -1) {
            result = true;
        } else {
            result = false; 
        }
    } else {
        const correctAnswer = questionAndAnswer.correct_answers[0];
        if(value === correctAnswer){
            result = true;
        } else {
            result = false;
        }
    }

    // Send result to server to adjust number of correct/incorrect entries 

    return result;
}