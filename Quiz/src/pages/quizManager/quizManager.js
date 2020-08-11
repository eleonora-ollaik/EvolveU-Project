import React, { Component } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";

import {
  getData,
  convertFormat,
  convertQuizDetails,
} from "../../fetch-data.util";

import "./quizManager.css";

const serverUrl =
  "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/";

class QuizManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedQuiz: null,
      responseData: null,
      isModalOpen: false,
      qaTypeList: null,
      currentEditQuestion: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
  }

  componentDidMount() {
    getData(serverUrl + "quiz")
      .then((data) => convertFormat(data.payload))
      .then((arr) => this.setState({ responseData: arr }));

    getData(serverUrl + "questiontype")
      .then((data) => data.payload)
      .then((arr) => this.setState({ qaTypeList: arr }));
    // getData(serverUrl + "quizes")
    //     .then((data) => convertFormat(data.quizes))
    //     .then((arr) => this.setState({ responseData: arr }));

    // if (this.state.qaTypeList == null) {
    //     this.getQAtypeList();
    // }
  }

  selectQuiz(quizId) {
    getData(serverUrl + `quiz?quizid=${quizId}`)
      .then((data) => convertQuizDetails(data.payload[0]))
      .then((quiz) => this.setState({ selectedQuiz: quiz }));

    // getData(serverUrl + `quiz/${quizId}`)
    //     .then((data) => convertQuizDetails(data))
    //     .then((quiz) => this.setState({ selectedQuiz: quiz }));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSearch() {
    console.log("local filter");
  }

  handleEdit = (question) => {
    this.setState({ currentEditQuestion: question, isModalOpen: true });
  };

  handleRemove = (e) => {
    console.log("this delete the question in the selected quiz");
  };

  handleCurrentQuestionChange = (e) => {
      console.log(e.target.value)
    let tempQuestion = {...this.state.currentEditQuestion};
    if(isNaN(e.target.name)){
        console.log('question_statement')
        tempQuestion.question_statement = e.target.value
    } else {
        if(e.target.type === 'text'){
            console.log('answer_statement')
            tempQuestion.answers[e.target.name].answer_statement = e.target.value;
        }else {
            tempQuestion.answers[e.target.name].answer_is_correct = true;
            tempQuestion.answers = tempQuestion.answers.map((answerObj, idx) => Number(e.target.name) !== idx? {...answerObj, answer_is_correct: false}: answerObj )
        }
    }

    this.setState({currentEditQuestion: tempQuestion});
  }

  render() {
    let filteredQuizzes = this.state.responseData;
    if (this.state.responseData) {
      filteredQuizzes = this.state.responseData.filter((quizObj) =>
        quizObj.name.toLowerCase().includes(this.state.value.toLowerCase())
      );
    }
    console.log(this.state.currentEditQuestion);
    return (
      <div className="quizManagerContainer background">
        {this.state.selectedQuiz ? (
          <QuizManagerPreview
            quiz={this.state.selectedQuiz}
            handleEdit={this.handleEdit}
            handleRemove={this.handleRemove}
          />
        ) : filteredQuizzes ? (
          <SelectQuiz
            subHeader={"Please select a quiz to edit!"}
            value={this.state.value}
            handleChange={this.handleChange}
            responseData={filteredQuizzes}
            selectQuiz={this.selectQuiz}
          />
        ) : null}
        {this.state.isModalOpen ? (
          <div className="modal">
            <div>
              <input
                type="text"
                name="question_statement"
                value={this.state.currentEditQuestion.question_statement}
                onChange={this.handleCurrentQuestionChange}
              />
              {this.state.currentEditQuestion.answers.map((answerObj, idx) => (
                <div key={idx}>
                  <input type="text" name={idx} value={answerObj.answer_statement} onChange={this.handleCurrentQuestionChange}/>

                  <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={this.handleCurrentQuestionChange}/>
                        <label htmlFor="true">Correct</label>
                  <input type="radio" name={idx} checked={!answerObj.answer_is_correct} readOnly/>
                        <label htmlFor="false">Incorrect</label>
                </div>
              ))}

              {/* <select onChange={}>
                                 {this.state.qaTypeList.map((questionObj, idx) => <option key={questionObj.questiontype_name + idx}>{questionObj.questiontype_name}</option>)}
                                </select> */}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default QuizManager;
