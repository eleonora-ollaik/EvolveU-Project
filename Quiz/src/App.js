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
import net from "./business/netcomm";



class App extends Component {
  constructor(){
    super()

    this.state = {
      currentPageNumber: 1,
      isLoggedIn: false,
      user: null,
      alertChangePage: false,
      qaCategoryList: null,
      qaDefaultCategory: null

    }
    this.getQACategoryList = this.getQACategoryList.bind(this)
  }

  handleLoggedIn = () => {
    this.setState({isLoggedIn: true})
    // console.log("Are we logged in? ", this.state.isLoggedIn)
  }
  handleLoggedOut = () => {
    this.setState({isLoggedIn:false})
  }

  setUser = user => {
    this.setState({user: user})
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

  async getQACategoryList () {

    const url = "https://0y0lbvfarc.execute-api.ca-central-1.amazonaws.com/dev/questioncategory";
    let responsedata = await net.getData(url);

    // Convert into dictionary format for generating drop down list by other components (create-quiz)
    const list = responsedata["payload"];
    let defaultCategory = list[0]["questioncategory_id"];
    let listdata = [];
    for (let i=0; i<list.length; i++) {

      listdata.push(<option value={list[i]["questioncategory_id"]} key={i}>{list[i]["questioncategory_name"]}</option>);    
    }    
    this.setState({ qaCategoryList: listdata, qaDefaultCategory: defaultCategory});    
  }
  
  
  render() {
    let authProps = {
      isLoggedIn: this.state.isLoggedIn,
      user: this.state.user,
      handleLoggedIn: this.handleLoggedIn,
      handleLoggedOut: this.handleLoggedOut,
      setUser: this.setUser
    }
    console.log('this is user:', this.state.user)

    let renderPage;
    if (this.state.currentPageNumber === 1) { renderPage = <LandingPage auth={authProps} handleLoggedIn={() => this.handleLoggedIn()} isLoggedIn={this.state.isLoggedIn}/>} 
    else if (this.state.currentPageNumber === 2) { renderPage = <CreateQuizForm auth ={authProps} getQACategoryList={this.getQACategoryList} qaCategoryList={this.state.qaCategoryList} qaDefaultCategory={this.state.qaDefaultCategory}/>} 
    else if (this.state.currentPageNumber === 3) { renderPage = <TakeQuiz />} 
    else if (this.state.currentPageNumber === 4) { renderPage = <QuizManager auth ={authProps} getQACategoryList={this.getQACategoryList} qaCategoryList={this.state.qaCategoryList} qaDefaultCategory={this.state.qaDefaultCategory}/>} 
    
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
        {this.state.isLoggedIn? <HeaderPrivate auth={authProps} currentPageNumber={this.state.currentPageNumber} handleNavigation={this.handleNavigation}/> : <HeaderPublic currentPageNumber={this.state.currentPageNumber} handleNavigation={this.handleNavigation}/>}
        {renderPage}
      </div>
    );
  }
}

export default App;
