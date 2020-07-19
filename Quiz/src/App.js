import React, { Component } from 'react';

import './App.css';
import LandingPage from './pages/homepage/landingpage';
import Header from './components/header/header';

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
    return (
      <div className="App">
        <Header currentPage={renderPage} handleNavigation={this.handleNavigation}/>
        {renderPage}
      </div>
    );
  }
}

export default App;
