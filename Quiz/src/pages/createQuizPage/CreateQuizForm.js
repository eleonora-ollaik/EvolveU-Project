import React, { Component } from "react";
import CreateQuiz from "../../components/create-quiz/create-quiz";
import PreviewQuiz from "../../components/preview-quiz/preview-quiz";
import EditQuiz from "../../components/edit-quiz/edit-quiz";
import ModalBox from "../../components/modalbox/modalbox";
import logic from "../../business/business_logic";
import net from "../../business/netcomm";
import CreateQuizNav from "../../components/create-quiz-navigation/create-quiz-nav";

export class CreateQuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qaType: "multipleChoice",
      quizEdit: false,
      quizNav: "Create Quiz",
      quizes: new logic.Quiz(),
      qaID: null,
      noticeMsg: "",
    };
  }

  onClickEntryHandler = (e) => {
    // qaID = null resets the edit panel display
    this.setState({ quizNav: "Create Quiz", qaID: null });
  };

  onClickPreviewHandler = (e) => {
    this.setState({ quizNav: "Preview Quiz" });
  };

  async saveQuiz () {

    const quiz = this.state.quizes;

    const url = "http://127.0.0.1:5000/quiz";  
    let responsedata = null;

    if(Object.keys(quiz.QuestionsAndAnswers).length > 0) {  // At least one pair of question and answer
      try {
        
        let QAjson = [];

        for (const [key, value] of Object.entries(quiz.QuestionsAndAnswers)) {
          let answers =[];
          let correct_answers = quiz.QuestionsAndAnswers[key].correct_answers;
          let wrong_answers = quiz.QuestionsAndAnswers[key].wrong_answers;
  
          // console.log("correct_answers, ", correct_answers);        
          // console.log("wrong_answers, ", wrong_answers);
          for (let i=0; i<correct_answers.length; i++) {
            answers.push({"answer_is_correct": true, "answer_statement": correct_answers[i]})
          }
  
          for (let i=0; i<wrong_answers.length; i++) {
            answers.push({"answer_is_correct": false, "answer_statement": wrong_answers[i]})
          }
  
          console.log(answers);

          QAjson.push({
            "question_category": value.category,
            "question_type": value.type,
            "question_statement": value.question,
            "question_correct_entries": 0, 
            "question_wrong_entries": 0,
            "answers": answers
          });          
        }

        let webdata = {
          "quiz_name": quiz.name, 
          "quiz_theme": quiz.theme,
          "questions": QAjson
        }    

        console.log(webdata);

        responsedata = await net.postData(url, webdata);

        if (responsedata.status >= 500) {
            throw (new Error(`${responsedata.status} ${responsedata.message}`));
        }
        else {
          // Must reset key when quiz controller is reset
          this.setState({noticeMsg: "Data saved.", quizes: new logic.Quiz(), qaID: null});
        }
      }
      catch (error) {
          console.error ("Failed in saving data to server: ", error);
          this.setState({noticeMsg: "Failed in saving data to server, please try again."});
      }      
    }
  }

  onClickQuizHandler = (e) => {
    // Save Quiz to the server
    // Clear current Quiz controller
    this.saveQuiz();
    console.log("Save to the server");
  };

  onClickQuestionHandler = (e) => {
    const quizObj = new logic.Quiz();
    quizObj.name = document.getElementById("idQuizName").value;
    quizObj.theme = document.getElementById("idQuizTheme").value;
    quizObj.QuestionsAndAnswers = this.state.quizes.QuestionsAndAnswers;

    let key = this.state.quizes.addQuestionsAndAnswers();
    let qAndAPair = this.state.quizes.getQuestionAndAnswers(key);
    qAndAPair.type = document.getElementById("idQuestionType").value;
    qAndAPair.question = document.getElementById("idQuestion").value;

    const CAarray = document.querySelectorAll(".CorrectAnswer");
    for (let i = 0; i < CAarray.length; i++) {
      qAndAPair.correct_answers.push(CAarray[i].value);
    }

    const WAarray = document.querySelectorAll(".WrongAnswer");
    for (let i = 0; i < WAarray.length; i++) {
      qAndAPair.wrong_answers.push(WAarray[i].value);
    }

    this.clearInputs();

    this.setState({ quizes: quizObj });
  };

  onChangeQuestionHandler = (e) => {
    let type = document.getElementById("idQuestionType").value;
    this.setState({qaType: type});
  };

  clearInputs = () => {
    document.getElementById("idQuestion").value = "";

    const CAarray = document.querySelectorAll(".CorrectAnswer");
    for (let i = 0; i < CAarray.length; i++) {
      CAarray[i].value = "";
    }

    const WAarray = document.querySelectorAll(".WrongAnswer");
    for (let i = 0; i < WAarray.length; i++) {
      WAarray[i].value = "";
    }
  };

  onClickEdit = (e) => {
    let key = e.target.getAttribute("uuid");
    let obj = this.state.quizes.getQuestionAndAnswers(key);

    // Open edit modal box
    document.getElementById("idEditQAModal").setAttribute("class", "modalshow");

    this.setState({qaType: obj.type, qaID: key, quizEdit: true});
  };

  onClickCloseModal = (e) => {
    const modal = e.target.parentNode.parentNode;
    modal.setAttribute("class", "modalhide");
    e.stopPropagation();
    // Handle edit modal box
    this.setState({quizEdit: false});
    // Handle submit modal box
    this.setState({noticeMsg: ""});    
  };

  onClickSave = (e) => {
    const quiz = this.state.quizes;
    let key = this.state.qaID;

    console.log("onClickSave key", key);
    let obj = this.state.quizes.getQuestionAndAnswers(key);
    console.log(obj);

    const QA = new logic.QuestionsAndAnswers();
    QA.question = document.getElementById("idQuestion").value;

    let CAarray = document.querySelectorAll(".CorrectAnswer");
    let WAarray = document.querySelectorAll(".WrongAnswer");
    QA.type = document.getElementById("idQuestionType").value;
    let array = [];
    for (let i = 0; i < CAarray.length; i++) {
      array.push(CAarray[i].value);
    }

    QA.correct_answers = array;
    let Warray = [];

    for (let i = 0; i < WAarray.length; i++) {
      Warray.push(WAarray[i].value);
    }    
    QA.wrong_answers = Warray;
    quiz.QuestionsAndAnswers[key] = QA;

    this.setState({ quizes: quiz, qaType: QA.type });
  };

  onClickDelete = (e) => {
    const quizObj = this.state.quizes;
    // const key = e.target.getAttribute("uuid");
    // const qAndAPair = quizObj.deleteQuestionsAndAnswers(key);

    // qaID = null resets the edit panel display
    this.setState({ quizes: quizObj, quizNav: "Preview Quiz", qaID: null });
  };

  render() {
    const entry = (
      <CreateQuiz
        quiz={this.state.quizes}
        qaType={this.state.qaType}
        onClick={this.onClickQuestionHandler}
        onChange={this.onChangeQuestionHandler}
      />
    );

    const preview = (
        <PreviewQuiz
          quiz={this.state.quizes}
          qaID={this.state.qaID}
          qaType={this.state.qaType}
          onClickEdit={this.onClickEdit}
          onClickDelete={this.onClickDelete}
        />
    );

    const edit = (
      <ModalBox 
        boxID="idEditQAModal"        
        content={<EditQuiz
                  quiz={this.state.quizes}
                  qaID={this.state.qaID}
                  qaType={this.state.qaType}
                  onChange={this.onChangeQuestionHandler}
                  onClickSave={this.onClickSave}     
                />}
        onClickModalClose={this.onClickCloseModal}      
      />
    );
    
    const quizNavPanel = this.state.quizNav === "Create Quiz" ? entry : preview;
    const quizEdit = this.state.quizEdit ? edit : <div id="idEditQAModal"></div>;
    const hidemsg = this.state.noticeMsg ? false : true;

    return (
      <div className="createQuizContainer">
        <CreateQuizNav
          quizNav={this.state.quizNav}
          onEntryClick={this.onClickEntryHandler}
          onPreviewClick={this.onClickPreviewHandler}
        />
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
        {quizEdit}

        <button type="Submit" onClick={this.onClickQuizHandler}>
          Submit
        </button>
        
        <ModalBox content={this.state.noticeMsg} onClickModalClose={this.onClickCloseModal} hide={hidemsg}/>        
      </div>
    );
  }
}

export default CreateQuizForm;
