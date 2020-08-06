import React, { Component } from 'react';
import './landingpage.css';

class LandingPage extends Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <div className="landingPage">
                <div className="title">Quizera</div>
                <br/>
                <div>Log in / Register</div>
                <br/>
                <p>This app is the best Quiz Maker in the world!</p>
            </div>
        )
    }
}

export default LandingPage;