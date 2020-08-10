import React from 'react';

import './select-quiz.css';
import QuizTable from "../QuizTable/QuizTable";

const SelectQuiz = ({ value, handleChange, responseData, selectQuiz }) => (
  <div>
    <h1>TAKE QUIZ</h1>
    <br />
    <h3>Please select a quiz to play!</h3>
    <br />
    <div>Quiz name:</div>
    <input
      type="text"
      value={value}
      placeholder="Search"
      onChange={handleChange}
    />
    {responseData ? (
      <QuizTable quizData={responseData} selectQuiz={selectQuiz}/>
    ) : (
      <div>no data found</div>
    )}
  </div>
);

export default SelectQuiz;

