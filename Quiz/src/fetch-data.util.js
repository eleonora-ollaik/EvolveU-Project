export const postData = async (url = "", data = {})  =>{
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
}

export const getData = async (url = "") => {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return response.json();
}

// collection is the json file from server.
export const convertFormat = (serverData) => {
    return serverData.map((quizObj) => ({name: quizObj.quiz_name,  quizId: quizObj.quiz_id, theme: quizObj.quiz_theme}))
}

export const convertQuizDetails = (serverData) => {
  const quizDetails = {name: serverData.quiz_name, quizId: serverData.quiz_id, theme: serverData.quiz_theme, questionsAndAnswers: serverData.questions};
  // questionsAndAnswers is now an ARRAY !!!
  return quizDetails;
}
// {
    //       name: "Superheros of the world",
    //       quizId: "1",
    //       creator: "John",
    //       theme: "Entertainment",
    //       // lastKey: 0,
    //       questionsAndAnswers: {
    //         1: {
    //           uuid: 1,
    //           category: "Entertainment: Comics",
    //           type: "open", //type: "multiple, boolean, open{short answer}",
    //           question:
    //             "This Marvel superhero is often called 'The man without fear'.",
    //           number_of_correct_entries: 5,
    //           number_of_incorrect_entries: 10,
    //           correct_answers: ["Daredevil", "Dare devil"], 
    //           incorrect_answers: ["Thor", "Wolverine", "Hulk"],
    //         },
    //         2: {
    //           uuid: 2,
    //           category: "Entertainment: Comics",
    //           type: "open", //type: "multiple, boolean, open{short answer}",
    //           question: "This hero is a mouse in the Simpsons.",
    //           number_of_correct_entries: 2,
    //           number_of_incorrect_entries: 7,
    //           correct_answers: ["Itchy"],
    //           incorrect_answers: [],
    //         },
    //       },
    //     },
// {
//     "quiz_id": 1,
//     "quiz_name": "",
//     "quiz_theme": "history",
//     "questions": [
//         {
//             "question_id": 1,
//             "quiz_id": 1,
//             "question_category": null,
//             "question_type": "multipleChoice",
//             "question_statement": "a",
//             "question_correct_entries": 0,
//             "question_wrong_entries": 0,
//             "answers": [
//                 {
//                     "answer_id": 1,
//                     "question_id": 1,
//                     "answer_is_correct": true,
//                     "answer_statement": "a",
//                     "answer_creation": "2020-07-22 23:09:28",
//                     "answer_update": "2020-07-22 23:09:28"
//                 },
//                 {
//                     "answer_id": 2,
//                     "question_id": 1,
//                     "answer_is_correct": false,
//                     "answer_statement": "a",
//                     "answer_creation": "2020-07-22 23:09:28",
//                     "answer_update": "2020-07-22 23:09:28"
//                 },
//                 {
//                     "answer_id": 3,
//                     "question_id": 1,
//                     "answer_is_correct": false,
//                     "answer_statement": "a",
//                     "answer_creation": "2020-07-22 23:09:28",
//                     "answer_update": "2020-07-22 23:09:28"
//                 },
//                 {
//                     "answer_id": 4,
//                     "question_id": 1,
//                     "answer_is_correct": false,
//                     "answer_statement": "a",
//                     "answer_creation": "2020-07-22 23:09:28",
//                     "answer_update": "2020-07-22 23:09:28"
//                 }
//             ],
//             "question_creation": "2020-07-22 23:09:28",
//             "question_update": "2020-07-22 23:09:28"
//         }
//     ],
//     "quiz_creation": "2020-07-22 23:09:28",
//     "quiz_update": "2020-07-22 23:09:28"
// }
// responseData: 
// [
//     {
//       name: "Superheros of the world",
//       quizId: "1",

// {
//   "quizes": [
//       {
//           "quiz_id": 1,
//           "quiz_name": "",
//           "quiz_theme": "history",
//           "quiz_creation": "2020-07-22 23:09:28",
//           "quiz_update": "2020-07-22 23:09:28"
//       },