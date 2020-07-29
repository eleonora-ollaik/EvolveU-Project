import React, { Component } from 'react';
import './landingpage.css';
import {Jumbotron} from 'react-bootstrap'
class LandingPage extends Component {
    // constructor(props){
    //     super(props)
    // }

    render(){
        return(
            <Jumbotron>
            <div className='landingDiv'>
                <h1>Quizera</h1>
                <br/>
                <div>Log in / Register</div>
                <br/>
                <p>This app is the best Quiz Maker in the world!</p>
            </div>
            </Jumbotron>
        )
    }
}

export default LandingPage;