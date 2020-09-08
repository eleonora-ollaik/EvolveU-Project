import React from 'react';

import './select-quiz.css';
import QuizTable from "../QuizTable/QuizTable";
import QuizTableM from "../QuizTable/QuizTableM";

const SelectQuiz = ({ subHeader, value, deleteQuiz, handleChange, responseData, selectQuiz, origin }) => (
  <div>
    <div className="subHeader">{subHeader}</div>
    <br />
    {/* <div className="quizName">Quiz name:</div> */}
    <input
      className="quizNameInput"
      type="text"
      value={value}
      placeholder="Search by quiz name"
      onChange={handleChange}
    />
    {responseData ? (
      origin==="TakeQuiz"? <QuizTable quizData={responseData} selectQuiz={selectQuiz}/> : 
      <QuizTableM deleteQuiz={deleteQuiz} quizData={responseData} selectQuiz={selectQuiz}/> 
      
    ) : (
      <div>no data found</div>
    )}
  </div>
);

export default SelectQuiz;

