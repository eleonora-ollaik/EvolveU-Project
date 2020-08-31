import React, {Component} from 'react';
import './QuizTable.css'

class QuizTableM extends Component {
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
                <tr key={i} onClick={() => this.props.selectQuiz(quiz.quizId)}>
                    <td className='tableCells'>{quiz.quizId}</td>
                    <td className='quizTableName tableCells'>{quiz.name}</td>
                    <td className='tableCells'>{quiz.theme}</td>
                </tr>
            )
        });
    
        return (
            <div className='selectTable'>
                {/* <h3>Quiz creator: </h3><div>{quizDataArray[0].creator}</div>  */}
                {/* <br/> */}
                <table className='center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Quiz name</th>
                            <th>Theme</th>
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


export default QuizTableM;