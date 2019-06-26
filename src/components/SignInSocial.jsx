import React, { Component } from "react";
import { signInWithGoogle } from "../firebase";

import googleIcon from "../assets/google-icon.svg";
import facebookIcon from "../assets/facebook-icon.svg";
import twitterIcon from "../assets/twitter-icon.svg";

class SignInSocial extends Component {
  render() {
    return (
      <div className="SignInSocial">
        <img
          className="login-icon"
          src={googleIcon}
          onClick={signInWithGoogle}
          alt="signIn-google"
        />
        <img className="login-icon" src={facebookIcon} alt="signIn-facebook" />
        <img className="login-icon" src={twitterIcon} alt="signIn-twitter" />
      </div>
    );
  }
}

export default SignInSocial;
