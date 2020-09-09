import React from 'react';
import "./QuestionModal.css";



const QuestionModal = ({ currentEditQuestion,  qaCategoryList, questionTypeList, changeQuestionType, changeQuestionCategory, handleCurrentQuestionChange, saveToSelectQuiz, modalInputsModified }) => {

    return (
        <div className="modal">
            <div className="center">
                        <div className="quizQuestions">
                            <div className="label-input-top">
                                <div style={{marginBottom: "3px"}}>Question</div>
                                <input
                                    className="inputQuestions"
                                    type="text"
                                    style={{ width:"602px" }}
                                    name="question_statement"
                                    value={currentEditQuestion.question_statement}
                                    onChange={handleCurrentQuestionChange}
                                />
                            </div>
                            <div className="label-input-top" style={{marginRight: "30px"}}>
                                <div style={{marginBottom: "3px"}}>Question type</div>
                                <select onChange={changeQuestionType} value={currentEditQuestion.questiontype_name} style={{width: "180px" }}>
                                    {
                                    questionTypeList.map((questionTypeObj => <option key={questionTypeObj.questiontype_id} value={questionTypeObj.questiontype_name}>{questionTypeObj.questiontype_name}</option>))
                                    }
                                </select>
                            </div>
                            <div className="label-input-top">
                                <div style={{marginBottom: "3px"}}>Question category</div>
                                <select id="idQuestionCategory" onChange={changeQuestionCategory} value={currentEditQuestion.questioncategory_id} style={{width: "180px" }}>
                                    {qaCategoryList}
                                </select>
                            </div>
                        </div>
                            {currentEditQuestion.questiontype_id === 1 ?
                                // Multiple choice
                                currentEditQuestion.answers.map((answerObj, idx) => (
                                    <div key={idx} className="quizAnswers">
                                        <div style={{ marginRight: "15px" }}>Answer {idx+1}</div>
                                        <input className="inputAnswers" style={{ width:"515px" }} type="text" name={idx} value={answerObj.answer_statement} onChange={handleCurrentQuestionChange} />

                                        <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={handleCurrentQuestionChange} style={{marginRight: "5px"}}/>
                                        <label htmlFor="true" style={{marginRight: "15px"}}>Correct</label>
                                        <input type="radio" name={idx} checked={!answerObj.answer_is_correct} readOnly style={{marginRight: "5px"}}/>
                                        <label htmlFor="false">Incorrect</label>
                                    </div>
                                )) : currentEditQuestion.questiontype_id === 2 ?
                                    // True or False
                                    <div>
                                        <label>
                                            <input style={{ width: "1.2em", height: "1.2em" }} type="radio" name="true or false" value={true} checked={currentEditQuestion.answers[0].answer_is_correct} onChange={handleCurrentQuestionChange} />
                                            True
                                            {/* <span style={{ fontSize: "1.2em", marginRight: "20px" }}>True</span> */}
                                            </label>
                                        <label>
                                            <input type="radio" name="true or false" value={false} checked={currentEditQuestion.answers[1].answer_is_correct} onChange={handleCurrentQuestionChange} />
                                            False
                                            {/* <span style={{ fontSize: "1.2em" }}>False</span> */}
                                            </label>
                                    </div>
                                    : (
                                    // Open Ended
                                        currentEditQuestion.answers.map((answerObj, idx) => (
                                            <div className="quizAnswers" key={idx}>
                                                <div style={{ marginRight: "15px" }}>Answer {idx+1}</div>
                                                <input className="inputAnswers" style={{ width:"515px" }} type="text" name={idx} value={answerObj.answer_statement} onChange={handleCurrentQuestionChange} />
                                            </div>
                                        )))

                            }

                            {/* <select onChange={}>
                                 {qaTypeList.map((questionObj, idx) => <option key={questionObj.questiontype_name + idx}>{questionObj.questiontype_name}</option>)}
                                </select> */}
                            <button style={{marginTop: "15px", width: "150px"}} onClick={saveToSelectQuiz} className="rowBtnEdit" disabled={!modalInputsModified}>Save Changes</button>
            </div>
        </div>
    )
}

export default QuestionModal;