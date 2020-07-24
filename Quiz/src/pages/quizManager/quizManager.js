import React, { Component } from "react";
import SelectQuiz from "../../components/select-quiz/select-quiz";
import QAedit from "../../components/edit-quiz/edit-quiz";
import Modal from "../../components/modalbox/modalbox";
// Component "EditQuiz" still needs to be done - B&E have already created this
// import EditQuiz from "../../components/edit-quiz";

import {
  postData,
  getData,
  convertFormat,
  convertQuizDetails,
} from "../../fetch-data.util";

import "./quizManager.css";

const serverUrl = "http://127.0.0.1:5000/";

class QuizManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedQuiz: null,
      responseData: null,
      noticeMsg: "",
      qaTypeList: null,
      qaTypeCheck: null,
      qaType: null,
      // quizes: null,
      qaID: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
  }

  componentDidMount() {
    getData(serverUrl + "quizes")
      .then((data) => convertFormat(data.quizes))
      .then((arr) => this.setState({ quizes: arr })); // before: this.setState({ responseData: arr }));
  }

  selectQuiz(quizId) {
    getData(serverUrl + `quiz/${quizId}`)
      .then((data) => convertQuizDetails(data))
      .then((quiz) => this.setState({ selectedQuiz: quiz }));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSearch() {
    try {
      const response = await postData(serverUrl, this.state.value).then(
        (data) => data
      );
      this.setState({ responseData: response });
      console.log("fetch success");
    } catch (error) {
      console.log(error);
    }
    console.log("Search button clicked");
  }

  // onClickSave = (e) => {
  //   const quiz = this.state.quizes;
  //   let key = this.state.qaID;

  //   const QA = new logic.QuestionsAndAnswers();
  //   QA.question = document.getElementById("idQuestion").value;

  //   let CAarray = document.querySelectorAll(".CorrectAnswer");
  //   let WAarray = document.querySelectorAll(".WrongAnswer");
  //   QA.type = document.getElementById("idQuestionType").value;
  //   let array = [];
  //   for (let i = 0; i < CAarray.length; i++) {
  //     array.push(CAarray[i].value);
  //   }

  //   QA.correct_answers = array;
  //   let Warray = [];

  //   for (let i = 0; i < WAarray.length; i++) {
  //     Warray.push(WAarray[i].value);
  //   }    
  //   QA.wrong_answers = Warray;
  //   quiz.QuestionsAndAnswers[key] = QA;

  //   this.setState({ quizes: quiz, qaType: QA.type });
  // };

  onClickCloseModal = (e) => {
    const modal = e.target.parentNode.parentNode;
    modal.setAttribute("class", "modalhide");
    e.stopPropagation();
    // Handle submit modal box
    this.setState({ noticeMsg: "" });
  };

  render() {
    // console.log(this.state.selectedQuiz);
    return (
      <div className="quizContainer">
        {this.state.selectedQuiz ? (
          <Modal
            boxID="idEditQAModal"
            content={
              <QAedit
                quiz={this.state.selectedQuiz} // before: this.state.quizes
                qaID={this.state.qaID}
                qaType={this.state.qaType}
                qaTypeCheck={this.state.qaTypeCheck}
                qaTypeList={this.state.qaTypeList}
                onChange={this.onChangeQuestionHandler}
                onClickSave={this.onClickSave}
                selectedQuiz={this.state.selectedQuiz}
              />
            }
            onClickModalClose={this.onClickCloseModal}
          />
        ) : this.state.responseData ? (
          <SelectQuiz
            value={this.state.value}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            responseData={this.state.responseData}
            selectQuiz={this.selectQuiz}
          />
        ) : null}
      </div>
    );
  }
}

export default QuizManager;
