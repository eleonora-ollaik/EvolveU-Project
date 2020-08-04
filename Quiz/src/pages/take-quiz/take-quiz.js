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
      //   responseData: 
      // [
      //     {
      //       name: "Superheros of the world",
      //       quizId: "1",
      //       creator: "John",
      //       theme: "Entertainment",
      //       // lastKey: 0,
      //       questionsAndAnswers: {
      //         1: {
      //           uuid: 1,
      //           category: "Entertainment: Comics",
      //           type: "open", //type: "multiple, boolean, open{short answer}",
      //           question:
      //             "This Marvel superhero is often called 'The man without fear'.",
      //           number_of_correct_entries: 5,
      //           number_of_incorrect_entries: 10,
      //           correct_answers: ["Daredevil", "Dare devil"], 
      //           incorrect_answers: ["Thor", "Wolverine", "Hulk"],
      //         },
      //         2: {
      //           uuid: 2,
      //           category: "Entertainment: Comics",
      //           type: "open", //type: "multiple, boolean, open{short answer}",
      //           question: "This hero is a mouse in the Simpsons.",
      //           number_of_correct_entries: 2,
      //           number_of_incorrect_entries: 7,
      //           correct_answers: ["Itchy"],
      //           incorrect_answers: [],
      //         },
      //       },
      //     },
      //     {
      //       name: "Chocolates of the world",
      //       quizId: "2",
      //       creator: "Cornelius",
      //       theme: "Food",
      //       // lastKey: 0,
      //       questionsAndAnswers: {
      //         3:{
      //           uuid: 3,
      //           category: "Food",
      //           type: "multiple", //type: "multiple, boolean, open{short answer}",
      //           question: "These are some famous Swiss brands.",
      //           number_of_correct_entries: 2,
      //           number_of_incorrect_entries: 4,
      //           correct_answers: ["Lindt", "Callier"],
      //           incorrect_answers: ["Mars", "Cadbury"],
      //         },
      //         4: {
      //           uuid: 4,
      //           category: "Food",
      //           type: "boolean", //type: "multiple, boolean, open{short answer}",
      //           question:
      //             "White chocolate does not contain cocoa solids. True or false?",
      //           number_of_correct_entries: 5,
      //           number_of_incorrect_entries: 1,
      //           correct_answers: ["true"],
      //           incorrect_answers: ["false"],
      //         },
      //       },
      //     },
      //   ],
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
    // console.log(this.state.selectedQuiz);
    return (
      <div className="takeQuizContainer">
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
          /> : null
        )}
      </div>
    );
  }
}

export default TakeQuiz;
