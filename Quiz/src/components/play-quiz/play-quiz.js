import React, { Component } from "react";

import "./play-quiz.css";

import { randomizeAnswerArray, checkIfAnswerCorrect } from './util';


class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      isTestOver: false,
    };
  }

  handlePlayQuiz = () => {
    this.setState({ currentQuestion: 1 })
  }

  render() {
    const { name } = this.props.selectedQuiz;
    const { questionsAndAnswers } = this.props.selectedQuiz;
    const quizDataArray = Object.values(questionsAndAnswers) // Turn Quiz Data (responseData) from Object to Array\
    let newCurrentQuestion;
    if (this.state.currentQuestion > 0 && quizDataArray[this.state.currentQuestion - 1].type === "multiple") {
      const currentQ = quizDataArray[this.state.currentQuestion - 1];
      const { correct_answers, incorrect_answers } = currentQ;
      const shuffledAnswers = randomizeAnswerArray(correct_answers, incorrect_answers);
      newCurrentQuestion = { ...currentQ, shuffledAnswers: shuffledAnswers };
    } else {
      newCurrentQuestion = quizDataArray[this.state.currentQuestion -1 ];
    }
    
    return (
      <div>
        <h3>Play Quiz</h3>
        <div>{name}</div>
        <button onClick={this.handlePlayQuiz} disabled={this.state.currentQuestion ? true : false}>Play</button>
        {
          (this.state.currentQuestion && !this.state.isTestOver) ?
            <QandA questionsAndAnswers={newCurrentQuestion} currentQuestion={this.state.currentQuestion} /> 
            : <div>Welcome to the quiz!</div>
        }
      </div>
    );
  }
}

class QandA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null, 
      submitted: false,
      isAnswerCorrect: false,
    }
    // this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  handleCheckbox(e) {
    if (!e.target.checked) {
      //uncheck the checkbox
      if (this.state.value.length === 1) {
        this.setState({ value: null })
      } else {
        this.setState({ value: this.state.value.filter((answer) => answer !== e.target.value) })
      }
    } else {
      if (!this.state.value) {
        this.setState({ value: [e.target.value] })
      } else {
        this.setState({ value: [...this.state.value, e.target.value] })
      }
    }
  }

  onAnswerSubmit() {
    this.setState({submitted: true})
    let isAnswerCorrect = checkIfAnswerCorrect(this.state.value, this.props.questionsAndAnswers);
    this.setState({isAnswerCorrect: isAnswerCorrect}); 
  }


  render() {
    const { currentQuestion, questionsAndAnswers } = this.props;
    
    return (
      <div>
        <div>Question {currentQuestion}</div>
        <div>Question:</div>
        <div>{questionsAndAnswers.question}</div>
        {
          questionsAndAnswers.type === "open" ?
            (
              <div>
                <input placeholder="Please enter your answer here" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} disabled={this.state.submitted ? true : false} />
              </div>
            )
            : (questionsAndAnswers.type === "boolean" ?
              (
                <div>
                  <button style={{ backgroundColor: this.state.value === "true" ? "green" : "white" }} onClick={() => this.setState({ value: "true" })} disabled={this.state.submitted ? true : false}>True</button>
                  <button style={{ backgroundColor: this.state.value === "false" ? "green" : "white" }} onClick={() => this.setState({ value: "false" })} disabled={this.state.submitted ? true : false}>False</button>
                </div>
              ) :
              (
                <div>
                  {
                    questionsAndAnswers.shuffledAnswers.map((answer, idx) =>
                      <div key={idx}>
                        <input type="checkbox" value={answer} onChange={(e) => this.handleCheckbox(e)} disabled={this.state.submitted ? true : false} />
                        {answer}
                      </div>
                    )
                  }
                </div>
              )
            )
        }
        <button onClick={() => this.onAnswerSubmit()} disabled={this.state.submitted ? true : false}>Submit</button>
        <br/>
        {this.state.submitted ? 
        (this.state.isAnswerCorrect ?
        <div>Answer is correct!</div> :
        <div>Answer is WRONG!!!</div>) : 
        null 
        }
        
      </div>

    )
  }
}


export default PlayQuiz;
