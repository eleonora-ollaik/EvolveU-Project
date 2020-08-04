import React from 'react';

import './select-quizM.css';
import QuizTableM from "../QuizTable/QuizTableM";

const SelectQuizM = ({ value, handleChange, handleSearch, responseData, selectQuiz }) => (
  <div className="main">
    <h1>Quiz Manager</h1>
    <br />
    <h3>Please select the quiz you want to edit</h3>
    <br />
    <div>Quiz name:</div>
    <input
      type="text"
      value={value}
      placeholder="Search"
      onChange={handleChange}
    />
    <button onClick={handleSearch}>Search</button>
    <br />
    {responseData.length ? (
      <QuizTableM quizData={responseData} selectQuiz={selectQuiz}/>
    ) : (
      <div>no data found</div>
    )}
  </div>
);

export default SelectQuizM;

