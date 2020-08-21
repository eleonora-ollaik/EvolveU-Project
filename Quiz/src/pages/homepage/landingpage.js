import React, { Component } from 'react';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import './landingpage.css';


class LandingPage extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        console.log("Logged in on LandingPage? ", this.props.isLoggedIn)
        const loginRegister = (!this.props.isLoggedIn? 
            <div>
                <div className="boxes"><Login handleLoggedIn={()=> this.props.handleLoggedIn()}/></div>
                <div className="boxes"><Register /></div>
            </div> :
            <div>Hello</div>
        )
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
                <div style={{color: "white"}}>An efficient and easy-to-use online Quiz Maker</div>
                <span></span>
                <span></span>
                <span></span>
                <div className="flexcontainer">
                    {loginRegister}
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