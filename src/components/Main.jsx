import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom'

import Init from './Init'
import GameCreation from './GameCreation'
import Game from './Game'
import UserInfo from './UserInfo'
import NewGame from './NewGame'



class Main extends Component {
  render() {
    return (
      <div className="Application">
        <Switch>
          <Route exact path="/" component={Init} />
          <Route exact path="/user" component={UserInfo} />
          <Route exact path="/game_creation/:id" component={GameCreation} />
          <Route exact path="/game/:id" component={Game} />
          <Route exact path="/new_game/:id" component={NewGame} />
        </Switch>
      </div>
    );
  }
}

export default Main;
