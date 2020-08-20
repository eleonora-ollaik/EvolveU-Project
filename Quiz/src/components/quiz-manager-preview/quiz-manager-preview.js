import React from 'react'

const QuizManagerPreview = ({ quiz, handleEdit, handleRemove, handleAddNewQuestion }) => {

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
                            <button onClick={() => handleRemove(idx)}>Remove</button>
                        </div>
                )
            }
            <button onClick={handleAddNewQuestion}> Add New Question </button>
            <button> Submit all changes </button>

        </div>

    )
}

export default QuizManagerPreview;