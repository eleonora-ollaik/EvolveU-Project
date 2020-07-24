import React, { Component } from "react";
import SelectQuizM from "../../components/select-quiz/select-quizM";
// Component "EditQuiz" still needs to be done - B&E have already created this
// import EditQuiz from "../../components/edit-quiz";

import "./quizManager.css";

const serverUrl = "www.dwan.com";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

class QuizManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedQuiz: null,
      responseData: [
        {
          name: "Superheros of the world",
          quizId: "1",
          creator: "John",
          theme: "Entertainment",
          // lastKey: 0,
          questionsAndAnswers: {
            1: {
              uuid: 1,
              category: "Entertainment: Comics",
              type: "open", //type: "multiple, boolean, open{short answer}",
              question:
                "This Marvel superhero is often called 'The man without fear'.",
              number_of_correct_entries: 5,
              number_of_incorrect_entries: 10,
              correct_answers: ["Daredevil", "Dare devil"], 
              incorrect_answers: ["Thor", "Wolverine", "Hulk"],
            },
            2: {
              uuid: 2,
              category: "Entertainment: Comics",
              type: "open", //type: "multiple, boolean, open{short answer}",
              question: "This hero is a mouse in the Simpsons.",
              number_of_correct_entries: 2,
              number_of_incorrect_entries: 7,
              correct_answers: ["Itchy"],
              incorrect_answers: [],
            },
          },
        },
        {
          name: "Chocolates of the world",
          quizId: "2",
          creator: "Cornelius",
          theme: "Food",
          // lastKey: 0,
          questionsAndAnswers: {
            3:{
              uuid: 3,
              category: "Food",
              type: "multiple", //type: "multiple, boolean, open{short answer}",
              question: "These are some famous Swiss brands.",
              number_of_correct_entries: 2,
              number_of_incorrect_entries: 4,
              correct_answers: ["Lindt", "Callier"],
              incorrect_answers: ["Mars", "Cadbury"],
            },
            4: {
              uuid: 4,
              category: "Food",
              type: "boolean", //type: "multiple, boolean, open{short answer}",
              question:
                "White chocolate does not contain cocoa solids. True or false?",
              number_of_correct_entries: 5,
              number_of_incorrect_entries: 1,
              correct_answers: ["true"],
              incorrect_answers: ["false"],
            },
          },
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
  }

  componentDidMount() {
      console.log("Component mounted")
      // Function goes here
      // Pass username to server and retrieve only quizzes where creator matches username 
  }

  selectQuiz(quiz) {
    this.setState({ selectedQuiz: quiz });
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
            <div>EditQuiz component goes here</div>
          /* <EditQuiz
            selectedQuiz={
              this.state.selectedQuiz
            }
          /> */
        ) : (
          <SelectQuizM
            value={this.state.value}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            responseData={this.state.responseData}
            selectQuiz={this.selectQuiz}
          />
        )}
      </div>
    );
  }
}

export default QuizManager;
