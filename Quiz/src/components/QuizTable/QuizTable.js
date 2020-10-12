import React, {Component} from 'react';
import './QuizTable.css'

class QuizTable extends Component {
    constructor() {
        super();
        this.state = {
            highlightedQuizID: null
        }
    }

    render(){
        const { quizData } = this.props;

        // Capitalize user name FUNCTION 
        const capitalizeUserName = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1); 
        }
    
        const list = quizData.map((quiz, i) => {
            return (
                <tr key={i} onClick={() => this.props.selectQuiz(quiz.quizId)}>
                    <td className='tableCells idColumn'>{i+1}</td>
                    <td className='tableCells quizTableName'>{quiz.name}</td>
                    <td className='tableCells'>{quiz.theme}</td>
                    <td className='tableCells'>{capitalizeUserName(quiz.user_id)}</td>
                    <td className='tableCells'>{quiz.dateCreated.substr(0, 10)}</td>
                </tr>
    
            )
        });
    
        return (
            <div className='selectTable'>
                <table className='center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quiz name</th>
                            <th>Theme</th>
                            <th>Creator</th>
                            <th>Date created</th>

                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )

    }

}


export default QuizTable;