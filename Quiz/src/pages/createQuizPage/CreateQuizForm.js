import React, { Component } from "react";
import QA from "./QuestionComp";
import logic from "../../business/business_logic";
import QuizNavComp from './QuizNavComp'

export class CreateQuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        questionType: "multipleChoice",
        quizNav: "Create Quiz",
        quizes: new logic.Quiz()
    };
  }

  onClickEntryHandler = (e) => {
    this.setState({quizNav: "Create Quiz"});
  };

  onClickPreviewHandler = (e) => {
    this.setState({quizNav: "Preview Quiz"});
  };

  onClickQuizHandler = (e) => {
    console.log("Save to the server");
  };

  onClickQuestionHandler = (e) => {
    const quizObj = new logic.Quiz();
    quizObj.name = document.getElementById("idQuizName").value;
    quizObj.theme = document.getElementById("idQuizTheme").value;
    quizObj.QuestionsAndAnswers = this.state.quizes.QuestionsAndAnswers;

    let key = this.state.quizes.addQuestionsAndAnswers();
    let qAndAPair = this.state.quizes.getQuestionAndAnswers(key);
    console.log(qAndAPair);
    qAndAPair.type = document.getElementById("idQuestionType").value;
    qAndAPair.question = document.getElementById("idQuestion").value;

    const CAarray = document.querySelectorAll(".CorrectAnswer");
    for (let i=0; i<CAarray.length; i++) {
        qAndAPair.correct_answers.push(CAarray[i].value);
    }

    const WAarray = document.querySelectorAll(".WrongAnswer");
    for (let i=0; i<WAarray.length; i++) {
        qAndAPair.incorrect_answers.push(WAarray[i].value);

    }
    
    this.setState({quizes: quizObj})
    this.clearInputs()
    console.log(this.state.quizes)

}

onChangeQuestionHandler = (e) => {

   let type = document.getElementById("idQuestionType").value;
   this.setState({questionType: type});
}

clearInputs = () => {
    document.getElementById("idQuestion").value = '';

    const CAarray = document.querySelectorAll(".CorrectAnswer");
    for (let i=0; i<CAarray.length; i++) {
        CAarray[i].value = '';
    }

    const WAarray = document.querySelectorAll(".WrongAnswer");
    for (let i=0; i<WAarray.length; i++) {
        WAarray[i].value = '';
    }
}

  render() {
    const entry = <QA.QAentry quiz={this.state.quizes} QAtype={this.state.questionType} onClick={this.onClickQuestionHandler} onChange={this.onChangeQuestionHandler}/>;
    const preview = <QA.QApreview quiz={this.state.quizes} QAtype={this.state.questionType} onClick={this.onClickQuestionHandler} onChange={this.onChangeQuestionHandler}/>;

    const quizNavPanel = this.state.quizNav === "Create Quiz" ? entry : preview

    return (
      <div className="createQuizContainer">
        <QuizNavComp quizNav={this.state.quizNav} onEntryClick={this.onClickEntryHandler} onPreviewClick={this.onClickPreviewHandler}/>
        <input
          type="text"
          name="quizName"
          placeholder="Quiz name"
          id="idQuizName"
        />

        <select name="theme" id="idQuizTheme">
          <option value="history">History</option>
          <option value="geography">Geography</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>

        {quizNavPanel}

        <button type="Submit" onClick={this.onClickQuizHandler}>
          Submit
        </button>
      </div>
    );
  }
}

export default CreateQuizForm;
