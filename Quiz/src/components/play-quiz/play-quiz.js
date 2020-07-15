import React, { Component } from "react";

import "./play-quiz.css";


class PlayQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      isTestOver: false
    };
  }
  handlePlayQuiz = () => {
    this.setState({currentQuestion: 1})  
  }

  render() {
    const {questionsAndAnswers, name} = this.props.selectedQuiz;

    return (
      <div>
        <h3>Play Quiz</h3>
        <div>{name}</div>
        <button onClick={this.handlePlayQuiz} disabled={this.state.currentQuestion? true: false}>Play</button>
        {(this.state.currentQuestion && !this.state.isTestOver)? <QandA questionsAndAnswers={questionsAndAnswers[this.state.currentQuestion - 1]} currentQuestion={this.state.currentQuestion}/> : <div>Welcome to the quiz!</div>}
      </div>
    );
  }
}

class QandA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        const {currentQuestion, questionsAndAnswers} = this.props;
        return (
            <div>
                <div>Question {currentQuestion}</div>
                <div>Question:</div>
                <div>{questionsAndAnswers.question}</div>
                {questionsAndAnswers.type === "open"? 
                    (
                        <div>
                            <input placeholder="Please enter your answer here" type="text" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
                        </div>
                    ) 
                    : (questionsAndAnswers.type === "boolean"? 
                    (
                        <div>
                            <button style={{backgroundColor: this.state.value === "true"? "green" : "white"}} onClick={() => this.setState({value: "true"})}>True</button>
                            <button style={{backgroundColor: this.state.value === "false"? "green" : "white"}} onClick={() => this.setState({value: "false"})}>False</button>
                        </div>
                    )  : 
                    (
                        <div>
                            {randomizeAnswer(questionsAndAnswers.correct_answers, questionsAndAnswers.incorrect_answers)}
                        </div>
                    ) 
                    )}
            </div>
    
        )
    }
} 


export default PlayQuiz;
