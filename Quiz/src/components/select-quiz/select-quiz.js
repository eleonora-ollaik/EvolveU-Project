import React from 'react';

import './select-quiz.css';
import QuizTable from "../QuizTable/QuizTable";

const SelectQuiz = ({ subHeader, value, handleChange, responseData, selectQuiz }) => (
  <div>
    <h3>{subHeader}</h3>
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

