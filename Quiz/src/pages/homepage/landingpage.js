import React, { Component } from 'react';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import './landingpage.css';


class LandingPage extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        const loginRegister = (!this.props.isLoggedIn? 
            <div className="row">
                <div className="boxes"><Login auth={this.props.auth}handleLoggedIn={()=> this.props.handleLoggedIn()}/></div>
                <div className="boxes"><Register /></div>
            </div> :
            <div>
                <br/>
                <div style={{color: "orange"}}>Welcome!  You are now logged in.</div>
            </div>
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