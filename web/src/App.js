import React, { Component } from "react";
import "./App.css";
var uuid = require("uuid");
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDRwn1-vTbhz5wGsgLG6V9kkXgUZE_BvUM",
  authDomain: "simplesurvey-thq.firebaseapp.com",
  databaseURL: "https://simplesurvey-thq.firebaseio.com",
  projectId: "simplesurvey-thq",
  storageBucket: "simplesurvey-thq.appspot.com",
  messagingSenderId: "724223038643"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v1(),
      name: "",
      answers: {
        q1: "",
        q2: "",
        q3: "",
        q4: ""
      },
      submitted: false
    };

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
  }

  handleNameSubmit(event) {
    var name = this.refs.name.value;
    this.setState(
      {
        name: name
      },
      function() {
        console.log(this.state);
      }
    );
    event.preventDefault();
  }

  handleQuestionSubmit(event) {
    firebase
      .database()
      .ref("surveys/" + this.state.id)
      .set({
        name: this.state.name,
        answers: this.state.answers
      });

    this.setState({ submitted: true }, function() {
      console.log("question Submitting..");
    });
    event.preventDefault();
  }

  handleQuestionChange(event) {
    var answers = this.state.answers;
    if (event.target.name === "q1") {
      answers.q1 = event.target.value;
    } else if (event.target.name === "q2") {
      answers.q2 = event.target.value;
    } else if (event.target.name === "q3") {
      answers.q3 = event.target.value;
    }
    this.setState({ answers: answers }, function() {
      console.log(this.state);
    });
  }

  render() {
    var user;
    var questions;
    if (this.state.name && this.state.submitted === false) {
      user = <h2>Welcome {this.state.name}</h2>;

      questions = (
        <span>
          <h3>Survey Questions</h3>
          <form onSubmit={this.handleQuestionSubmit.bind(this)}>
            {/* first question */}
            <div>
              <label>what is your favorite operating system?</label> <br />
              <input
                type="radio"
                name="q1"
                value="Windows"
                onChange={this.handleQuestionChange}
              />Windows <br />
              <input
                type="radio"
                name="q1"
                value="OSX"
                onChange={this.handleQuestionChange}
              />OSX <br />
              <input
                type="radio"
                name="q1"
                value="Linux"
                onChange={this.handleQuestionChange}
              />Linux <br />
              <input
                type="radio"
                name="q1"
                value="Solaris"
                onChange={this.handleQuestionChange}
              />Solaris <br />
              <input
                type="radio"
                name="q1"
                value="Oher"
                onChange={this.handleQuestionChange}
              />Other <br />
            </div>

            {/* second question */}
            <div>
              <label>what is your favorite brand smartphone?</label> <br />
              <input
                type="radio"
                name="q2"
                value="Samsung"
                onChange={this.handleQuestionChange}
              />Samsung <br />
              <input
                type="radio"
                name="q2"
                value="Sony"
                onChange={this.handleQuestionChange}
              />Sony <br />
              <input
                type="radio"
                name="q2"
                value="Apple"
                onChange={this.handleQuestionChange}
              />Apple <br />
              <input
                type="radio"
                name="q2"
                value="Xiaomi"
                onChange={this.handleQuestionChange}
              />Xiaomi <br />
              <input
                type="radio"
                name="q2"
                value="Oppo"
                onChange={this.handleQuestionChange}
              />Oppo <br />
            </div>

            {/* Third question */}
            <div>
              <label>what is your favorite CPU?</label> <br />
              <input
                type="radio"
                name="q3"
                value="AMD"
                onChange={this.handleQuestionChange}
              />AMD <br />
              <input
                type="radio"
                name="q3"
                value="Intel"
                onChange={this.handleQuestionChange}
              />Intel <br />
              <input
                type="radio"
                name="q3"
                value="Nvidia"
                onChange={this.handleQuestionChange}
              />Nvidia <br />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </span>
      );
    } else if (!this.state.name && this.state.submitted === false) {
      user = (
        <span>
          <h2>Please enter your name to begin the survey</h2>
          <form onSubmit={this.handleNameSubmit.bind(this)}>
            <input type="text" placeholder="Enter Name..." ref="name" />
          </form>
        </span>
      );
      questions = "";
    } else if (this.state.submitted === true) {
      user = <h2>Thank You {this.state.name}</h2>;
    }

    return (
      <div className="App">
        <div className="App-header text-center">
          <h1 className="App-title">Simple Survey</h1>
        </div>
        <div className="text-center">{user}</div>
        <div className="container">{questions}</div>
      </div>
    );
  }
}

export default App;
