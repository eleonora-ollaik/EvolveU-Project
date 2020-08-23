import React, { Component } from 'react';
import './App.css';
import LandingPage from './pages/homepage/landingpage';
import TakeQuiz from "./pages/take-quiz/take-quiz";
import CreateQuizForm from "./pages/createQuizPage/CreateQuizForm";
import QuizManager from "./pages/quizManager/quizManager";
import HeaderPublic from './components/header/headerPublic';
import HeaderPrivate from './components/header/headerPrivate';
import { Amplify } from 'aws-amplify';
import config from './config';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentPageNumber: 1,
      isLoggedIn: false,
      alertChangePage: false,
    }
  }

  handleLoggedIn = () => {
    this.setState({isLoggedIn: true})
    console.log("Are we logged in? ", this.state.isLoggedIn)
  }

  setAlertChangePageToTrue = () => {
    this.setState({alertChangePage: true})
  }

  handleNavigation = (component) => {
    if (this.alertChangePage) {
      if (window.confirm('Are you sure you want to leave the current page?')) {
        this.setState({currentPageNumber: component})
      } else {
        return;
      }
    } else {
      this.setState({currentPageNumber: component})
    }
  }  
  
  render() {
    let renderPage;
    if (this.state.currentPageNumber === 1) { renderPage = <LandingPage handleLoggedIn={() => this.handleLoggedIn()} isLoggedIn={this.state.isLoggedIn}/>} 
    else if (this.state.currentPageNumber === 2) { renderPage = <CreateQuizForm />} 
    else if (this.state.currentPageNumber === 3) { renderPage = <TakeQuiz />} 
    else if (this.state.currentPageNumber === 4) { renderPage = <QuizManager />} 
    
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        // identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
      }
    });

    return (
      <div className="App">
        {this.state.isLoggedIn? <HeaderPrivate currentPageNumber={this.state.currentPageNumber} handleNavigation={this.handleNavigation}/> : <HeaderPublic currentPageNumber={this.state.currentPageNumber} handleNavigation={this.handleNavigation}/>}
        {renderPage}
      </div>
    );
  }
}

export default App;
