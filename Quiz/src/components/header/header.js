import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import Logo from '../../assets/logo1.png'

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
        // const {handleNavigation} = this.props;
        return (

            <Navbar bg="transparent" variant="transparent">
            <div className='appHeader'>
                <Nav className="mr-auto">
                <a onClick={()=>handleNavigation(<LandingPage />)} >
                <img src={Logo} className='logoclass' alt ='logo'/>
                </a>    
                <div className='navbar'>
                    
                    <Nav.Link className='buttonNavCls' onClick={()=>handleNavigation(<CreateQuizForm />)}>Create Quiz</Nav.Link>
                   
                    <Nav.Link className='buttonNavCls' onClick={()=>handleNavigation(<TakeQuiz />)}>Take Quiz</Nav.Link>
                    <Nav.Link className='buttonNavCls' onClick={()=>handleNavigation(<QuizManager />)}>Quiz Manager</Nav.Link>
                 </div>
                 </Nav>
            </div>
        </Navbar>
        )
    }
}
export default Header;