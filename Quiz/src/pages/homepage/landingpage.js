import React, { Component } from 'react';
import Login from '../../components/login/Login';
import './landingpage.css';

class LandingPage extends Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <div className="landingPage">
                <div className="title">Quizera</div>
                <div>An efficient and easy-to-use online Quiz Maker</div>
                <Login />
            </div>
        )
    }
}

export default LandingPage;