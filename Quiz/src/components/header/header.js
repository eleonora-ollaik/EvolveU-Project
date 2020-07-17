import React from 'react';

import './header.css';
import TakeQuiz from '../../pages/take-quiz/take-quiz';
import CreateQuizForm from '../../pages/createQuizPage/CreateQuizForm';

const Header = ({currentPage, handleNavigation}) => (
    <div className='appHeader'>
        <button>logo</button>
        <div className='navbar'>
            <button onClick={()=>handleNavigation(<CreateQuizForm />)}>create quiz</button>
            <button onClick={()=>handleNavigation(<TakeQuiz/>)}>take quiz</button>
            <button onClick={()=>handleNavigation('createQuiz')}>quiz manager</button>
        </div>
    </div>
)

export default Header;