import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      answers: {
        q1: "",
        q2: "",
        q3: "",
        q4: ""
      },
      submitted: false
    };
  }
  render() {
    var user;
    var questions;
    if (this.state.name && this.state.submitted === false) {
    } else if (!this.state.name && this.state.submitted === false) {
      user = (
        <span>
          <h2>Please enter your name to begin the survey</h2>
          <form>
            <input type="text" placeholder="Enter Name..." ref="name" />
          </form>
        </span>
      );
      questions = "";
    } else if (this.state.submitted === true) {
    }

    return (
      <div className="App text-center">
        <div className="App-header">
          <h1 className="App-title">Simple Survey</h1>
        </div>
        <div class="text-center">{user}</div>
      </div>
    );
  }
}

export default App;
