import React from 'react';

import './select-quiz.css';
import QuizTable from "../QuizTable/QuizTable";
import QuizTableM from "../QuizTable/QuizTableM";

const SelectQuiz = ({ subHeader, value, user, deleteQuiz, handleChange, responseData, selectQuiz, origin }) => (
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
    <br/>
    {responseData ? (
      origin==="TakeQuiz"? <QuizTable user={user} quizData={responseData} selectQuiz={selectQuiz}/> : 
      <QuizTableM user={user} deleteQuiz={deleteQuiz} quizData={responseData} selectQuiz={selectQuiz}/> 
      
    ) : (
      <div>no data found</div>
    )}
  </div>
);

export default SelectQuiz;

