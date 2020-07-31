import React, { PureComponent } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import PlayQuiz from "../../components/play-quiz/play-quiz";

import { postData, getData, convertFormat, convertQuizDetails } from "../../fetch-data.util";
import "./take-quiz.css";

const serverUrl = "http://127.0.0.1:5000/";

class TakeQuiz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedQuiz: null,
      responseData: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
  }

  componentDidMount(){
    getData(serverUrl + "quizes").then(data =>  convertFormat(data.quizes)).then(arr => this.setState({responseData: arr}));
  }
  
  selectQuiz(quizId) {
    getData(serverUrl + `quiz/${quizId}`).then(data =>  convertQuizDetails(data)).then(quiz => this.setState({ selectedQuiz: quiz }));
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

  render() {
    return (
      <div className="quizContainer">
        {this.state.selectedQuiz ? (
          <PlayQuiz
            selectedQuiz={
              this.state.selectedQuiz
            }
            reselectQuiz={
              () => this.setState({selectedQuiz:  null })
            }
          />
        ) : (
            this.state.responseData?
            <SelectQuiz
            value={this.state.value}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            responseData={this.state.responseData}
            selectQuiz={this.selectQuiz}
            header="Take Quiz"
            subHeader="Please select a quiz to play!"
          /> : null
        )}
      </div>
    );
  }
}

export default TakeQuiz;
