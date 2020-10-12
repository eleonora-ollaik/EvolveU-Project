import React, { Component } from "react";

import "./play-quiz.css";
import { randomizeAnswerArray, checkIfAnswerCorrect } from "./util";
import TestCompleted from "../TestCompleted";
import ModalBox from "../modalbox/modalbox";
import BackToTakeQuizConfirmation from '../modalbox/backtotakequizconfirmation.js';


let newCurrentQuestion;

class PlayQuiz extends Component {
  constructor() {
    super();
    this.state = {
      currentQuestion: 0,
      correctlyAnsweredQuestions: 0,
      isTestOver: false,
      newCurrentQuestion: null,
      noticeMsg: "",
    };
  }

  handlePlayQuiz = (questionsAndAnswers) => {
    this.setState({ currentQuestion: 1 });
    if (questionsAndAnswers[0].questiontype_id === 1) {
        const currentQ = questionsAndAnswers[0];
        const shuffledAnswers = randomizeAnswerArray(currentQ.answers);
        newCurrentQuestion = { ...currentQ, shuffledAnswers: shuffledAnswers };
      } else {
        newCurrentQuestion = questionsAndAnswers[this.state.currentQuestion];
      }
    this.setState({ newCurrentQuestion: newCurrentQuestion })
  };

  onNext = (questionsAndAnswers) => {
    // const { questionsAndAnswers } = this.props.selectedQuiz;
    if (this.state.currentQuestion + 1 > questionsAndAnswers.length) {
      this.setState({ isTestOver: true });
    } else {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 });

      if (questionsAndAnswers[this.state.currentQuestion].questiontype_id === 1) {
        const currentQ = questionsAndAnswers[this.state.currentQuestion];
        const shuffledAnswers = randomizeAnswerArray(currentQ.answers);
        newCurrentQuestion = { ...currentQ, shuffledAnswers: shuffledAnswers };
      } else {
        newCurrentQuestion = questionsAndAnswers[this.state.currentQuestion];
      }
      this.setState({ newCurrentQuestion: newCurrentQuestion })
    }
  };

  resetPlayQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctlyAnsweredQuestions: 0,
      isTestOver: false,
      newCurrentQuestion: null,
     });
  };

  handleBackToTakeQuiz = () => {
    console.log("back to Take Quiz")
    this.setState({
      noticeMsg:
        "Are you sure you want to quit the current quiz?",
    });
    // Open verify modal box
    document
      .getElementById("idVerifyGoBackToTakeQuiz")
      .setAttribute("class", "modalshow");
  }

  onClickCloseModal = (e) => {
    console.log("boo"); 
    const modal = e.target.parentNode.parentNode;
    modal.setAttribute("class", "modalhide");
    e.stopPropagation();
    // Handle edit modal box
    // this.setState({quizEdit: false});
    // Handle submit modal box
    this.setState({noticeMsg: ""});    
  };

  render() {
    const { name } = this.props.selectedQuiz;
    const { questionsAndAnswers } = this.props.selectedQuiz;

    const modal = (
      <ModalBox
        boxID="idVerifyGoBackToTakeQuiz"
        content={<BackToTakeQuizConfirmation 
          noticeMsg={this.state.noticeMsg} 
          onClickCancel={this.onClickCloseModal} 
          onClickBackToTQ={this.props.handleBackToTQ}/>}
        onClickModalClose={this.onClickCloseModal}
        hide={this.state.noticeMsg ? false : true}
      />
    );

    const quizModal = this.state.noticeMsg ? (
      modal
    ) : (
      <div id="idVerifyGoBackToTakeQuiz"></div>
    );


    return (
      <div className='playQuiz'>
        <div className="headerLine">
          <div className="quiz-text on-the-center">Quiz: <span className="quiz-name">{name}</span></div>
          <div className="on-the-right">
            <button className="quitButton" onClick={this.handleBackToTakeQuiz}>Quit</button>
          </div>
        </div>
        <br/>
        <hr/>
        {this.state.currentQuestion ? null : (
        <div>
          <div className="get-ready-text">Get ready to play!</div>
          <br/>
          <hr/>
          <button
            className='rowBtnEdit'
            onClick={() => this.handlePlayQuiz(questionsAndAnswers)}
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
            onNext={() => this.onNext(questionsAndAnswers)}
            questionsAndAnswers={this.state.newCurrentQuestion}
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
        
        {quizModal}

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
      selectedAnswer: null,
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleCheckbox(e, input) {
      this.setState({ value: [input] });
      this.setState({ selectedAnswer: input.answer_statement})
  }

  onAnswerSubmit() {
    if(!this.state.value) {
      return;
    } else {
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
  }

  onNext() {
    this.setState({ submitted: false, isAnswerCorrect: false, value: "" });
    this.props.onNext();
  }

  render() {
    const { currentQuestion, questionsAndAnswers } = this.props;

    return (
      <div className='questionContainer'>
        <div className="question-number">Question <span style={{color: "rgb(245, 27, 27)"}}>{currentQuestion}</span></div>
        <hr style={{'width': '10em'}} />
        <div className="question-text">{questionsAndAnswers.question_statement}</div>
        <br/>
        {questionsAndAnswers.questiontype_id === 3 ? (
          <div>
            <input
              autoFocus
              placeholder="Please enter your answer here"
              type="text"
              size="40"
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
                  this.state.value==="True" ? "#f6b93b" : null,
              }}
              className={this.state.submitted? "trueOrFalseBtnDisabled" : "trueOrFalseBtn"}
              onClick={() => this.setState({ value: "True" })}
              disabled={this.state.submitted ? true : false}
            >
              True
            </button>
            <button
              style={{
                backgroundColor:
                  this.state.value==="False" ? "#f6b93b" : null,
              }}
              className={this.state.submitted ? "trueOrFalseBtnDisabled" : "trueOrFalseBtn"}
              onClick={() => this.setState({ value: "False" })}
              disabled={this.state.submitted ? true : false}
            >
              False
            </button>
          </div>
        ) : (
          <div className="answers-box">
            {questionsAndAnswers.shuffledAnswers.map((answer, idx) => (
                <div key={answer.answer_statement} className="answers-multiple-choice">
                  <input
                    type="checkbox"
                    style={{marginRight: "10px"}}
                    value={answer.answer_statement}
                    checked={this.state.selectedAnswer===answer.answer_statement ? true : false}
                    onChange={(e) => this.handleCheckbox(e, answer)}
                    disabled={this.state.submitted ? true : false}
                  />
                  {answer.answer_statement}
                </div>
              ))
            }
          </div>
        )}
        <br/>
        <hr style={{'width': '10em', 'marginTop': '15px'}} />
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
        <div style={{"marginTop": "-20px"}}>
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
        </div>
        <br/>
        {this.state.submitted ? (
          <button className='nextBtn' onClick={() => this.onNext()}>Next</button>
        ) : null}
      </div>
    );
  }
}

export default PlayQuiz;
