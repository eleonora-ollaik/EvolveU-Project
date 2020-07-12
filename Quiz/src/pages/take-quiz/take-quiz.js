import React, { Component } from 'react';
import QuizTable from '../../components/QuizTable/QuizTable'

import './take-quiz.css';

const serverUrl = 'www.dwan.com';

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

class TakeQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            responseData: [
                {
                    id: 1,
                    name: "Best chocolate in the world",
                    creator: "Cornelius"
                },

                {
                    id: 2,
                    name: "the most dangerous snakes in the world",
                    creator: "Dwan"
                },

                {
                    id: 3,
                    name: "Best beer in Calgary",
                    creator: "Donkey"
                },
            ]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    async handleSearch() {
        try {
            const response = await postData(serverUrl, this.state.value).then(data => data);
            this.setState({ responseData: response });
            console.log("fetch success")
        } catch (error) {
            console.log(error)
        }
        console.log("Search button clicked")
    }

    render() {
        return (
            <div>
                <h1>TAKE QUIZ</h1>
                <br />
                <h3>Please select a quiz to play!</h3>
                <br />
                <div>Quiz name:</div>
                <input type="text" value={this.state.value} placeholder="Search" onChange={this.handleChange} />
                <button onClick={this.handleSearch}>Search</button>
                <br />
                {
                    this.state.responseData.length ? <QuizTable quizData={this.state.responseData}/> : <div>no data found</div>
                }
            </div>
        )
    }

}

export default TakeQuiz;