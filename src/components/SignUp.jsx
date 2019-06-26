import React, { Component } from "react";
//import { auth } from 'firebase-admin';

class SignUp extends Component {
  goToSignIn() {
    this.props.setSignIn(true);
  }

  render() {
    return (
      <form className="SignIn">
        <h2>Sign Up</h2>
        <p>Already have an account?</p>
        <p onClick={() => this.goToSignIn()}>Sign In</p>
      </form>
    );
  }
}

export default SignUp;
