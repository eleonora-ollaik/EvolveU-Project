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
      <div>
        <h3>Play Quiz</h3>
        <div>{name}</div>
        <button
          onClick={this.handlePlayQuiz}
          disabled={this.state.currentQuestion ? true : false}
        >
          Play
        </button>
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
        ) : (
          <div>Welcome to the quiz!</div>
        )}
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
    console.log(this.state.value)
    return (
      <div>
        <div>Question {currentQuestion}</div>
        <div>Question:</div>
        <div>{questionsAndAnswers.question_statement}</div>
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
          <div>
            {questionsAndAnswers.shuffledAnswers.map((answer, idx) => (
              <div key={answer.answer_statement}>
                <input
                  type="checkbox"
                  value={answer.answer_statement}
                  onChange={(e) => this.handleCheckbox(e, answer)}
                  disabled={this.state.submitted ? true : false}
                />
                {answer.answer_statement}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => this.onAnswerSubmit()}
          disabled={this.state.submitted || !this.state.value ? true : false}
        >
          Submit
        </button>
        <br />
        {this.state.submitted ? (
          this.state.isAnswerCorrect ? (
            <div>Answer is correct!</div>
          ) : (
            <div>
              Answer is WRONG!!! The correct answer is:{" "}
              {questionsAndAnswers.answers.map((answer) => 
                (answer.answer_is_correct)? answer.answer_statement:null
              )}
            </div>
          )
        ) : null}
        <br />
        {this.state.submitted ? (
          <button onClick={() => this.onNext()}>Next</button>
        ) : null}
      </div>
    );
  }
}

export default PlayQuiz;
