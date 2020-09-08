import React, { Component } from 'react';

const QuestionModal = ({currentEditQuestion, questionTypeList, changeQuestionType, handleCurrentQuestionChange, saveToSelectQuiz}) => {
    return (
        <div className="modal">
                        <div>
                            <input
                                type="text"
                                style={{ width:"60vw" }}
                                name="question_statement"
                                value={currentEditQuestion.question_statement}
                                onChange={handleCurrentQuestionChange}
                            />
                            <div>
                                <select onChange={changeQuestionType} value={currentEditQuestion.questiontype_name}>
                                    {
                                    questionTypeList.map((questionTypeObj => <option key={questionTypeObj.questiontype_id} value={questionTypeObj.questiontype_name}>{questionTypeObj.questiontype_name}</option>))
                                    }
                                </select>
                            </div>

                            {currentEditQuestion.questiontype_id === 1 ?
                                // Multiple choice
                                currentEditQuestion.answers.map((answerObj, idx) => (
                                    <div key={idx}>
                                        <input style={{ width:"35vw", marginRight: "15px" }} type="text" name={idx} value={answerObj.answer_statement} onChange={handleCurrentQuestionChange} />

                                        <input type="radio" name={idx} value={true} checked={answerObj.answer_is_correct} onChange={handleCurrentQuestionChange} />
                                        <label htmlFor="true">Correct</label>
                                        <input type="radio" name={idx} checked={!answerObj.answer_is_correct} readOnly />
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
                                        currentEditQuestion.answers.length < 4 ? (
                                            <div>
                                                <input type="text" name='0' value={ currentEditQuestion.answers[0].answer_statement}  onChange={handleCurrentQuestionChange}/>
                                                <input type="text" name='1' value={ currentEditQuestion.answers[1].answer_statement}  onChange={handleCurrentQuestionChange}/>
                                                <input type="text" name='2' value=''  onChange={handleCurrentQuestionChange}/>
                                                <input type="text" name='3' value=''  onChange={handleCurrentQuestionChange}/>
                                            </div>
                                        ) :
                                            currentEditQuestion.answers.map((answerObj, idx) => (
                                                <div key={idx}>
                                                    <input type="text" name={idx} value={answerObj.answer_statement} onChange={handleCurrentQuestionChange} />
                                                </div>
                                            )))

                            }

                            {/* <select onChange={}>
                                 {qaTypeList.map((questionObj, idx) => <option key={questionObj.questiontype_name + idx}>{questionObj.questiontype_name}</option>)}
                                </select> */}
                            <button style={{marginTop: "15px", width: "150px"}} onClick={saveToSelectQuiz} className="rowBtnEdit">Save Changes</button>
                        </div>
                    </div>
    )
}

export default QuestionModal;