import React, { Component } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";
import QuestionModal from "../../components/quiz-manager-preview/QuestionModal";
import { Auth } from "aws-amplify"

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
            value: "",
            selectedQuiz: null,
            responseData: null,
            isModalOpen: false,
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

        const loadUser = () =>(
            Auth.currentUserInfo()
        )
        async function onLoad() {
            try {
                const user = await loadUser();
                console.log(user)
            }catch(e){
                console.log(e)
            }
        }

        onLoad();

        // getData(serverUrl + "quizes")
        //     .then((data) => convertFormat(data.quizes))
        //     .then((arr) => this.setState({ responseData: arr }));

        // if (this.state.qaTypeList == null) {
        //     this.getQAtypeList();
        // }
    }

    selectQuiz(quizId) {
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
        this.setState({ currentEditQuestion: question, isModalOpen: true });
    };

    handleRemove = (idx) => {
        let tempQuiz = { ...this.state.selectedQuiz }
        tempQuiz.questionsAndAnswers.splice(idx, 1);
        this.setState({ selectedQuiz: tempQuiz })
    };

    handleAddNewQuestion = () => {
        this.setState({ isModalOpen: true, currentEditQuestion: { ...this.state.newQuestionObj } });
    }

    handleCurrentQuestionChange = (e) => {
        // some part not updating as expected
        let tempQuestion = { ...this.state.currentEditQuestion };
        if (tempQuestion.questiontype_id === 1) {
            if (isNaN(e.target.name)) {
                tempQuestion.question_statement = e.target.value
            } else {
                if (e.target.type === 'text') {
                    tempQuestion.answers[e.target.name].answer_statement = e.target.value;
                } else {
                    tempQuestion.answers[e.target.name].answer_is_correct = true;
                    tempQuestion.answers = tempQuestion.answers.map((answerObj, idx) => Number(e.target.name) !== idx ? { ...answerObj, answer_is_correct: false } : answerObj)
                }
            }
        } else if (tempQuestion.questiontype_id === 2) {
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
                console.log('question_statement')
                tempQuestion.question_statement = e.target.value
            } else {
                tempQuestion.answers[e.target.name].answer_statement = e.target.value;
            }
        }

        this.setState({ currentEditQuestion: tempQuestion });
    }

    saveToSelectQuiz = () => {
        let tempQuiz = { ...this.state.selectedQuiz }
        tempQuiz.questionsAndAnswers = tempQuiz.questionsAndAnswers.map((questionObj) => questionObj.question_id === this.state.currentEditQuestion.question_id ? this.state.currentEditQuestion : questionObj);
        let newQuestionArr = tempQuiz.questionsAndAnswers.filter((questionObj) => !questionObj.hasOwnProperty("question_id"))
        tempQuiz.questionsAndAnswers.concat(newQuestionArr);
        this.setState({ selectedQuiz: tempQuiz })
    }

    changeQuestionType = (e) => {
        let tempQuestion = { ...this.state.currentEditQuestion };
        tempQuestion.questiontype_name = e.target.value;
        tempQuestion.questiontype_id = e.target.value === "Multiple Choice" ? 1 : e.target.value === "True or False" ? 2 : 3;
        let newAnswerObj = { answer_statement: '', answer_is_correct: false };
        if (tempQuestion.questiontype_id === 1) {
            tempQuestion.answers = new Array(4).fill(null).map((e) => ({ ...newAnswerObj }))
            console.log(tempQuestion.answers)
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

    render() {
        let filteredQuizzes = this.state.responseData;
        if (this.state.responseData) {
            filteredQuizzes = this.state.responseData.filter((quizObj) =>
                quizObj.name.toLowerCase().includes(this.state.value.toLowerCase())
            );
        }

        return (
            <div className="quizManagerContainer background">
                <div className='box-container'>
                    {this.state.selectedQuiz ? (
                        <QuizManagerPreview
                            quiz={this.state.selectedQuiz}
                            handleEdit={this.handleEdit}
                            handleRemove={this.handleRemove}
                            handleAddNewQuestion={this.handleAddNewQuestion}
                        />
                    ) : filteredQuizzes ? (
                        <SelectQuiz
                            subHeader={"Please select a quiz to edit!"}
                            value={this.state.value}
                            handleChange={this.handleChange}
                            responseData={filteredQuizzes}
                            selectQuiz={this.selectQuiz}
                            origin={"QuizManager"}
                        />
                    ) : null}
                    {this.state.isModalOpen ? (
                        <QuestionModal
                            currentEditQuestion={this.state.currentEditQuestion}
                            questionTypeList={this.state.questionTypeList}
                            handleCurrentQuestionChange={this.handleCurrentQuestionChange}
                            changeQuestionType={this.changeQuestionType}
                            saveToSelectQuiz={this.saveToSelectQuiz}
                        />
                    ) : null}
            </div>
            </div>
        );
    }
}

export default QuizManager;
