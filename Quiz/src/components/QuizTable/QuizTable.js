import React, {Component} from 'react';

class QuizTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedQuizID: null
        }
    }

    // handleClick = (quizId) => {
    //     this.setState({highlightedQuizID: quizId});
        
    // }

    render(){
        const { quizData } = this.props;
        const quizDataArray = Object.values(quizData) // Turn Quiz Data (responseData) from Object to Array

        // style={{backgroundColor: this.state.highlightedQuizID === quiz.quizId?'red':'white'}}
    
        const list = quizDataArray.map((quiz, i) => {
            return (
                <tr key={i} onClick={() => this.props.selectQuiz(quiz)}>
                    <td>{quiz.quizId}</td>
                    <td>{quiz.name}</td>
                    <td>{quiz.creator}</td>
                </tr>
    
            )
        });
    
        return (
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz name</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
    
        )

    }

}


export default QuizTable;