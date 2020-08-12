import React, { Component } from 'react';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
// import './landingpage.css';


class LandingPage extends Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <div className="landingPage background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div className="title">Quizera</div>
                <span></span>
                <span></span>
                <span></span>
                <div>An efficient and easy-to-use online Quiz Maker</div>
                <span></span>
                <span></span>
                <span></span>
                <div className="flexcontainer">
                    <div className="boxes"><Login /></div>
                    <div className="boxes"><Register /></div>
                </div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
}

export default LandingPage;