import React, { Component } from "react";
import CreateQuiz from "../../components/create-quiz/create-quiz";
import PreviewQuiz from "../../components/preview-quiz/preview-quiz";
import EditQuiz from "../../components/edit-quiz/edit-quiz";
import ModalBox from "../../components/modalbox/modalbox";
import logic from "../../business/business_logic";
import net from "../../business/netcomm";
import CreateQuizNav from "../../components/create-quiz-navigation/create-quiz-nav";
import './CreateQuizForm.css';

export class CreateQuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      quizThemeList: null,
      quizDefaultTheme: null,
      qaTypeList: null,
      qaTypeObj: null,
      qaType: null,
      qaDefaultType: null,
      quizEdit: false,
      quizNav: "Create Quiz",
      quizes: new logic.Quiz(),
      qaID: null,
      noticeMsg: "",
      qaCategory: null,
      qaCategoryList: null,
      qaDefaultCategory: null
    };
  }

  componentDidMount() {
    if(this.state.qaTypeList == null) {
      this.getQAtypeList();
    }    

    if(this.props.qaCategoryList == null) {
      this.props.getQACategoryList();
    }    

    if(this.state.quizThemeList == null) {
      this.getQuizThemeList();
    }        
  }

  onClickEntryHandler = (e) => {
    
    // qaID = null resets the edit panel display
    // qaType = qaDefaultType resets the edit panel display independent from Preview Edit panel
    this.setState({quizNav: "Create Quiz", qaID: null, qaType: this.state.qaDefaultType, qaCategory: this.props.qaDefaultCategory});
  };

  onClickPreviewHandler = (e) => {
    this.setState({quizNav: "Preview Quiz"});
  };

  async getQAtypeList () {
    const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/questiontype";
    let responsedata = await net.getData(url);

    // Convert into dictionary format for generating drop down list by other components (create-quiz)
    const list = responsedata["payload"];
    let dictdata = {};
    let defaultType = list[0]["questiontype_id"];
    let listdata = [];
    for (let i=0; i<list.length; i++) {
      dictdata[list[i]["questiontype_id"]] = {
      "caNumer": list[i]["correct_answer_num"], "iaNumber": list[i]["wrong_answer_num"], 
      "comp": list[i]["questiontype_anscomp"]};
      listdata.push(<option value={list[i]["questiontype_id"]} key={i}>{list[i]["questiontype_name"]}</option>);    
    }    
    this.setState({qaType: defaultType, qaTypeObj: dictdata, qaTypeList: listdata, qaDefaultType: defaultType});    
  }

  // async getQACategoryList () {

  //   const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/questioncategory";
  //   let responsedata = await net.getData(url);

  //   // Convert into dictionary format for generating drop down list by other components (create-quiz)
  //   const list = responsedata["payload"];
  //   let defaultCategory = list[0]["questioncategory_id"];
  //   let listdata = [];
  //   for (let i=0; i<list.length; i++) {

  //     listdata.push(<option value={list[i]["questioncategory_id"]} key={i}>{list[i]["questioncategory_name"]}</option>);    
  //   }    
  //   this.setState({ qaCategoryList: listdata, qaDefaultCategory: defaultCategory});    
  // }
 
  async getQuizThemeList () {
    const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/theme";
    let responsedata = await net.getData(url);

    const list = responsedata["payload"];
    let listdata = [];
    for (let i=0; i<list.length; i++) {      
      listdata.push(<option value={list[i]["theme_id"]} key={i}>{list[i]["theme_name"]}</option>);    
    }    
  
    let defaultTheme = list[0]["theme_id"];

    this.setState({quizThemeList: listdata, quizDefaultTheme: defaultTheme});
  }

  async saveQuiz () {

    const quiz = this.state.quizes;

    console.log("quiz from saveQuiz", quiz)

    const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/quiz";  
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
            "questioncategory_id": value.category_id,
            "questiontype_id": value.type,
            "question_statement": value.question,
            "question_correct_entries": 0, 
            "question_wrong_entries": 0,
            "answers": answers
          });          
          console.log("QAjson", QAjson)
        }
        let webdata = {
          "quiz_name": quiz.name, 
          "theme_id": quiz.theme,
          "user_id": quiz.user_id, 
          "questions": QAjson
        }    
        console.log("webdata", webdata)

        responsedata = await net.postData(url, webdata);

        if (responsedata.status >= 500) {
            throw (new Error(`${responsedata.status} ${responsedata.message}`));
        }
        else {
          this.clearQuizHeader();

          // Must reset key when quiz controller is reset          
          this.setState({noticeMsg: "Data saved.", quizes: new logic.Quiz(), qaID: null});
        }
      }
      catch (error) {
          console.error ("Failed in saving data to server: ", error);
          this.setState({noticeMsg: "Failed in saving data to server, please try again."});
      }      
    }
    else
    {
      this.setState({noticeMsg: "Please enter at least one question for a quiz and press [Submit question]."}); 
    }
  }

  onClickQuizSumbit = (e) => {
    
    let quizname = document.getElementById("idQuizName")

    // Only allow save when there is a quiz name
    if (quizname.value.length > 0) {
      // Save Quiz to the server      
      // Clear current Quiz controller
      this.saveQuiz();            
    }
    else {
      this.setState({ noticeMsg: "Please enter a quiz name" });
    }
  };

  onClickSubmitQuestion = (e) => {
    const quizObj = new logic.Quiz();
    
    // quizObj.user_id = this.props.auth.attributes.sub
    quizObj.user_id = this.props.auth.user.username
    // console.log('this is user id:', this.props.auth.user.attributes.sub)
    quizObj.name = document.getElementById("idQuizName").value;
    quizObj.theme = document.getElementById("idQuizTheme").value;
    quizObj.QuestionsAndAnswers = this.state.quizes.QuestionsAndAnswers;

    let key = this.state.quizes.addQuestionsAndAnswers();
    let QA = this.state.quizes.getQuestionAndAnswers(key);
    const sel = document.getElementById("idQuestionType");
    QA.type = sel.value;
    QA.typename = sel.options[sel.selectedIndex].text;

    const category = document.getElementById("idQuestionCategory");
    QA.category_id = category.value;
    QA.category = category.options[category.selectedIndex].text;

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

  onChangeQuestionType = (e) => {
    const type = document.getElementById("idQuestionType").value;
    const category = document.getElementById("idQuestionCategory").value;

    this.setState({qaType: type, qaCategory: category });
  };

  onClickEdit = (e) => {
    const key = e.target.getAttribute("uuid");
    const obj = this.state.quizes.getQuestionAndAnswers(key);

    // Open edit modal box
    document.getElementById("idEditQAModal").setAttribute("class", "modalshow");

    this.setState({qaType: obj.type, qaCategory: obj.category_id, qaID: key, quizEdit: true});
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

  onClickSaveModal = (e) => {
    const quiz = this.state.quizes;
    const key = this.state.qaID; 
    const QA = new logic.QuestionsAndAnswers();
    QA.question = document.getElementById("idQuestion").value;

    let CAarray = document.querySelectorAll(".CorrectAnswer");
    let WAarray = document.querySelectorAll(".WrongAnswer");
    let type = document.getElementById("idQuestionType");
    QA.type = type.value;
    QA.typename = type.options[type.selectedIndex].text;

    let category = document.getElementById("idQuestionCategory")
    QA.category_id = category.value;
    QA.category = category.options[category.selectedIndex].text;

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

    this.onClickCloseModal(e);
    this.setState({ quizes: quiz, qaType: QA.type, qaCategory: QA.category_id });
  };

  onClickDelete = (e) => {
    const quizObj = this.state.quizes;
    const key = e.target.getAttribute("uuid");
    quizObj.deleteQuestionsAndAnswers(key);

    // qaID = null resets the edit panel display
    this.setState({ quizes: quizObj, quizNav: "Preview Quiz", qaID: null });
  };

  clearQuizHeader() {
    let quizname = document.getElementById("idQuizName")
    let quiztheme = document.getElementById("idQuizTheme")
    quizname.value = "";

    quiztheme.value = this.state.quizDefaultTheme;
  }

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

  render() {
    const entry = (
      <CreateQuiz
        quiz={this.state.quizes}
        qaType={this.state.qaType}
        qaTypeObj={this.state.qaTypeObj}
        qaTypeList={this.state.qaTypeList}
        onClick={this.onClickSubmitQuestion}
        onChange={this.onChangeQuestionType}
        qaCategoryList={this.props.qaCategoryList}        
      />
    );

    const preview = (
        <PreviewQuiz
          quiz={this.state.quizes}
          qaID={this.state.qaID}
          qaType={this.state.qaType}
          qaCategory={this.state.qaCategory}
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
                  qaCategory={this.state.qaCategory}
                  qaTypeObj={this.state.qaTypeObj}
                  qaTypeList={this.state.qaTypeList}
                  qaCategoryList={this.props.qaCategoryList}
                  onChange={this.onChangeQuestionType}
                  onClickSave={this.onClickSaveModal}     
                />}
        onClickModalClose={this.onClickCloseModal}      
      />
    ); 
    
    const quizNavPanel = this.state.quizNav === "Create Quiz" ? entry : preview;
    const quizEdit = this.state.quizEdit ? edit : <div id="idEditQAModal"></div>;
    const hidemsg = this.state.noticeMsg ? false : true;

    return (
      <div className="createQuizContainer">
        <div className='createQuizpage'>
          <CreateQuizNav
            quizNav={this.state.quizNav}
            onEntryClick={this.onClickEntryHandler}
            onPreviewClick={this.onClickPreviewHandler}
          />
          <div className="createFormContainer tabActive">

          <div className='quizInfo'>
              <div className="label-input">
                <div>Enter a name for your quiz</div>
                <input
                  type="text"
                  name="quizName"
                  placeholder="Quiz name"
                  id="idQuizName"
                />
              </div>

            <div className="label-input">
              <div>Select a quiz theme</div>
              <select name="theme" id="idQuizTheme">
                {this.state.quizThemeList}
              </select>
            </div>
          </div>

          <hr/>

          <div>
            {quizNavPanel}
            {quizEdit}
          </div>
            <button  className='button' onClick={this.onClickSubmitQuestion}>Submit Question</button>

            <button type="Submit" className='submitBtn' onClick={this.onClickQuizSumbit}>
              Submit Quiz
            </button>
          </div>
          <ModalBox content={this.state.noticeMsg} onClickModalClose={this.onClickCloseModal} hide={hidemsg}/>  
          
        </div>      
      </div>
    );
  }
}

export default CreateQuizForm;

