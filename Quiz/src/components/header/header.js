import React, { Component } from 'react';

import './header.css';
import TakeQuiz from '../../pages/take-quiz/take-quiz';
import CreateQuizForm from '../../pages/createQuizPage/CreateQuizForm';
import LandingPage from '../../pages/homepage/landingpage';
import QuizManager from '../../pages/quizManager/quizManager';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {currentPage, handleNavigation} = this.props;
        let currentComponent = currentPage.type.name; 
        return (
            <div>
                <div className='appHeader'>
                    <a onClick={()=>handleNavigation(<LandingPage />)}>Q</a>
                </div>
                <div className='navbar'>
                        <button className="tablink" style={currentComponent === "CreateQuizForm"? {backgroundColor: "rgba(0,212,255,1)", color: "rgba(2,0,36,1)"} : null} onClick={()=>handleNavigation(<CreateQuizForm />)}>Create Quiz</button>
                        <button className="tablink" style={currentComponent === "TakeQuiz"? {backgroundColor: "rgba(197,185,247,1)", color: "rgba(56,31,111,1)"} : null} onClick={()=>handleNavigation(<TakeQuiz />)}>Take Quiz</button>
                        <button className="tablink" style={currentComponent === "QuizManager"? {backgroundColor: "rgba(229,230,189,1)", color: "rgba(82,84,12,1)"} : null} onClick={()=>handleNavigation(<QuizManager />)}>Quiz Manager</button>
                </div>
            </div>
        )
    }
}

export default Header;