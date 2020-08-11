import React, { Component } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";

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

    handleCurrentQuestionChange = (e) => {
        // some part not updating as expected
        let tempQuestion = { ...this.state.currentEditQuestion };
        if (isNaN(e.target.name)) {
            console.log('question_statement')
            tempQuestion.question_statement = e.target.value
        } else {
            if (e.target.type === 'text') {
                console.log('answer_statement')
                tempQuestion.answers[e.target.name].answer_statement = e.target.value;
            } else {
                tempQuestion.answers[e.target.name].answer_is_correct = true;
                tempQuestion.answers = tempQuestion.answers.map((answerObj, idx) => Number(e.target.name) !== idx ? { ...answerObj, answer_is_correct: false } : answerObj)
            }
        }

        this.setState({ currentEditQuestion: tempQuestion });
    }

    saveToSelectQuiz = () => {
        console.log(this.state.selectedQuiz)
        let tempQuiz = { ...this.state.selectedQuiz }
        tempQuiz.questionsAndAnswers = tempQuiz.questionsAndAnswers.map((questionObj) => questionObj.question_id === this.state.currentEditQuestion.question_id ? this.state.currentEditQuestion : questionObj);
        this.setState({ selectedQuiz: tempQuiz })
    }

    changeQuestionType = (e) => {
        console.log(e.target.value)
        let tempQuestion = { ...this.state.currentEditQuestion };
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
                {this.state.selectedQuiz ? (
                    <QuizManagerPreview
                        quiz={this.state.selectedQuiz}
                        handleEdit={this.handleEdit}
                        handleRemove={this.handleRemove}
                    />
                ) : filteredQuizzes ? (
                    <SelectQuiz
                        subHeader={"Please select a quiz to edit!"}
                        value={this.state.value}
                        handleChange={this.handleChange}
                        responseData={filteredQuizzes}
                        selectQuiz={this.selectQuiz}
                    />
                ) : null}
                {this.state.isModalOpen ? (
                    <div className="modal">
                        <div>
                            <input
                                type="text"
                                name="question_statement"
                                value={this.state.currentEditQuestion.question_statement}
                                onChange={this.handleCurrentQuestionChange}
                            />
                            <div>
                                <div>question type</div>
                                <select onChange={this.changeQuestionType}>
                                    {
                                        this.state.questionTypeList.map((questionTypeObj => <option key={questionTypeObj.questiontype_id} value={questionTypeObj.questiontype_id}>{questionTypeObj.questiontype_name}</option>))
                                    }
                                </select>
                            </div>
                            {this.state.currentEditQuestion.questiontype_id === 1 ?

                                this.state.currentEditQuestion.answers.map((answerObj, idx) => (
                                    <div key={idx}>
                                        <input type="text" name={idx} value={answerObj.answer_statement} onChange={this.handleCurrentQuestionChange} />

                                        <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={this.handleCurrentQuestionChange} />
                                        <label htmlFor="true">Correct</label>
                                        <input type="radio" name={idx} checked={!answerObj.answer_is_correct} readOnly />
                                        <label htmlFor="false">Incorrect</label>
                                    </div>
                                )) : this.state.currentEditQuestion.questiontype_id === 2 ?
                                    this.state.currentEditQuestion.answers.map((answerObj, idx) => (
                                        <div key={idx}>
                                            <label>
                                                <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={this.handleCurrentQuestionChange} />
                                            True
                                            </label>
                                            <label>
                                                <input type="radio" name={idx} value={false} checked={!answerObj.answer_is_correct} onChange={this.handleCurrentQuestionChange} />
                                            False
                                            </label>
                            
                                            {/* <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={this.handleCurrentQuestionChange} />
                                            <label htmlFor="true">Correct</label>
                                            <input type="radio" name={idx} checked={!answerObj.answer_is_correct} readOnly />
                                            <label htmlFor="false">Incorrect</label> */}
                                        </div> 
                                    )) :null   
                                
                        }

                            {/* <select onChange={}>
                                 {this.state.qaTypeList.map((questionObj, idx) => <option key={questionObj.questiontype_name + idx}>{questionObj.questiontype_name}</option>)}
                                </select> */}
                            <button onClick={this.saveToSelectQuiz}>Save Changes</button>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default QuizManager;
