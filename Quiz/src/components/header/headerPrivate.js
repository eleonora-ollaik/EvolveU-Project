import React, { Component } from "react";
import {Auth} from 'aws-amplify';
import "./header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async handleSignOut() {
    try{
      await Auth.signOut();
      this.props.auth.handleLoggedOut();
      this.props.handleNavigation(1);
    } catch(error){
      console.log('error signing out:', error)
    }
  }

  render() {
    const { currentPageNumber, handleNavigation } = this.props;

    return (
      <div className="appHeader">
        <button className="Q-logo" onClick={() => handleNavigation(1)}>Q</button>
        <button
          className={`tablink ${
            currentPageNumber === 2 ? "createButtonActive" : ""
          }`}
          onClick={() => handleNavigation(2)}
        >
          Create Quiz
        </button>
        <button
          className={`tablink ${
            currentPageNumber === 3 ? "takeButtonActive" : ""
          }`}
          onClick={() => handleNavigation(3)}
        >
          Take Quiz
        </button>
        <button
          className={`tablink ${
            currentPageNumber === 4 ? "qmButtonActive" : ""
          }`}
          onClick={() => handleNavigation(4)}
        >
          Quiz Manager
        </button>
        <div className='logoutTab'>
          <span className="item">Hello, {this.props.auth.user.username}!</span>
          <button onClick={() => this.handleSignOut()} className='logoutBtn item'>Sign out</button>
        </div>

      </div>
    );
  }
}

export default Header;
