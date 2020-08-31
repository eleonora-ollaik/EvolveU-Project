import React, { Component } from 'react'

const QuizManagerPreview = ({ quiz, handleEdit, handleRemove, handleAddNewQuestion }) => {
    let maxColNum = 0;
    for (let i=0; i<quiz.questionsAndAnswers.length; i++) {
        if (quiz.questionsAndAnswers[i].answers.length > maxColNum) {
            maxColNum = quiz.questionsAndAnswers[i].answers.length;
        };
    }
    
    const answerTitle = [];
    for (let i=0; i<maxColNum; i++){
      answerTitle.push(<th key={`tha${i}`}>Answer {i+1}</th>)
    }

    let entries = []
    for (let i=0; i<quiz.questionsAndAnswers.length; i++) {
        entries.push(<TableRow quiz={quiz.questionsAndAnswers[i]} handleEdit={handleEdit} handleRemove={handleRemove}/>)
}
    // for (let i=0; i<QA.wrong_answers.length; i++) {
    //   wrong.push(<td key={`IA${uuid}${i}`} className="wrongAnswerColor cellsNormal">{QA.wrong_answers[i]}</td>);
    // }
    // const ansLength = QA.correct_answers.length + QA.wrong_answers.length;
    // if (this.props.maxColNum > ansLength) {
    //   for (let i=0; i<(this.props.maxColNum-ansLength); i++){
    //     wrong.push(<td key={`EA${uuid}${i}`}></td>)
    //   }
    // }
    console.log("questionsandanswers", quiz.questionsAndAnswers)

    return (
        <div>
            <div>{quiz.name}</div>
            <div>{quiz.Id}</div>

            <div className="previewContainer">
                <table className="center">
                    <tbody>
                        <tr>
                            {/* <th key="thk">Key</th> */}
                            <th key="thq">Question</th>
                            {/* <th key="thtid">Type ID</th> */}
                            <th key="thtn">Type</th>
                            {/* <th key="thcid">Category ID</th> */}
                            <th key="thcn">Category</th>
                            {answerTitle}
                        </tr>
                        {entries}
                          
                                     {/* /* <div key={idx}>
                                        <div>{question.question_statement}</div>
                                        <ul>
                                            {question.answers.map((answer, idx) =>
                                                <li key={answer.answer_statement + idx}>
                                                    <div>{answer.answer_statement} {String(answer.answer_is_correct)}</div>
                                                </li>
                                            )}
                                        </ul>
                                    </div> 
                          */}
                    </tbody>
                </table>
                {/* {FootNote}                */}
            </div>

            <button onClick={handleAddNewQuestion}> Add New Question </button>
            <button> Submit all changes </button>

        </div>

    )
}




export class TableRow extends Component {
    
    render() {
        const correct = [];
        // const wrong = [];
    
        for (let i=0; i<this.props.quiz.answers.length; i++) {
            correct.push(<td key={`CA${i}`} className="correctAnswerColor cellsNormal">{this.props.quiz.answers[i].answer_statement}</td>);
            console.log("answer_statement", this.props.quiz.answers[i].answer_statement)
            }
    
    return (
        Object.keys(this.props.quiz).map(
            (question, idx) =>
                    <tr>
                        <td key={`Q${idx}`} className="tdQuestion cellsNormal">{question.question_statement}</td>
                        <td key={`TN${idx}`} className="cellsNormal">{question.questiontype_name}</td>
                        <td key={`CN${idx}`} className="cellsNormal">{question.question_category}</td>
                        {correct} 
                        {/* {wrong} */} 
                        <td key={`BE${idx}`} className="cellsButtons">
                        <button key={`BEdit${idx}`} className='rowBtnEdit' uuid={idx} onClick={() => this.props.handleEdit(question)}>Edit</button>
                        </td>
                        <td key={`BD${idx}`} className="cellsButtons">
                        <button key={`BDel${idx}`} className='rowBtnDelete' uuid={idx} onClick={() => this.props.handleRemove(idx)}>Delete</button>
                        </td>
                    </tr>
    ))
    }
}

export default QuizManagerPreview;