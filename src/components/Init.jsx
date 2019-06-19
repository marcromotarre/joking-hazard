import React, { Component } from 'react';
import { firestore, auth } from '../firebase'


class Init extends Component {

  state = {
    searchGameName: '',
  }

  handleChange = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  get pendingGamesRef () {
    return firestore.collection(`pending_games`)
  }

  changeSearchGameName = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  joinGame = event => {
    event.preventDefault();
    const { searchGameName } = this.state;
    this.pendingGamesRef.doc(`${searchGameName}`).get().then((gameInfo) => {

      if(gameInfo.data().players.length < 10) {
        const { uid } = auth.currentUser || {};
        let game = gameInfo.data()
        
        if(!game.players.find(player => player.uid === uid)) {
          game.players.push({
            faceId: 1,
            uid: uid,
          })
          this.pendingGamesRef.doc(`${searchGameName}`)
          .set({ ...game })
          .then(() => {
            this.props.history.push(`/game_creation/${searchGameName}`)
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
        } else {
          this.props.history.push(`/game_creation/${searchGameName}`)
        }
      }
    })
  };

  createNewGame = async () => {
    const { uid } = auth.currentUser || {};

    const game = {
      name: '',
      creator: uid,
      players: [{
        uid: uid,
        faceId: 1,
      }],
      gameScore: 3,
      started: false,
      link: '',
    }
    let gameDocRef = await this.pendingGamesRef.add(game);
    this.props.history.push(`/game_creation/${gameDocRef.id}`)
  }

  render() {
    console.log(auth.currentUser)
    const { uid } = auth.currentUser || {};
    
    return (
      <div className="Init">
        <p>Hi {uid}</p>
        <form onSubmit={this.joinGame}>
          <input 
            type="text" 
            value={this.state.searchGameName} 
            name="searchGameName" 
            onChange={this.changeSearchGameName} 
            placeholder="Search Game Name"
          />
          <input className="update" type="submit" />
        </form>


        <button onClick={this.createNewGame}>Create new game</button>
      </div>
    );
  }
}


export default Init;
