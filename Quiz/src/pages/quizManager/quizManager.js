import React, { Component } from "react";

import SelectQuizM from "../../components/select-quiz/select-quizM";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";
import net from "../../business/netcomm";

import {
    getData,
    convertFormat,
    convertQuizDetails,
} from "../../fetch-data.util";

import "./quizManager.css";

const serverUrl = "http://127.0.0.1:5000/";

class QuizManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            selectedQuiz: null,
            responseData: null,
            isModalOpen: false,
            qaTypeList: null,
            currentEditQuestion: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.selectQuiz = this.selectQuiz.bind(this);
    }

    componentDidMount() {
        getData(serverUrl + "quizes")
            .then((data) => convertFormat(data.quizes))
            .then((arr) => this.setState({ responseData: arr }));

        if (this.state.qaTypeList == null) {
            this.getQAtypeList();
        }
    }

    selectQuiz(quizId) {
        getData(serverUrl + `quiz/${quizId}`)
            .then((data) => convertQuizDetails(data))
            .then((quiz) => this.setState({ selectedQuiz: quiz }));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSearch() {
       console.log('local filter')
    }

    async getQAtypeList() {
        const url = "http://127.0.0.1:5000/questiontypes";
        let responseData = await net.getData(url);

        // Convert into dictionary format for generating drop down list by other components (create-quiz)
        const list = responseData["question types"];
        let dictData = {};
        for (let i = 0; i < list.length; i++) {
            dictData[list[i]["questiontype_id"]] = {
                "caNumer": list[i]["correct_answer_num"],
                "iaNumber": list[i]["wrong_answer_num"]
            };
        }
        let listData = [];
        for (let i = 0; i < list.length; i++) {
            listData.push(<option value={list[i]["questiontype_id"]} key={i}>{list[i]["questiontype_name"]}</option>);
        }
        this.setState({ qaType: list[0]["questiontype_id"], qaTypeCheck: dictData, qaTypeList: listData });
    }

    handleEdit = (question) => {
        this.setState({currentEditQuestion:question,isModalOpen:true})
    };

    handleRemove = (e) => {
        console.log('this delete the question in the selected quiz')
    };


    render() {
        return (
            <div className="quizManagerContainer background">
                {this.state.selectedQuiz ? (
                    <QuizManagerPreview
                        quiz={this.state.selectedQuiz}
                        handleEdit={this.handleEdit}
                        handleRemove={this.handleRemove}
                    />
                ) : this.state.responseData ? (
                    <SelectQuizM
                        value={this.state.value}
                        handleChange={this.handleChange}
                        handleSearch={this.handleSearch}
                        responseData={this.state.responseData}
                        selectQuiz={this.selectQuiz}
                    />
                ) : null}
                {
                    this.state.isModalOpen ? (
                    <div className='modal'>
                        <div>
                            <h2>{this.state.currentEditQuestion.question_statement}</h2>
                        </div>
                    </div>
                    ) : null
                }
            </div>
        );
    }
}

export default QuizManager;
