import React, { Component } from 'react';
import './App.css';
import LandingPage from './pages/homepage/landingpage';
import HeaderPublic from './components/header/headerPublic';
import HeaderPrivate from './components/header/headerPrivate';
import { Amplify } from 'aws-amplify';
import config from './config';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      renderPage: <LandingPage handleLoggedIn={() => this.handleLoggedIn()} isLoggedIn={false}/>,
      isLoggedIn: false,
      alertChangePage: false,
    }
  }

  handleLoggedIn = () => {
    console.log("Are we logged in? ", this.state.isLoggedIn)
    this.setState({isLoggedIn: true})
  }

  setAlertChangePageToTrue = () => {
    this.setState({alertChangePage: true})
  }

  handleNavigation = (component) => {
    if (this.alertChangePage) {
      if (window.confirm('Are you sure you want to leave the current page?')) {
        this.setState({renderPage: component})
      } else {
        return;
      }
    } else {
      this.setState({renderPage: component})
    }
  }  

  render() {
    const { renderPage } = this.state;

    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        // identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
      }
    });

    // style={renderPage.type.name=="LandingPage" ? {overflow: "hidden"} : {overflow: "visible"}}
    return (
      <div className="App">
        {this.state.isLoggedIn? <HeaderPrivate currentPage={renderPage} handleNavigation={this.handleNavigation}/> : <HeaderPublic currentPage={renderPage} handleNavigation={this.handleNavigation}/>}
        {renderPage}
      </div>
    );
  }
}

export default App;
