import React, { Component } from "react";
import "./header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        <div
          className='logoutTab'
        >
          <span>Hello, {this.props.auth.user.username}!</span>
         
          <button className='logoutBtn'>Sign out</button>
        </div>

      </div>
    );
  }
}

export default Header;
