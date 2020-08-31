import React, { PureComponent } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import PlayQuiz from "../../components/play-quiz/play-quiz";
import "./take-quiz.css";

import {
  getData,
  convertFormat,
  convertQuizDetails,
} from "../../fetch-data.util";

const serverUrl =
  "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/";

class TakeQuiz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedQuiz: null,
      responseData: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
  }

  componentDidMount() {
    getData(serverUrl + "quiz")
      .then((data) => {
        // console.log('Inside take-quiz:', JSON.stringify(data.payload, null, 2));
        return convertFormat(data.payload);
      })
      .then((arr) => this.setState({ responseData: arr }));
  }

  selectQuiz(quizId) {
    getData(serverUrl + `quiz?quizid=${quizId}`)
      .then((data) => convertQuizDetails(data.payload[0]))
      .then((quiz) => this.setState({ selectedQuiz: quiz }));
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    let filteredQuizzes = this.state.responseData;
    if (this.state.responseData) {
      filteredQuizzes = this.state.responseData.filter((quizObj) =>
        quizObj.name.toLowerCase().includes(this.state.value.toLowerCase())
      );
    }

    return (
      <div className="takeQuizContainer">
        <div className="box-container">
          {this.state.selectedQuiz ? (
            <PlayQuiz
              selectedQuiz={this.state.selectedQuiz}
              reselectQuiz={() => this.setState({ selectedQuiz: null })}
            />
          ) : filteredQuizzes ? (
            <SelectQuiz
              subHeader={"Please select a quiz to play!"}
              value={this.state.value}
              handleChange={this.handleChange}
              responseData={filteredQuizzes}
              selectQuiz={this.selectQuiz}
              origin={"TakeQuiz"}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default TakeQuiz;
