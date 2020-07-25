import React, { Component } from "react";

import SelectQuiz from "../../components/select-quiz/select-quiz";
import QuizManagerPreview from "../../components/quiz-manager-preview/quiz-manager-preview";
import net from "../../business/netcomm";

import {
    postData,
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

    handleEdit = (e) => {
        console.log('open modal, and edit')
    };

    handleRemove = (e) => {
        console.log('this delete the question in the selected quiz')
    };


    render() {
        // console.log(this.state.selectedQuiz);
        return (
            <div className="quizContainer">
                {this.state.selectedQuiz ? (
                    <QuizManagerPreview
                        quiz={this.state.selectedQuiz}
                        handleEdit={this.handleEdit}
                        handleRemove={this.handleRemove}
                    />
                ) : this.state.responseData ? (
                    <SelectQuiz
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
                        
                    </div>
                    ) : null
                }
            </div>
        );
    }
}

export default QuizManager;
