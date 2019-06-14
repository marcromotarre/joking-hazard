import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom'

import Game from './Game'
import UserInfo from './UserInfo'



class Main extends Component {
  render() {
    return (
      <div className="Application">
        <Switch>
          <Route exact path="/user" component={UserInfo} />
          <Route exact path="/game/:id" component={Game} />
        </Switch>
      </div>
    );
  }
}

export default Main;
