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
            currentPageNumber === 3 ? "takeButtonActive" : ""
          }`}
          onClick={() => handleNavigation(3)}
        >
          Take Quiz
        </button>
        
      </div>
    );
  }
}

export default Header;
