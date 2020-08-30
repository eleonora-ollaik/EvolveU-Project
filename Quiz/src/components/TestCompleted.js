import React from "react";

const TestCompleted = ({
  correctlyAnsweredQuestions,
  quizDataArray,
  resetPlayQuiz,
  reselectQuiz
}) => (
  <div>
    You have completed the quiz. Thank you for playing! 
    <br/>
    {`You have answered ${correctlyAnsweredQuestions} ${correctlyAnsweredQuestions===1? "question" : "questions"} correctly out of a total of ${quizDataArray.length} questions.`}
    <br/>
    <br/>
    <span className="scoreText">Your score: </span><span className="percent">{correctlyAnsweredQuestions/quizDataArray.length*100}%</span>
    <br/>
    <hr/>
    <br/>
    <div className='btnContainer'>
      <button className = 'endOfQuizBtn' onClick={resetPlayQuiz}>Play Again</button>
      <button className = 'endOfQuizBtn' onClick={reselectQuiz}>Select Another Quiz</button>
    </div>
  </div>
);

export default TestCompleted;
