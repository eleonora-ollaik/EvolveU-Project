import React, {Component} from 'react';
import { Table, Container } from 'react-bootstrap';

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

        // style={{backgroundColor: this.state.highlightedQuizID === quiz.quizId?'red':'white'}}
    
        const list = quizData.map((quiz, i) => {
            return (
                <tr key={i} onClick={() => this.props.selectQuiz(quiz.quizId)} style={{padding: "0", cursor: "pointer"}}>
                    <td>{quiz.quizId}</td>
                    <td>{quiz.name}</td>
                    <td>{quiz.theme}</td>
                    {/* <td>{quiz.creator}</td> */}
                </tr>
    
            )
        });
    
        return (
            <Container style={{width: "480px"}} >
                <div className="table-responsive-sm">
                    <Table className="table table-striped">
                        <thead className="thead-light" style={{padding: "0"}}>
                            <tr>
                                <th>ID</th>
                                <th>Quiz name</th>
                                <th>Theme</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </Table>
                </div>
            </Container> 
    
        )

    }

}


export default QuizTable;