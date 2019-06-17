import React, { Component } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

class GameCreation extends Component {

  state = { 
    game: null,
    creatorName: '',
  };

  get gameId() {
    return this.props.match.params.id;
  }

  get creatorRef() {
    return firestore.doc(`users/${this.state.game.creator}`)
  }

  get gameRef() {
    return firestore.doc(`games/${this.gameId}`)
  }

  showPlayer (player) {
    return (
      <div>
        <p>    - {player}</p>
      </div>
    )
  }

  startGame () {
    if(this.state.players.length > 2) {

    }
  }

  unsubscribeFromGame = null;
  unsubscribeFromCreator = null;

  componentDidMount = async () => {
    this.unsubscribeFromGame = await this.gameRef.onSnapshot( snapshot => {
      const game = collectIdsAndDocs(snapshot);
      this.setState({ game })
      
      this.unsubscribeFromCreator = this.creatorRef.onSnapshot( snapshot => {
        const creator = collectIdsAndDocs(snapshot);
        this.setState({ creatorName: creator.displayName })
      })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromGame();
    this.unsubscribeFromCreator();
  }
  
  render() {
    return (
      <div className="GameCreation">
        {this.state.game &&
          <div>
            <div className="game-name">
            </div>
            <div className="creator-info">
              <p>created by</p><p>{this.state.creatorName}</p>
            </div>
            <div>
              <p>Players List: </p>
              {this.state.game.players.map((playerId) => {
                return this.showPlayer(playerId) 
              })}
            </div>
            {this.state.game.players.length > 2 &&
              <button onClick={this.startGame}>Start</button>
            }
          </div>

        }
      </div>

    );
  }
}


export default GameCreation;
