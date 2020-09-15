import React, { Component } from "react";
import "./quiz-manager-preview.css";
import net from "../../business/netcomm";
import ModalBox from "../modalbox/modalbox";
import BackToQMConfirmation from '../modalbox/backtoqmconfirmation.js';
import DeleteConfirmationModal from '../modalbox/deleteConfirmationContent.js'
import deleteIcon from "../../assets/delete-24px.svg"; 

class QuizManagerPreview extends Component {
  constructor() {
    super();
    this.state = {
      quizThemeList: null,
      quizDefaultTheme: null,
      noticeMsg: "",
      deleteNoticeMsg: "",
    };
  }

  componentDidMount() {
    // Get quiz theme list
    const getQuizThemeList = async () => {
      const url =
        "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/theme";
      let responsedata = await net.getData(url);

      const list = responsedata["payload"];
      let listdata = [];
      for (let i = 0; i < list.length; i++) {
        listdata.push(
          <option value={list[i]["theme_id"]} key={i}>
            {list[i]["theme_name"]}
          </option>
        );
      }

      // let defaultTheme = list[0]["theme_id"];

      console.log("quizThemeList from async getQuizThemeList", listdata);
      this.setState({ quizThemeList: listdata });
    };
    getQuizThemeList();
  }

  handleBackToQM = () => {
    if (
      this.props.addingNewQuestion ||
      this.props.questionDeleted ||
      this.props.questionEdited || 
      this.props.quizEdited
    ) {
      this.setState({
        noticeMsg:
          "Changes have been made to the current quiz and will be lost if you go back to the Quiz Manager. Are you sure you want to proceed?",
      });
      // Open verify modal box
      document
        .getElementById("idVerifyGoBackToQM")
        .setAttribute("class", "modalshow");
    } else {
      this.props.handleBackToQM();
    }
  };

  handleDeleteButton = (quizId) => {
    this.setState({ deleteNoticeMsg: "Are you sure you want to delete this quiz?"});
    // this.setState({highlightedQuizID: quizId})
    // Open verify modal box
    document.getElementById("idVerifyDeleteQuizModal").setAttribute("class", "modalshow");
    
}

  onClickCloseModal = (e) => {
    console.log("boo"); 
    const modal = e.target.parentNode.parentNode;
    modal.setAttribute("class", "modalhide");
    e.stopPropagation();
    // Handle edit modal box
    // this.setState({quizEdit: false});
    // Handle submit modal box
    this.setState({noticeMsg: "", deleteNoticeMsg: ""});    
  };

