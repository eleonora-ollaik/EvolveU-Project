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
        console.log("quizData in QuizTable", quizData)
        // console.log(JSON.stringify(quizData, null, 2));
        // style={{backgroundColor: this.state.highlightedQuizID === quiz.quizId?'red':'white'}}
    
        const list = quizData.map((quiz, i) => {
            return (
                <tr key={i} onClick={() => this.props.selectQuiz(quiz.quizId)}>
                    <td className='tableCells'>{i+1}</td>
                    <td className='quizTableName tableCells'>{quiz.name}</td>
                    <td className='tableCells'>{quiz.theme}</td>
                    <td className='tableCells'>{quiz.user_id}</td>
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