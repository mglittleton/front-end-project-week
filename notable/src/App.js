import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import SingleNote from "./components/SingleNote";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { checkAuth, signout } from "./actions/index";
import { SideBar, Button, MainDiv, DisplayDiv } from "./css/styles";

class App extends Component {
  sendToForm = () => {
    this.props.history.push(`/form`);
  };

  sendToHome = () => {
    this.props.history.push(`/`);
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    this.props.checkAuth(reqOptions);
  }

  logout = e => {
    this.props.signout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        {this.props.signedOut ? (
          <div>
            <Route exact path="/" render={props => <SignIn {...props} />} />
            <Route
              exact
              path="/signup"
              render={props => <SignUp {...props} />}
            />
          </div>
        ) : (
          <MainDiv>
            <SideBar>
              <h1>Notable</h1>
              <Button onClick={this.sendToHome}>View Your Notes</Button>
              <Button onClick={this.sendToForm}>+ Create a New Note</Button>
              <Button onClick={this.logout}>Logout</Button>
            </SideBar>
            <DisplayDiv>
              <Route exact path="/" render={props => <NoteList {...props} />} />
              <Route
                path="/form"
                render={props => (
                  <NoteForm
                    {...props}
                    purpose="Create New Note:"
                    buttonText="Save"
                  />
                )}
              />
              <Route
                path="/note/:id"
                render={props => <SingleNote {...props} />}
              />
              <Route
                path="/update/:id"
                render={props => (
                  <NoteForm
                    {...props}
                    purpose="Edit Note:"
                    buttonText="Update"
                  />
                )}
              />
            </DisplayDiv>
          </MainDiv>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signedOut: state.signedOut
  };
};

export default connect(
  mapStateToProps,
  { checkAuth, signout }
)(App);
