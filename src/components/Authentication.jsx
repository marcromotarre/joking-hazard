import React, { Component } from 'react';

import SignInSocial from './SignInSocial'
import mainLogo from '../assets/title.png';
import introImage from '../assets/cards/card-drag-here.svg';

class Authentication extends Component {
  state = { 
    signIn: true,
  };

  setSignIn (signIn) {
    this.setState({ signIn })
  }

  render () {
    return (
      <div className="Authentication">
        <div className="logo">
          <img src={mainLogo} alt="Logo" />
        </div>
        <SignInSocial />
        <div className="intro-img">
          <img src={introImage} alt="intro-img" />
        </div>
      </div>
    )
  }
};

export default Authentication;
