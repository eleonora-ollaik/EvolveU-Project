export function randomizeAnswer(correct_answers, incorrect_answers) {
    const answerArray = [...correct_answers, ...incorrect_answers] 
    let newAnswerArray = [...answerArray]; 
    const randomA1 = Math.floor(Math.random() * 4) // Creates random integer between 0 and 3 
    
    let newAnswerArray[randomA1] = answerArray[0];
    if (correct_answers[1]) {
        for (let i=0; i<4; i++) {
            const randomC2 = Math.floor(Math.random() * 5) + 1;
            if (randomC2 !== randomC1) {
                break;
            }
        }
    }
    if (correct_answers[2]) {
        for (let i=0; i<4; i++) {
            const randomC3 = Math.floor(Math.random() * 5) + 1;
            if (randomC3 !== randomC1 && randomC3 !== randomC2) {
                break;
            }
        }
    }

    // Now assign incorrect answers 
    for (let )
}

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