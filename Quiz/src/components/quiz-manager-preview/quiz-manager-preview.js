import React from "react";
import "../../pages/quizManager/quizManager.css";

const QuizManagerPreview = ({
  quiz,
  handleEdit,
  handleRemove,
  handleAddNewQuestion,
}) => {
  console.log("length:", quiz.questionsAndAnswers.length);
  let maxColNum = 0;
  for (let i = 0; i < quiz.questionsAndAnswers.length; i++) {
    if (quiz.questionsAndAnswers[i].answers.length > maxColNum) {
      maxColNum = quiz.questionsAndAnswers[i].answers.length;
    }
  }

  const answerTitle = [];
  for (let i = 0; i < maxColNum; i++) {
    answerTitle.push(<th key={`tha${i}`}>Answer {i + 1}</th>);
  }

  let entries = [];
  // console.log(quiz.questionsAndAnswers)
  for (let i = 0; i < quiz.questionsAndAnswers.length; i++) {
    console.log("answers", quiz.questionsAndAnswers[i].answers);

    // console.log('i:', quiz.questionsAndAnswers.length);
    // console.log("question_statement", quiz.questionsAndAnswers[i].question_statement)
    entries.push(
      <TableRow
        maxColNum={maxColNum}
        qAndAPair={quiz.questionsAndAnswers[i]}
        handleEdit={handleEdit}
        handleRemove={handleRemove}
      />
    );
  }
  console.log("entries:", entries);
  console.log("questionsandanswers", quiz.questionsAndAnswers);

  return (
    <div>
      <div>{quiz.name}</div>
      <div>{quiz.Id}</div>

      <div className="previewContainer">
        <table className="center">
          <tbody>
            <tr>
              <th key="thq">Question</th>
              <th key="thtn">Type</th>
              <th key="thcn">Category</th>
              {answerTitle}
            </tr>
            {entries}

          </tbody>
        </table>

        <br />
        <div>
          Answer in <span className="correctAnswerColor">green</span> represents{" "}
          <span className="correctAnswerColor">correct answer.</span>
        </div>
        <div>
          Answer in <span className="incorrectAnswerColor">red</span> represents{" "}
          <span className="incorrectAnswerColor">wrong answer.</span>
        </div>
        <br />
      </div>

      <button onClick={handleAddNewQuestion}> Add New Question </button>
      <button> Submit all changes </button>
    </div>
  );
};

const TableRow = (props) => {
  const correct = [];
  // const wrong = [];

  for (let i = 0; i < props.qAndAPair.answers.length; i++) {
    if (props.qAndAPair.answers[i].answer_statement !== "") {
      correct.push(
        <td
          key={`CA${i}`}
          className={
            props.qAndAPair.answers[i].answer_is_correct
              ? "correctAnswerColor cellsNormal"
              : "incorrectAnswerColor cellsNormal"
          }
        >
          {props.qAndAPair.answers[i].answer_statement}
        </td>
      );
      console.log(
        "answer_statement",
        props.qAndAPair.answers[i].answer_statement
      );
    } else {
      correct.push(<td key={`EA${i}`}></td>);
    }
  }

  const ansLength = correct.length;
  if (props.maxColNum > ansLength) {
    for (let i = 0; i < props.maxColNum - ansLength; i++) {
      correct.push(<td key={`EA${i}`}></td>);
    }
  }

  return (
    <tr>
      <td className="tdQuestion cellsNormal">
        {props.qAndAPair.question_statement}
      </td>
      <td className="cellsNormal">{props.qAndAPair.questiontype_name}</td>
      <td className="cellsNormal">{props.qAndAPair.question_category}</td>
      {correct}
      {/* {wrong} */}
      <td className="cellsButtons">
        <button
          className="rowBtnEdit"
          onClick={() => props.handleEdit(props.qAndAPair)}
        >
          Edit
        </button>
      </td>
      <td className="cellsButtons">
        <button className="rowBtnDelete" onClick={() => props.handleRemove()}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default QuizManagerPreview;
