import React from 'react'

const QuizManagerPreview = ({ quiz, handleEdit, handleRemove }) => {
    console.log(quiz)
    return (
        <div>
            <div>{quiz.name}</div>
            <div>{quiz.Id}</div>
            {
                quiz.questionsAndAnswers.map(
                    (question, idx) =>
                        <div key={idx}>
                            <div>{question.question_statement}</div>
                            <ul>
                                {question.answers.map((answer, idx) =>
                                    <li key={answer.answer_statement + idx}>
                                        <div>{answer.answer_statement} {String(answer.answer_is_correct)}</div>
                                    </li>
                                )}
                            </ul>
                            <button onClick={() => handleEdit(question)}>Edit</button>
                            <button onClick={() => handleRemove(question)}>Remove</button>
                        </div>
                )
            }
        </div>

    )
}

export default QuizManagerPreview;