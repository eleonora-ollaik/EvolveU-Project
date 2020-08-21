import React, { Component } from "react";

import "./header.css";
import TakeQuiz from "../../pages/take-quiz/take-quiz";
import CreateQuizForm from "../../pages/createQuizPage/CreateQuizForm";
import LandingPage from "../../pages/homepage/landingpage";
import QuizManager from "../../pages/quizManager/quizManager";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentPage, handleNavigation } = this.props;
    let currentComponent = currentPage.type.name;
    return (
      <div className="appHeader">
        <button className="Q-logo" onClick={() => handleNavigation(<LandingPage />)}>Q</button>
        
        <button
          className={`tablink ${
            currentComponent === "TakeQuiz" ? "takeButtonActive" : ""
          }`}
          onClick={() => handleNavigation(<TakeQuiz />)}
        >
          Take Quiz
        </button>
        
      </div>
    );
  }
}

export default Header;
