import React from 'react';

const QuizTable = ({ quizData }) => {
    const list = quizData.map((quiz, i) => {
        return (
            <tr key={i}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.creator}</td>
            </tr>

        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Quiz name</th>
                    <th>Creator</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>

    )

}

export default QuizTable;