import React, { Component } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";
import QuestionModal from "../../components/quiz-manager-preview/QuestionModal";
import { Auth } from "aws-amplify"
import ModalBox from "../../components/modalbox/modalbox";
import logic from "../../business/business_logic";
import net from "../../business/netcomm";
import AlertDuplicateAnswers from '../../components/modalbox/alertduplicateanswers.js';


import {
    getData,
    convertFormat,
    convertQuizDetails,
} from "../../fetch-data.util";

import "./quizManager.css";

const serverUrl =
    "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/";

class QuizManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            noticeMsg: "",
            quizes: new logic.Quiz(),
            questionDeleted: false,
            questionEdited: false,
            quizThemeList: null, 
            quizDefaultTheme: null, 
            addingNewQuestion: false,
            dontCloseQuestionModal: false, 
            modalInputsModified: false,
            value: "",
            selectedQuiz: null,
            responseData: null,
            questionTypeList: null,
            questionCategoryList: null,
            currentEditQuestion: null,
            newQuestionObj: {
                question_category: "Movies",
                questioncategory_id: 3,
                question_statement: "",
                question_correct_entries: 0,
                question_wrong_entries: 0,
                questiontype_id: 1,
                questiontype_name: "Multiple Choice",
                correct_answer_num: 1,
                wrong_answer_num: 3,
                answers: [
                    {
                        answer_is_correct: true,
                        answer_statement: ""
                    },
                    {
                        answer_is_correct: false,
                        answer_statement: ""
                    },
                    {
                        answer_is_correct: false,
                        answer_statement: ""
                    },
                    {
                        answer_is_correct: false,
                        answer_statement: ""
                    }
                ]
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectQuiz = this.selectQuiz.bind(this);
    }

    componentDidMount() {
        getData(serverUrl + "quiz")
            .then((data) => convertFormat(data.payload))
            .then((arr) => this.setState({ responseData: arr }));
            

        getData(serverUrl + "questiontype")
            .then((data) => data.payload)
            .then((arr) => this.setState({ questionTypeList: arr }));

        getData(serverUrl + "questioncategory")
            .then((data) => data.payload)
            .then((arr) => this.setState({ questionCategoryList: arr }));

        if (this.props.qaCategoryList== null) {
            this.props.getQACategoryList();
        }

        const loadUser = () =>(
            Auth.currentUserInfo()
        )
        async function onLoad() {
            try {
                const user = await loadUser();
                console.log(user.username)
            }catch(e){
                console.log(e)
            }
        }

        onLoad();

        // Get quiz theme list 
        // const getQuizThemeList = async () => {
        //     const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/theme";
        //     let responsedata = await net.getData(url);
        
        //     const list = responsedata["payload"];
        //     let listdata = [];
        //     for (let i=0; i<list.length; i++) {      
        //       listdata.push(<option value={list[i]["theme_id"]} key={i}>{list[i]["theme_name"]}</option>);    
        //     }    
          
        //     let defaultTheme = list[0]["theme_id"]; 
        
        //     console.log("quizThemeList from async getQuizThemeList", listdata);
        //     this.setState({ quizThemeList: listdata, quizDefaultTheme: defaultTheme });
        // };
        
        // getQuizThemeList();
    


        // getData(serverUrl + "quizes")
        //     .then((data) => convertFormat(data.quizes))
        //     .then((arr) => this.setState({ responseData: arr }));

        // if (this.state.qaTypeList == null) {
        //     this.getQAtypeList();
        // }
    }

    selectQuiz(quizId) {
        console.log("quizId from selectQuiz in QM", quizId)
        getData(serverUrl + `quiz?quizid=${quizId}`)
            .then((data) => convertQuizDetails(data.payload[0]))
            .then((quiz) => this.setState({ selectedQuiz: quiz }));

        // getData(serverUrl + `quiz/${quizId}`)
        //     .then((data) => convertQuizDetails(data))
        //     .then((quiz) => this.setState({ selectedQuiz: quiz }));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSearch() {
        console.log("local filter");
    }

    handleEdit = (question) => {
        this.setState({ questionEdited: true });
        this.setState({ dontCloseQuestionModal: false });
        this.setState({ currentEditQuestion: question, isModalOpen: true });
    };

    handleRemove = (idx) => {
        let tempQuiz = { ...this.state.selectedQuiz }
        tempQuiz.questionsAndAnswers.splice(idx, 1);
        this.setState({ selectedQuiz: tempQuiz })

        // Set questionDeleted state to true 
        this.setState({ questionDeleted: true })
    };

    deleteQuiz = async (quizId) => {
        // let sel = this.selectQuiz(quizId);
        console.log('sel', quizId.highlightedQuizID)
        // let quiz = this.state.selectedQuiz;

        // console.log("quiz", this.state.selectedQuiz)
        console.log("responseData", this.state.responseData)
    
        const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/quiz";  
        let responsedata = null;
        let quizToDelete = {"quiz_id": quizId.highlightedQuizID}
        responsedata = await net.deleteData(url, quizToDelete);
        console.log('after delete', this.state.responsedata)
        if (responsedata.status >= 500) {
            throw (new Error(`${responsedata.status} ${responsedata.message}`));
        }
        else {
        //   this.clearQuizHeader();
            // this.onClickModalClose();
            console.log("QUIZ DELETED!");
        }

    }

    handleAddNewQuestion = () => {
        this.setState({ isModalOpen: true, currentEditQuestion: { ...this.state.newQuestionObj } });
        this.setState({ addingNewQuestion: true })
    }

    handleCurrentQuizChange = (e) => {
        this.setState({ modalInputsModified: true })
        let tempQuiz = { ...this.state.selectedQuiz };
        
        if (e.target.name === "quizName") {
            tempQuiz.name = e.target.value;
        } else {
            let quizTheme = document.getElementById('idQuizTheme')
            tempQuiz.theme_id = quizTheme.options[quizTheme.selectedIndex].value;
            tempQuiz.theme = quizTheme.options[quizTheme.selectedIndex].text;
        }
        this.setState({ selectedQuiz: tempQuiz });
    }

    handleCurrentQuestionChange = (e) => {
        // some part not updating as expected
        this.setState({ modalInputsModified: true })
        let tempQuestion = { ...this.state.currentEditQuestion };
       

        if (tempQuestion.questiontype_id === 1) {
            if (isNaN(e.target.name)) {
                console.log("e.target.value from handleCurrentQuestionChange", e.target.name)
                tempQuestion.question_statement = e.target.value
                // console.log(category.options[category.selectedIndex].value)
            } else {
                if (e.target.type === 'text') {
                    console.log(tempQuestion.answers[e.target.name].answer_statement)
                    tempQuestion.answers[e.target.name].answer_statement = e.target.value;
                } else if (e.target.type === 'radio') {
                    tempQuestion.answers[e.target.name].answer_is_correct = true;
                    tempQuestion.answers = tempQuestion.answers.map((answerObj, idx) => Number(e.target.name) !== idx ? { ...answerObj, answer_is_correct: false } : answerObj)
                }
            }
        } else if (tempQuestion.questiontype_id === 2) { // True or False
            if (isNaN(e.target.name)) {
                tempQuestion.question_statement = e.target.value
            } else {
                if (e.target.value === "true") {
                    tempQuestion.answers[0].answer_is_correct = true;
                    tempQuestion.answers[1].answer_is_correct = false;
                } else {
                    tempQuestion.answers[0].answer_is_correct = false;
                    tempQuestion.answers[1].answer_is_correct = true;
                }
            }
        } else {
            if (isNaN(e.target.name)) {
                tempQuestion.question_statement = e.target.value
            } else {
                tempQuestion.answers[e.target.name].answer_statement = e.target.value;
            }
        }

        this.setState({ currentEditQuestion: tempQuestion });
    }

    onClickModalClose = (e) => {
        const modal = e.target.parentNode.parentNode;
        modal.setAttribute("class", "modalhide");
        e.stopPropagation();
        // Handle edit modal box
        this.setState({isModalOpen: false});
        // Handle submit modal box
        this.setState({noticeMsg: ""});
        if (this.state.dontCloseQuestionModal) {
            this.handleEdit(this.state.currentEditQuestion);
        } 
      };

    hasDuplicates = (array) => {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < array.length; ++i) {
            var value = array[i].answer_statement;
            if (value in valuesSoFar) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
      }

    saveToSelectQuiz = () => {
        let tempQuiz = this.state.selectedQuiz
        this.setState({ modalInputsModified: false })
        this.setState({ questionEdited: true })

        console.log("tempQuiz at the beginning of saveToSelectQuiz", tempQuiz)

        // CHECK IF ALL ANSWER FIELDS ARE FILLED IN FOR MULTIPLE CHOICE QUESTIONS
        if (this.state.currentEditQuestion.questiontype_id === 1) {
            console.log(this.state.currentEditQuestion)
            for (let i=0; i<4; i++) {
                if (!this.state.currentEditQuestion.answers[i].answer_statement) {
                    this.setState({ dontCloseQuestionModal: true }); // Use hasDuplicates state to flag modal to return to edit window
                    this.setState({ noticeMsg: "All answer fields must be filled in!" });
                    return;
                }
            }
        }

        // CHECK IF DUPLICATE ANSWERS ARE PRESENT
        if (this.hasDuplicates(this.state.currentEditQuestion.answers)) {
            this.setState({ dontCloseQuestionModal: true }); // Use this state to flag modal to return to edit window
            this.setState({ noticeMsg: "Some of your answers are the same. Please enter only unique answers for each question." });
            return;
        } 
        // ************************************

        console.log("currentEditQuestion length", this.state.currentEditQuestion.answers.length)
        // tempQuiz.questionsAndAnswers = tempQuiz.questionsAndAnswers.map((questionObj) => console.log(questionObj));

        
        tempQuiz.questionsAndAnswers = tempQuiz.questionsAndAnswers.map((questionObj) => questionObj.question_id === this.state.currentEditQuestion.question_id ? this.state.currentEditQuestion : questionObj);

        if (this.state.addingNewQuestion) {
            tempQuiz.questionsAndAnswers.push(this.state.currentEditQuestion);
            console.log("tempQuiz after push", tempQuiz)
        } 
        // else {
        //     let newQuestionArr = tempQuiz.questionsAndAnswers.filter((questionObj) => !questionObj.hasOwnProperty("question_id"))
        //     tempQuiz.questionsAndAnswers.concat(newQuestionArr);
        // }
        
        console.log("currentEditQuestion from saveToSelectQuiz", this.state.currentEditQuestion)
        console.log("tempQuiz at end of saveToSelectQuiz", tempQuiz)
        
        this.setState({ selectedQuiz: tempQuiz });
        this.setState({ isModalOpen: false })
        console.log("selected quiz", this.state.selectedQuiz)
    }


    changeQuestionType = (e) => {
        this.setState({ modalInputsModified: true })

        let tempQuestion = { ...this.state.currentEditQuestion };
        tempQuestion.questiontype_name = e.target.value;
        tempQuestion.questiontype_id = e.target.value === "Multiple Choice" ? 1 : e.target.value === "True or False" ? 2 : 3;
        let newAnswerObj = { answer_statement: '', answer_is_correct: false };
        if (tempQuestion.questiontype_id === 1) {
            tempQuestion.answers = new Array(4).fill(null).map((e) => ({ ...newAnswerObj }))
            tempQuestion.answers[0].answer_is_correct = true;
        } else if (tempQuestion.questiontype_id === 2) {
            tempQuestion.answers = new Array(2).fill(null).map((e) => ({ ...newAnswerObj }))
            tempQuestion.answers[0].answer_statement = "True";
            tempQuestion.answers[1].answer_statement = "False";
            tempQuestion.answers[0].answer_is_correct = true;
        } else {
            tempQuestion.answers = new Array(4).fill(null).map((e) => ({ ...newAnswerObj, answer_is_correct: true }))
        }
        // if(tempQuestion.questiontype_id === 1){
        //     tempQuestion.answers = tempQuestion.answers.map((answerObj) => ({...answerObj, answer_is_correct: false}));
        //     tempQuestion.answers[0].answer_is_correct = true;
        // } else if(tempQuestion.questiontype_id === 3) {
        //     tempQuestion.answers = tempQuestion.answers.map((answerObj) => ({...answerObj, answer_is_correct: true}))
        // }
        this.setState({ currentEditQuestion: tempQuestion })
    } 

    changeQuestionCategory = (e) => {
        this.setState({ modalInputsModified: true })

        let tempQuestion = { ...this.state.currentEditQuestion };
        let category = document.getElementById('idQuestionCategory')
        tempQuestion.questioncategory_id = category.options[category.selectedIndex].value;
        tempQuestion.question_category = category.options[category.selectedIndex].text;
        this.setState({ currentEditQuestion: tempQuestion })
    }

    async updateQuiz (quizname) {

        const quiz = this.state.selectedQuiz;

        console.log("quiz", quiz)
        console.log("responseData", this.state.responseData)
    
        const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/quiz";  
        let responsedata = null;

        // DELETE QUIZ FIRST 
        if (this.state.questionDeleted || this.state.addingNewQuestion) {
            let quizToDelete = 
            {"quiz_id": quiz.quizId}
            // let storedQuizId = quiz.quizId; 
            responsedata = await net.deleteData(url, quizToDelete);
        
            if (responsedata.status >= 500) {
                throw (new Error(`${responsedata.status} ${responsedata.message}`));
            }
            else {
            //   this.clearQuizHeader();
              console.log("QUIZ DELETED!");
            }
        }
        // ----------------------- 
    
        if(quiz.questionsAndAnswers.length > 0) {  // At least one pair of question and answer
          try {
            
            let QAjson = [];
    
            for (const [key, value] of Object.entries(quiz.questionsAndAnswers)) {
              let answers = quiz.questionsAndAnswers[key].answers;
              console.log("answers in post quiz", answers)
              
            //   for (let i=0; i<answers.length; i++) {
            //       if (!answers[i].hasOwnProperty("answer_id")) {
            //           answers[i].answer_id = undefined;
            //       }
            //   }
            //   let correct_answers = quiz.questionsAndAnswers[key].correct_answers;
            //   let wrong_answers = quiz.questionsAndAnswers[key].wrong_answers;
                
            //   for (let i=0; i<correct_answers.length; i++) {
            //     answers.push({"answer_is_correct": true, "answer_statement": correct_answers[i]})
            //   }
      
            //   for (let i=0; i<wrong_answers.length; i++) {
            //     answers.push({"answer_is_correct": false, "answer_statement": wrong_answers[i]})
            // }

            
            // Correct data structure:
            let correctDS = {
                "quiz_id": 14, // DONE
                "quiz_name": "Quiz 1", // DONE
                "theme_id": 1, // DONE
                "theme_name": "History", // DONE
                "questions": [
                  {
                    "question_id": 17,
                    "question_category": "Food",
                    "questioncategory_id": 2,
                    "question_statement": "Who is this",
                    "question_correct_entries": 0,
                    "question_wrong_entries": 0,
                    "questiontype_id": 1,
                    "questiontype_name": "Multiple Choice",
                    "correct_answer_num": 1,
                    "wrong_answer_num": 3,
                    "answers": [
                      {
                        "answer_id": 61,
                        "answer_is_correct": true,
                        "answer_statement": "chocolate"
                      },
                      {
                        "answer_id": 62,
                        "answer_is_correct": false,
                        "answer_statement": "soup"
                      },
                      {
                        "answer_id": 63,
                        "answer_is_correct": false,
                        "answer_statement": "rice"
                      },
                      {
                        "answer_id": 64,
                        "answer_is_correct": false,
                        "answer_statement": "seafood"
                      }
                    ]
                  },
                ]
              }
            // This is what we are currently sending to the server
            let webdatawearesendinginQM = { 
                quiz_name: "Cars", 
                theme_id: "Science", // A theme name not a theme id
                questions: [
                        {answers: [
                        {answer_id: 109, answer_is_correct: true, answer_statement: "Peugeot"},
                        {answer_id: 110, answer_is_correct: false, answer_statement: "Mazda"}, 
                        {answer_id: 111, answer_is_correct: false, answer_statement: "Saab"}, 
                        {answer_id: 112, answer_is_correct: false, answer_statement: "Vauxhall"} 
                        ]}, 
                        {question_category: "Food"}, 
                        {question_correct_entries: 0},
                        {question_wrong_entries: 0},
                        {question_statement: "Which of the following is a French car producer?"},
                        {questioncategory_id: 1},
                        {questiontype_id: 3}  // A number not a string
                ]
                }
            
              QAjson.push({
                "question_id": value.question_id,
                "question_category": value.question_category,
                "questioncategory_id": value.questioncategory_id,
                "questiontype_id": value.questiontype_id,
                "questiontype_name": value.questiontype_name,
                "question_statement": value.question_statement,
                "question_correct_entries": value.question_correct_entries, 
                "question_wrong_entries": value.question_wrong_entries,
                "answers": answers
              });          
            }

            let webdata = {
              "quiz_name": quizname, 
              "quiz_id": quiz.quizId,
              "theme_id": quiz.theme_id,
              "theme_name": quiz.theme,
              "questions": QAjson
            }     
            console.log("webdata!", webdata)
    
            if (this.state.questionDeleted || this.state.addingNewQuestion) {
                responsedata = await net.postData(url, webdata);
            } else {
                responsedata = await net.putData(url, webdata);
            }

            // Change questionDeleted questionEdited and addingNewQuestion state back to false 
            this.setState({ questionDeleted: false })
            this.setState({ questionEdited: false })
            this.setState({ addingNewQuestion: false })

    
            if (responsedata.status >= 500) {
                throw (new Error(`${responsedata.status} ${responsedata.message}`));
            }
            else {
            //   this.clearQuizHeader();
              console.log("SUCCESS");
    
              // Must reset key when quiz controller is reset          
              this.setState({noticeMsg: "Data saved.", quizes: new logic.Quiz()});
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
    
    submitAllChanges = (quizname) => {
        // Only allow save when there is a quiz name
        try {
            if (quizname.length > 0) {
            this.setState({ modalInputsModified: false }) // Clear this state
            this.updateQuiz(quizname); // Save Quiz to the server    
            }
            else {
            this.setState({ noticeMsg: "Please enter a quiz name" });
            }
        }
        catch(ex) {
            console.log("Error:", ex.message);
            throw ex;
        }
    };

    handleBackToQM = () => {
        this.setState({ selectedQuiz: null, value: "", responseData: null })
        this.setState({ questionDeleted: false })
        this.setState({ questionEdited: false })
        this.setState({ addingNewQuestion: false })
        this.setState({ modalInputsModified: false })
        this.componentDidMount();
    }

    render() {
        let filteredQuizzes = this.state.responseData;
        // console.log(this.props.qaCategoryList)
        if (this.state.responseData) {
            filteredQuizzes = this.state.responseData.filter((quizObj) =>
                quizObj.name.toLowerCase().includes(this.state.value.toLowerCase())
            );
        }

        const modal = (
            <ModalBox
              boxID="idAlertDuplicateAnswers"
              content={<AlertDuplicateAnswers noticeMsg={this.state.noticeMsg} />}
              onClickModalClose={this.onClickModalClose}
              hide={this.state.noticeMsg ? false : true}
            />
          );
        const quizModal = this.state.noticeMsg ? (
        modal
        ) : (
        <div id="idAlertDuplicateAnswers"></div>
        );
      

        return (
            <div className="quizManagerContainer">
                <div className='box-container'>
                    {this.state.selectedQuiz ? (
                        <QuizManagerPreview
                            quiz={this.state.selectedQuiz}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                            handleAddNewQuestion={this.handleAddNewQuestion}
                            handleCurrentQuizChange={this.handleCurrentQuizChange}
                            submitAllChanges={this.submitAllChanges}
                            quizThemeList={this.state.quizThemeList}
                            addingNewQuestion={this.state.addingNewQuestion}
                            questionEdited={this.state.questionEdited}
                            questionDeleted={this.state.questionDeleted}
                            handleBackToQM={() => this.handleBackToQM()}
                            modalInputsModified={this.state.modalInputsModified}
                        />
                    ) : filteredQuizzes ? (
                        <SelectQuiz
                            subHeader={"Please select a quiz to edit!"}
                            value={this.state.value}
                            handleChange={this.handleChange}
                            responseData={filteredQuizzes}
                            selectQuiz={this.selectQuiz}
                            origin={"QuizManager"}
                            deleteQuiz={this.deleteQuiz}
                        />
                    ) : null}
                    {this.state.isModalOpen ? (
                        <ModalBox
                            boxID='idEditQAModal'
                            content={
                                <QuestionModal
                                    // qaCategory = {this.state.currentEditQuestion.question_category}
                                    qaCategoryList={this.props.qaCategoryList}
                                    currentEditQuestion={this.state.currentEditQuestion}
                                    questionTypeList={this.state.questionTypeList}
                                    handleCurrentQuestionChange={this.handleCurrentQuestionChange}
                                    changeQuestionType={this.changeQuestionType}
                                    changeQuestionCategory={this.changeQuestionCategory}
                                    saveToSelectQuiz={this.saveToSelectQuiz}
                                    modalInputsModified={this.state.modalInputsModified}
                                />}
                            onClickModalClose={this.onClickModalClose}      
                        />
                    ) : null}
            </div>
            {quizModal}
            </div>
        );
    }
}

export default QuizManager;
