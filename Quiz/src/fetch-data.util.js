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
    console.log("serverData from convertFormat", serverData)
    return serverData.map((quizObj) => ({name: quizObj.quiz_name,  quizId: quizObj.quiz_id, theme: quizObj.theme_name, theme_id: quizObj.theme_id}))
}

export const convertQuizDetails = (serverData) => {
  const quizDetails = {name: serverData.quiz_name, quizId: serverData.quiz_id, theme: serverData.theme_name, theme_id: serverData.theme_id, questionsAndAnswers: serverData.questions};
  // questionsAndAnswers is now an ARRAY !!!
  return quizDetails;
}