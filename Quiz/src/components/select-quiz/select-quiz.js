import React from 'react';

import './select-quiz.css';
import QuizTable from "../QuizTable/QuizTable";

const SelectQuiz = ({ subHeader, value, handleChange, responseData, selectQuiz }) => (
  <div>
    <div className="subHeader">{subHeader}</div>
    <br />
    <div className="quizName">Quiz name:</div>
    <input
      className="quizNameInput"
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

