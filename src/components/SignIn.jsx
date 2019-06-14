import React, { Component } from 'react';
import SignInSocial from './SignInSocial';

class SignIn extends Component {

  state = { email: '', password: '' };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

  goToSignUp() {
    this.props.setSignIn(false)
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form className="SignIn" onSubmit={this.handleSubmit}>
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <p>Dont' have an account?</p><p onClick={() => this.goToSignUp()}>Register</p>
        </form>
        <SignInSocial />
      </div>

    );
  }
}

export default SignIn;
