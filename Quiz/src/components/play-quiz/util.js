export function randomizeAnswer(correct_answers, incorrect_answers) {
    const answerArray = [...correct_answers, ...incorrect_answers] 
    let newAnswerArray = [...answerArray]; 

    const randomA1 = Math.floor(Math.random() * 4) // Creates random integer between 0 and 3 
    
    for (let i=0; i<3; i++) {
        const randomA2 = Math.floor(Math.random() * 4);
        if (randomA2 !== randomA1) {
            break;
        }
    }
    for (let i=0; i<3; i++) {
        const randomA3 = Math.floor(Math.random() * 4);
        if (randomA3 !== randomA1 && randomA3 !== randomA2) {
            break;
        }
    }
    for (let i=0; i<3; i++) {
        const randomA4 = Math.floor(Math.random() * 4);
        if (randomA4 !== randomA1 && randomA4 !== randomA2 && randomA4 !== randomA3) {
            break;
        }
    }

    // Now assign new indices to newAnswerArray 
    newAnswerArray[randomA1] = answerArray[0];
    newAnswerArray[randomA2] = answerArray[1];
    newAnswerArray[randomA3] = answerArray[2];
    newAnswerArray[randomA4] = answerArray[3];

    return newAnswerArray;
}

// CHECK IF IT WORKS
function randomizeAnswer() {
    const answerArray = ["Apple", "Blueberry", "Cherry", "Durian"] 
    let newAnswerArray = [...answerArray]; 
    let randomA1, randomA2, randomA3, randomA4, randomArray;
    
    do {
        let randomA1 = Math.floor(Math.random() * 4); // Creates random integer between 0 and 3
        let randomA2 = Math.floor(Math.random() * 4);
        let randomA3 = Math.floor(Math.random() * 4);
        let randomA4 = Math.floor(Math.random() * 4);
        let randomArray = [randomA1, randomA2, randomA3, randomA4]
    }
    while ((new Set(randomArray)).size !== randomArray.length) 

    console.log(randomArray)

    // Now assign new indices to newAnswerArray 
    newAnswerArray[randomA1] = answerArray[0];
    newAnswerArray[randomA2] = answerArray[1];
    newAnswerArray[randomA3] = answerArray[2];
    newAnswerArray[randomA4] = answerArray[3];

    return newAnswerArray;
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