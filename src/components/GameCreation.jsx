import React, { Component } from 'react';
import { firestore, auth  } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

class GameCreation extends Component {

  state = { 
    game: null,
    creatorName: '',
  };

  get gameId() {
    return this.props.match.params.id;
  }

  get pendingGamesRef () {
    return firestore.collection(`pending_games`)
  }

  get gamesRef () {
    return firestore.collection(`games`)
  }



  get usersRef() {
    return firestore.doc(`users/`)
  }

  get creatorRef() {
    return firestore.doc(`users/${this.state.game.creator}`)
  }

  get gameRef() {
    return firestore.doc(`games/${this.gameId}`)
  }
  
  unsubscribeFromGame = null;

  componentDidMount = async () => {
    this.unsubscribeFromGame = await this.pendingGamesRef.doc(`${this.gameId}`).onSnapshot( snapshot => {
      let game = collectIdsAndDocs(snapshot)
      console.log(game)
      this.setState({ game })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromGame();
  }

  addPlayer () {
  }

  showPlayer (player) {
    return (
      <div
        key={`player-info-${player.uid}`}
      >
        <p> - {player.uid} </p>
      </div>
    )
  }

  startGame = async event => {

    if(this.state.game.players.length > 2) {

      //create new document
      let pendingGame = {...this.state.game}

      const game = {
        name: '',
        creator: pendingGame.creator,
        players: [],
        gameScore: pendingGame.gameScore,
        plays: []
      }

      await this.gamesRef.add(game);
      pendingGame.started = true;

      this.pendingGamesRef
        .doc(`${this.gameId}`)
        .set({ ...pendingGame })
        .then(() => {
            this.setState({ game: pendingGame })
        })
    }
  }

  render() {
    /*
     <div>
        <p>Select Game Score</p>
        <div>
          <input type="radio" id="GameScore1" name="GameScore1" value="1"/>
          <label for="GameScore1">1</label>
        </div>
        <div>
          <input type="radio" id="GameScore3" name="GameScore3" value="3"/>
          <label for="GameScore3">3</label>
        </div>
        <div>
          <input type="radio" id="GameScore5" name="GameScore5" value="5"/>
          <label for="GameScore5">5</label>
        </div>
        <div>
          <input type="radio" id="GameScore10" name="GameScore10" value="5"/>
          <label for="GameScore10">10</label>
        </div>
      </div>
    */
  
   const { uid } = auth.currentUser || {};
    if(this.state.game &&  this.state.game.started) {
      this.props.history.push(`/new_game/blabla`)
    }
    return (

      <div className="GameCreation">
        <p>Hi {uid}</p>
        {this.state.game &&
          <div>
            <div className="game-name">
            <p>game id: {this.gameId}</p>
            </div>
            <div className="creator-info">
              <p>created by</p><p>{this.state.game.creator}</p>
            </div>
              <p>Players List: </p>
              {this.state.game && this.state.game.players.map((playerId) => {
                return this.showPlayer(playerId) 
              })}
            {this.state.game && this.state.game.creator === uid && this.state.game.players.length > 2 &&
              <button onClick={this.startGame}>Start</button>
            }
          </div>

        }
      </div>
    );
  }
}


export default GameCreation;
