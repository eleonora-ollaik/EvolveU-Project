import React, { Component } from 'react';

import './App.css';
import LandingPage from './pages/homepage/landingpage';
import Header from './components/header/header';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      renderPage: <LandingPage />
    }
  }

  handleNavigation = (component) => {
    this.setState({renderPage: component})
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