  render() {
    const {
      quiz,
      handleEdit,
      handleRemove,
      handleAddNewQuestion,
      submitAllChanges,
      handleCurrentQuizChange,
      quizEdited,
      deleteQuiz
    } = this.props;

    const hidemsg = this.state.deleteNoticeMsg ? false : true;

    const modal = (
      <ModalBox
        boxID="idVerifyGoBackToQM"
        content={<BackToQMConfirmation 
          noticeMsg={this.state.noticeMsg} 
          onClickCancel={this.onClickCloseModal} 
          onClickBackToQM={this.props.handleBackToQM}/>}
        onClickModalClose={this.onClickCloseModal}
        hide={this.state.noticeMsg ? false : true}
      />
    );
    const deleteConfirmationModal =
    <ModalBox        
      boxID="idVerifyDeleteQuizModal"        
      content={<DeleteConfirmationModal 
        highlightedQuizID={quiz.quizId}  
        deleteQuiz={deleteQuiz} 
        noticeMsg={this.state.deleteNoticeMsg} 
        onClickCancel={this.onClickCloseModal}/>}
      onClickModalClose={this.onClickCloseModal} 
    hide={hidemsg}/> 

    const quizModal = this.state.noticeMsg ? (
      modal
    ) : (
      <div id="idVerifyGoBackToQM"></div>
    );

    const quizDeleteModal = this.state.deleteNoticeMsg ? deleteConfirmationModal : <div id="idVerifyDeleteQuizModal"></div>;


    let maxColNum = 0;
    for (let i = 0; i < quiz.questionsAndAnswers.length; i++) {
      if (quiz.questionsAndAnswers[i].answers.length > maxColNum) {
        maxColNum = quiz.questionsAndAnswers[i].answers.length;
      }
    }

    const answerTitle = [];
    for (let i = 0; i < maxColNum; i++) {
      answerTitle.push(<th key={`tha${i}`}>Answer {i + 1}</th>);
    }

    let entries = [];
    // console.log(quiz.questionsAndAnswers)
    for (let i = 0; i < quiz.questionsAndAnswers.length; i++) {
      // console.log("answers", quiz.questionsAndAnswers[i].answers);

      // console.log('i:', quiz.questionsAndAnswers.length);
      // console.log("question_statement", quiz.questionsAndAnswers[i].question_statement)
      entries.push(
        <TableRow
          maxColNum={maxColNum}
          qAndAPair={quiz.questionsAndAnswers[i]}
          index={i}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      );
    }

    return (
      <div>
        <br />
        <div style={{ color: "rgb(43, 57, 104)", fontSize: "1.6em" }}>{quiz.name}</div>
        {/* <button className='buttonCancel' style={{cursor: "pointer"}} onClick={() => this.handleDeleteButton(quiz.quizId)}>Delete Quiz</button> */}

        <hr width={"250px"} color={"rgb(43, 57, 104)"} style={{marginTop: "15px"}} />
            <div className="center">
              <div className="quizInfo">
                <div className="label-input">
                  <div style={{fontSize: "17px"}}>Quiz name</div>
                  <input
                    value={quiz.name}
                    type="text"
                    name="quizName"
                    placeholder="Quiz name"
                    id="idQuizName"
                    style={{ width:"400px" }}
                    onChange={handleCurrentQuizChange}
                  />
                </div>

                <div className="label-input">
                  <div style={{fontSize: "17px"}}>Quiz theme</div>
                  <select value={quiz.theme_id} name="theme" id="idQuizTheme" style={{ width:"200px" }} onChange={handleCurrentQuizChange}>
                    {this.state.quizThemeList}
                  </select>
                </div>

              </div>
            </div>

        <div className="previewContainer">
          <table className="center">
            <tbody>
              <tr>
                <th key="thq">Question</th>
                <th key="thtn">Type</th>
                <th key="thcn">Category</th>
                {answerTitle}
                <th className="cellsButtons"></th>
                <th className="cellsButtons tooltip"><span onClick={() => this.handleDeleteButton(quiz.quizId)} key={quiz.quizId} ><img className="deleteQuizBtnPreview" src={deleteIcon} alt="Delete"/><span className="tooltiptext">Delete Quiz</span></span></th>
              </tr>
              {entries}
            </tbody>
          </table>

          <div>
            Answer in <span className="correctAnswerColor">green</span>{" "}
            represents{" "}
            <span className="correctAnswerColor">correct answer.</span>
          </div>
          <div>
            Answer in <span className="incorrectAnswerColor">red</span>{" "}
            represents{" "}
            <span className="incorrectAnswerColor">wrong answer.</span>
          </div>
          <br />
        </div>

        <button onClick={handleAddNewQuestion} className="buttonAdd" style={{width: "180px"}}>Add New Question</button>
        <button onClick={() => submitAllChanges(quiz.name)} className="buttonSubmit" disabled={!quizEdited}>
          Submit all changes
        </button>
        <br />
        <button onClick={this.handleBackToQM} className="buttonBack" style={{marginBottom: "20px", marginTop: "15px"}}>Back to Quiz Manager</button>
        <br />

        {quizModal}
        {quizDeleteModal}
      </div>
    );
  }
}

const TableRow = (props) => {
  const correct = [];
  // const wrong = [];

  for (let i = 0; i < props.qAndAPair.answers.length; i++) {
    if (props.qAndAPair.answers[i].answer_statement !== "") {
      correct.push(
        <td
          key={`CA${i}`}
          className={
            props.qAndAPair.answers[i].answer_is_correct
              ? "correctAnswerColor cellsNormal"
              : "incorrectAnswerColor cellsNormal"
          }
        >
          {props.qAndAPair.answers[i].answer_statement}
        </td>
      );
    } else {
      correct.push(<td key={`EA${i}`}></td>);
    }
  }

  const ansLength = correct.length;
  if (props.maxColNum > ansLength) {
    for (let i = 0; i < props.maxColNum - ansLength; i++) {
      correct.push(<td key={`EA${i}`}></td>);
    }
  }

  return (
    <tr>
      <td className="tdQuestion cellsNormal">
        {props.qAndAPair.question_statement}
      </td>
      <td className="cellsNormal">{props.qAndAPair.questiontype_name}</td>
      <td className="cellsNormal">{props.qAndAPair.question_category}</td>
      {correct}
      {/* {wrong} */}
      <td className="cellsButtons">
        <button
          className="rowBtnEdit"
          onClick={() => props.handleEdit(props.qAndAPair)}
        >
          Edit
        </button>
      </td>
      <td className="cellsButtons">
        <button className="rowBtnDelete" onClick={() => props.handleRemove(props.index)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default QuizManagerPreview;
