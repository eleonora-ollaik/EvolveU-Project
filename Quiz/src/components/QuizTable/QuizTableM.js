import React, {Component} from 'react';
import './QuizTableM.css'
import ModalBox from "../modalbox/modalbox";
import DeleteConfirmation from '../modalbox/deleteConfirmationContent.js';
import deleteIcon from "../../assets/delete-24px.svg"; 

class QuizTableM extends Component {
    constructor() {
        super();
        this.state = {
            highlightedQuizID: null,
            noticeMsg: "",
        }
    }

    handleDeleteButton = (quizId) => {
        this.setState({ noticeMsg: "Are you sure you want to delete this quiz?"});
        this.setState({highlightedQuizID: quizId})
        // Open verify modal box
        document.getElementById("idVerifyDeleteQuizModal").setAttribute("class", "modalshow");
        
    }

    onClickCloseModal = (e) => {
        const modal = e.target.parentNode.parentNode;
        modal.setAttribute("class", "modalhide");
        e.stopPropagation();
        // Handle edit modal box
        // this.setState({quizEdit: false});
        // Handle submit modal box
        this.setState({noticeMsg: ""});
        console.log('highlighted id from quiztable2:', this.state.highlightedQuizID)
    
      };

    render(){
        const hidemsg = this.state.noticeMsg ? false : true;

        const modal =
                <ModalBox         
                boxID="idVerifyDeleteQuizModal"        
                content={<DeleteConfirmation highlightedQuizID={this.state.highlightedQuizID} deleteQuiz={this.props.deleteQuiz} noticeMsg={this.state.noticeMsg} onClickCancel={this.onClickCloseModal}/>}
                onClickModalClose={this.onClickCloseModal} 
                hide={hidemsg}/> 

        const { quizData } = this.props;
        const quizDataArray = Object.values(quizData) // Turn Quiz Data (responseData) from Object to Array
        const quizModal = this.state.noticeMsg ? modal : <div id="idVerifyDeleteQuizModal"></div>;

        // style={{backgroundColor: this.state.highlightedQuizID === quiz.quizId?'red':'white'}}
    
        const list = quizDataArray.map((quiz, i) => {
            return (
                <tr key={i}>
                    <td className='tableCells'>{i+1}</td>
                    <td className='quizTableName tableCells' onClick={() => this.props.selectQuiz(quiz.quizId)}>{quiz.name}</td>
                    <td className='tableCells'>{quiz.theme}</td>
                    <td className="tableCells deleteQuizBtn"><span onClick={() => this.handleDeleteButton(quiz.quizId)} key={quiz.quizId} ><img src={deleteIcon} alt="Delete"/></span></td>
                </tr>
            )
        });
    
        return (
            <div>
                <div className='selectTable'>
                    {/* <h3>Quiz creator: </h3><div>{quizDataArray[0].creator}</div>  */}
                    {/* <br/> */}
                    <table className='center'>
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Quiz name</th>
                                <th>Theme</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>

               {quizModal}
            </div>
        )

    }

}


export default QuizTableM;