import React, { Component } from "react";
import CreateQuiz from "../../components/create-quiz/create-quiz";
import PreviewQuiz from "../../components/preview-quiz/preview-quiz";
import EditQuiz from "../../components/edit-quiz/edit-quiz";
import ModalBox from "../../components/modalbox/modalbox";
import logic from "../../business/business_logic";
import net from "../../business/netcomm";
import CreateQuizNav from "../../components/create-quiz-navigation/create-quiz-nav";
import {Jumbotron, Form, DropdownButton, InputGroup, Button, Dropdown} from 'react-bootstrap';
import css from './createQuiz.css'
// import {} from "react-bootstrap/esm/DropdownItem";

export class CreateQuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      quizThemeList: null,
      qaTypeList: null,
      qaTypeCheck: null,
      qaType: null,
      quizEdit: false,
      quizNav: "Create Quiz",
      quizes: new logic.Quiz(),
      qaID: null,
      noticeMsg: "",
      theme_name:'Theme',
      type_name: 'Type'
    };
  }

  componentDidMount() {
    if(this.state.qaTypeList == null) {
      this.getQAtypeList();
    }    

    if(this.state.quizThemeList == null) {
      this.getQuizThemeList();
    }        
  }

  onClickEntryHandler = (e) => {
    // qaID = null resets the edit panel display
    this.setState({quizNav: "Create Quiz", qaID: null});
  };

  onClickPreviewHandler = (e) => {
    this.setState({quizNav: "Preview Quiz"});
  };

  async getQAtypeList () {
    const url = "http://127.0.0.1:5000/questiontypes";
    let responsedata = await net.getData(url);

    // Convert into dictionary format for generating drop down list by other components (create-quiz)
    const list = responsedata["question types"];
    let dictdata = {};
    
    for (let i=0; i<list.length; i++) {
      dictdata[list[i]["questiontype_id"]] = {"caNumer": list[i]["correct_answer_num"], 
                                                "iaNumber": list[i]["wrong_answer_num"]};
    }
    console.log(dictdata)
    let listdata = [];
    for (let i=0; i<list.length; i++) {      
      // listdata.push(<Dropdown.Item value={list[i]["questiontype_id"]} key={i}>{list[i]["questiontype_name"]}</Dropdown.Item>);  
      listdata.push(<Dropdown.Item eventKey={list[i]["questiontype_id"]} key={i}>{list[i]["questiontype_name"]}</Dropdown.Item>);    
  
    }        
    this.setState({qaType: list[0]["questiontype_id"],qaTypeCheck: dictdata, qaTypeList: listdata}); 
    console.log(this.state.qaTypeList)   
  }

  async getQuizThemeList () {
    const url = "http://127.0.0.1:5000/themes";
    let responsedata = await net.getData(url);

    const list = responsedata["themes"];
    let listdata = [];
    for (let i=0; i<list.length; i++) {      
      listdata.push(<Dropdown.Item eventKey={list[i]["theme_id"]} key={i}>{list[i]["theme_name"]}</Dropdown.Item>);    
      // listdata.push(<option value={list[i]["theme_id"]} key={i}>{list[i]["theme_name"]}</option>);    
      console.log(list[i]["theme_name"])
      console.log(list[i]["theme_id"])

    }    
    this.setState({quizThemeList: listdata});
    console.log(this.state.quizThemeList)   

  }

  onChangeThemeHandler = (e) => {
    let type ;
    for (let i=0; i<this.state.qaTypeList.length; i++) {
      if (e == this.state.qaTypeList[i].props.eventKey) {
        type = this.state.qaTypeList[i].props.children;
      }
    }
    console.log('type:', type)
    this.setState({qaType: e, type_name: type});

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
  
          for (let i=0; i<correct_answers.length; i++) {
            answers.push({"answer_is_correct": true, "answer_statement": correct_answers[i]})
          }
  
          for (let i=0; i<wrong_answers.length; i++) {
            answers.push({"answer_is_correct": false, "answer_statement": wrong_answers[i]})
          }

          QAjson.push({
            "question_category": value.category,
            "questiontype_id": value.type,
            "question_statement": value.question,
            "question_correct_entries": 0, 
            "question_wrong_entries": 0,
            "answers": answers
          });          
        }

        let webdata = {
          "quiz_name": quiz.name, 
          "theme_id": quiz.theme,
          "questions": QAjson
        }    

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

  onClickQuizSumbit = (e) => {
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
    let QA = this.state.quizes.getQuestionAndAnswers(key);
    console.log(QA)
    console.log('event:', e)

    // const sel = document.getElementById("idQuestionType"); 
    // console.log(sel.value);   
    // QA.type = sel.value;
    // QA.typename = sel.DropdownButton[sel.selectedIndex].text;
    QA.typename = 'hello world';

    QA.question = document.getElementById("idQuestion").value;

    const CAarray = document.querySelectorAll(".CorrectAnswer");
    for (let i = 0; i < CAarray.length; i++) {
      QA.correct_answers.push(CAarray[i].value);
    }

    const WAarray = document.querySelectorAll(".WrongAnswer");
    for (let i = 0; i < WAarray.length; i++) {
      QA.wrong_answers.push(WAarray[i].value);
    }

    this.clearInputs();

    this.setState({ quizes: quizObj });
  };

  onChangeQuestionHandler = (e) => {
    // console.log(document.getElementById("idQuestionType").value)
    // console.log(e)
    let type ;
    // let type = document.getElementById("idQuestionType").value;
    for (let i=0; i<this.state.qaTypeList.length; i++) {
      if (e == this.state.qaTypeList[i].props.eventKey) {
      // console.log('element:', this.state.qaTypeList[i].props)
        type = this.state.qaTypeList[i].props.children;
        // console.log('Bootsrap')
      }
    }
    console.log('type:', type)
    // this.setState({qaType: type});
    this.setState({qaType: e, type_name: type});

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
        qaTypeCheck={this.state.qaTypeCheck}
        qaTypeList={this.state.qaTypeList}
        onClick={this.onClickQuestionHandler}
        onChange={this.onChangeQuestionHandler}
        question_type = {this.state.type_name}
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
                  qaTypeCheck={this.state.qaTypeCheck}
                  qaTypeList={this.state.qaTypeList}
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
      <Jumbotron>
      <div className="createQuizContainer">
        <CreateQuizNav
          quizNav={this.state.quizNav}
          onEntryClick={this.onClickEntryHandler}
          onPreviewClick={this.onClickPreviewHandler}
        />
        <br/>
        <InputGroup>
        <Form.Control
          type="text"
          name="quizName"
          placeholder="Quiz name"
          id="idQuizName"
        />
        <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={this.state.theme_name} id="idQuizTheme">
           {this.state.quizThemeList}
        </DropdownButton>
        {/* <select  name="Theme" id="idQuizTheme">
           {this.state.quizThemeList}
        </select> */}
        </InputGroup>
        <br/>
        {quizNavPanel}
        {quizEdit}
        <br/>
        <Button variant="success" type="Submit" onClick={this.onClickQuizSumbit}>
          Submit Quiz
        </Button>
        
        <ModalBox content={this.state.noticeMsg} onClickModalClose={this.onClickCloseModal} hide={hidemsg}/>        
      </div>
      </Jumbotron>
    );
  }
}

export default CreateQuizForm;

