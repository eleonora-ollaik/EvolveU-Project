import React, { Component } from "react";

import "./play-quiz.css";

import { randomizeAnswerArray, checkIfAnswerCorrect } from "./util";
import TestCompleted from "../TestCompleted";

class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      correctlyAnsweredQuestions: 0,
      isTestOver: false,
    };
  }

  handlePlayQuiz = () => {
    this.setState({ currentQuestion: 1 });
  };

  onNext = () => {
    const { questionsAndAnswers } = this.props.selectedQuiz;
    if (this.state.currentQuestion + 1 > questionsAndAnswers.length) {
      this.setState({ isTestOver: true });
    } else {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    }
  };

  resetPlayQuiz = () => {
    this.setState({
      currentQuestion: 1,
      correctlyAnsweredQuestions: 0,
      isTestOver: false,
    });
  };

  render() {
    const { name } = this.props.selectedQuiz;
    const { questionsAndAnswers } = this.props.selectedQuiz;
    let newCurrentQuestion;
    if (!this.state.isTestOver) {
      if (
        this.state.currentQuestion > 0 &&
        questionsAndAnswers[this.state.currentQuestion - 1].questiontype_id === 1
      ) {
        const currentQ = questionsAndAnswers[this.state.currentQuestion - 1];
        const shuffledAnswers = randomizeAnswerArray(currentQ.answers);
        newCurrentQuestion = { ...currentQ, shuffledAnswers: shuffledAnswers };
      } else {
        newCurrentQuestion = questionsAndAnswers[this.state.currentQuestion - 1];
      }
    }

    return (
      <div className='playQuiz'>
        <div className="quiz-text">Quiz: <span className="quiz-name">{name}</span></div>
        <br/>
        <hr/>
        {this.state.currentQuestion ? null : (
        <div>
          <div className="get-ready-text">Get ready to play!</div>
          <br/>
          <hr/>
          <button
            className='rowBtnEdit'
            onClick={this.handlePlayQuiz}
            // disabled={this.state.currentQuestion ? true : false}
          >
            Play
          </button>
        </div>
        )}
        {this.state.currentQuestion && !this.state.isTestOver ? (
          <QandA
            addToCorrectAnswers={() =>
              this.setState({
                correctlyAnsweredQuestions:
                  this.state.correctlyAnsweredQuestions + 1,
              })
            }
            onNext={this.onNext}
            questionsAndAnswers={newCurrentQuestion}
            currentQuestion={this.state.currentQuestion}
          />
        ) : this.state.isTestOver ? (
          <TestCompleted
            reselectQuiz = {this.props.reselectQuiz}
            resetPlayQuiz ={this.resetPlayQuiz}
            correctlyAnsweredQuestions={this.state.correctlyAnsweredQuestions}
            quizDataArray={questionsAndAnswers}
          />
        ) : 
          null
        }
      </div>
    );
  }
}

class QandA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      submitted: false,
      isAnswerCorrect: false,
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleCheckbox(e, input) {
    if (!e.target.checked) {
      //uncheck the checkbox
      if (this.state.value.length === 1) {
        this.setState({ value: "" });
      } else {
        this.setState({
          value: this.state.value.filter((answer) => answer !== input),
        });
      }
    } else {
      if (!this.state.value) {
        this.setState({ value: [input] });
      } else {
        this.setState({ value: [...this.state.value, input] });
      }
    }
  }

  onAnswerSubmit() {
    this.setState({ submitted: true });
    let isAnswerCorrect = checkIfAnswerCorrect(
      this.state.value,
      this.props.questionsAndAnswers
    );
    if (isAnswerCorrect) {
      this.props.addToCorrectAnswers();
    }
    this.setState({ isAnswerCorrect: isAnswerCorrect });
  }

  onNext() {
    this.setState({ submitted: false, isAnswerCorrect: false, value: "" });
    this.props.onNext();
  }

  render() {
    const { currentQuestion, questionsAndAnswers } = this.props;
    return (
      <div className='questionContainer'>
        <div>Question <span className="question-number">{currentQuestion}</span></div>
        <hr style={{'width': '10em'}} />
        <div>Question: <span className="question-text">{questionsAndAnswers.question_statement}</span></div>
        <br/>
        {questionsAndAnswers.questiontype_id === 3 ? (
          <div>
            <input
              placeholder="Please enter your answer here"
              type="text"
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
              disabled={this.state.submitted ? true : false}
            />
          </div>
        ) : questionsAndAnswers.questiontype_id === 2 ? (
          <div>
            <button
              style={{
                backgroundColor:
                  this.state.value === "true" ? "green" : "white",
              }}
              onClick={() => this.setState({ value: "true" })}
              disabled={this.state.submitted ? true : false}
            >
              True
            </button>
            <button
              style={{
                backgroundColor:
                  this.state.value === "false" ? "green" : "white",
              }}
              onClick={() => this.setState({ value: "false" })}
              disabled={this.state.submitted ? true : false}
            >
              False
            </button>
          </div>
        ) : (
          <div className="answers-box">
            {this.state.submitted? 
              null  
              : (
              questionsAndAnswers.shuffledAnswers.map((answer, idx) => (
                <div key={answer.answer_statement} className="answers-multiple-choice">
                  <input
                    type="checkbox"
                    value={answer.answer_statement}
                    onChange={(e) => this.handleCheckbox(e, answer)}
                    disabled={this.state.submitted ? true : false}
                  />
                  {answer.answer_statement}
                </div>
              ))
            )}
          </div>
        )}
        <br/>
        <hr style={{'width': '8em'}} />
        <br/>

        {this.state.submitted? null : (
        <button
          className='rowBtnEdit'
          onClick={() => this.onAnswerSubmit()}
          // disabled={this.state.submitted || !this.state.value ? true : false}
        >
          Submit
        </button>
        )}
        <br />
        {this.state.submitted ? (
          this.state.isAnswerCorrect ? (
            <div className="correct-answer-text">Answer is correct!</div>
          ) : (
            <div>
              Sorry, your answer is incorrect. The correct answer is: <span className="correct-answer-text">{" "}
              {questionsAndAnswers.answers.map((answer) => 
                (answer.answer_is_correct)? answer.answer_statement:null
              )}</span>
            </div>
          )
        ) : null}
        <br />
        {this.state.submitted ? (
          <button className='nextBtn' onClick={() => this.onNext()}>Next</button>
        ) : null}
      </div>
    );
  }
}

export default PlayQuiz;
