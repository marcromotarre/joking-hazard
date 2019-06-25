import React, { Component } from 'react';
import { firestore, auth  } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

class GameCreation extends Component {

  state = { 
    game: null,
    creatorName: '',
    gameLink: '',
    started: false,
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
    return firestore.collection(`users`)
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
      
      this.setState({ game })
      if(game && game.started) {
        this.props.history.push(`/game/${game.link}`)
      }
    })
  }

  componentWillUnmount = () => {
      this.unsubscribeFromGame = null;
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
      const numberOfCards = 36;
      let game = {
        name: '',
        creator: pendingGame.creator,
        players: pendingGame.players,
        gameScore: pendingGame.gameScore,
        plays: [],
        deck: Array.from(Array(numberOfCards), (x, index) => index+1).sort(() => Math.random() - 0.5),
        hasDeckGaveCard: false,
        deckCard: -1,
        judgeIndex: 0,
        judgePlayedCardId: -1,
        playersCards : []
      }

      //game.players.sort(() => Math.random() - 0.5)

      game.players.forEach(player => { 
        player.hand = Array.from(Array(7), ((x) => {
          const deckFirstCard = game.deck[0];
          game.deck.shift();
          return deckFirstCard;
        }))
        //get player name and face id
        player.score = 0;
        player.hasSelectedCard = false;
        player.hasPlayedCard = false;
        player.hasValidatedCard = false;
        player.selectedCardIndex = -1;
        player.playedCardIndex = -1;
      });

      game.hasDeckGaveCard = true;
      game.deckCard = game.deck[0];
      game.deck.shift();

      const gameDocRef = await this.gamesRef.add(game);
      pendingGame.started = true;
      pendingGame.link = gameDocRef.id;

      this.pendingGamesRef
        .doc(`${this.gameId}`)
        .set({ ...pendingGame })
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
