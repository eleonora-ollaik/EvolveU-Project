import React, {Component} from 'react';
import './QuizTable.css'

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
        // console.log(JSON.stringify(quizData, null, 2));
        // style={{backgroundColor: this.state.highlightedQuizID === quiz.quizId?'red':'white'}}
    
        const list = quizData.map((quiz, i) => {
            return (
                <tr key={i} onClick={() => this.props.selectQuiz(quiz.quizId)}>
                    <td className='tableCells'>{quiz.quizId}</td>
                    <td className='quizTableName tableCells'>{quiz.name}</td>
                    <td className='tableCells'>{quiz.theme}</td>
                    {/* <td>{quiz.creator}</td> */}
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