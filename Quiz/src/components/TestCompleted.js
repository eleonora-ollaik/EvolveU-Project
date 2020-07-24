import React from "react";

const TestCompleted = ({
  correctlyAnsweredQuestions,
  quizDataArray,
  resetPlayQuiz,
  reselectQuiz
}) => (
  <div>
    {`Test is over, thank you! You have answered ${correctlyAnsweredQuestions} correctly out of ${quizDataArray.length} questions total.`}
    <button onClick={resetPlayQuiz}>Play Again</button>
    <button onClick={reselectQuiz}>Select Another Quiz</button>
  </div>
);

export default TestCompleted;
