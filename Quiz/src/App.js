import React, { Component } from 'react';
import './App.css';
import LandingPage from './pages/homepage/landingpage';
import Header from './components/header/header';
import { Amplify } from 'aws-amplify';
import config from './config';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      renderPage: <LandingPage />,
      alertChangePage: false,
    }
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
        <Header currentPage={renderPage} handleNavigation={this.handleNavigation}/>
        {renderPage}
      </div>
    );
  }
}

export default App;
