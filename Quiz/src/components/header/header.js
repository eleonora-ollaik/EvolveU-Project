import React, { Component } from 'react';

import './header.css';
import TakeQuiz from '../../pages/take-quiz/take-quiz';
import CreateQuizForm from '../../pages/createQuizPage/CreateQuizForm';
import LandingPage from '../../pages/homepage/landingpage';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const {currentPage, handleNavigation} = this.props;
        return (
            <div className='appHeader'>
                <button onClick={()=>handleNavigation(<LandingPage />)}>LOGO (home)</button>
                <div className='navbar'>
                    <button onClick={()=>handleNavigation(<CreateQuizForm />)}>create quiz</button>
                    <button onClick={()=>handleNavigation(<CreateQuizForm />)}>create quiz</button>
                    <button onClick={()=>handleNavigation(<TakeQuiz/>)}>take quiz</button>
                    <button onClick={()=>handleNavigation('Quiz Manager')}>quiz manager</button>
                </div>
            </div>
        )
    }
}

export default Header;