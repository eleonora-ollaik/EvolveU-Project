import React, { Component } from 'react'

export class QuizComp extends Component {
    // constructor (props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                                <h1> Create Quiz</h1>
                {/* <form > */}
                    <input 
                    type = 'text'
                    name = 'quizName'
                    placeholder = 'Quiz name'
                    id = 'idQuizName'
                    />

                    <select name="theme" id="idQuizTheme">
                        <option value="history">History</option>
                        <option value="geography">Geography</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                    </select>

                    <button type = 'Submit' onClick={this.props.onClick}>
                    Submit
                    </button>


                {/* </form> */}

            </div>
        )
    }
}

export default QuizComp
