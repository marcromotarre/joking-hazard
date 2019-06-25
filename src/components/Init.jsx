import React, { Component } from 'react';
import { firestore, auth } from '../firebase'
import { collectIdsAndDocs } from '../utilities';


class Init extends Component {

  state = {
    searchGameName: '',
  }

  handleChange = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  get usersRef() {
    return firestore.collection(`users`)
  }

  get pendingGamesRef () {
    return firestore.collection(`pending_games`)
  }

  changeSearchGameName = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  joinGame = async () => {
    const { searchGameName } = this.state;
    const game = collectIdsAndDocs(await this.pendingGamesRef.doc(`${searchGameName}`).get());
    if(game.players.length < 10) {
      const { uid } = auth.currentUser || {};
      if(!game.players.find(player => player.uid === uid)) {
        const user = collectIdsAndDocs( await this.usersRef.doc(`${uid}`).get())
        game.players.push({
          displayName: user.displayName,
          faceId: parseInt(user.faceId),
          uid: uid,
        })
        await this.pendingGamesRef.doc(`${searchGameName}`).set({ ...game })
      }
      this.props.history.push(`/game_creation/${searchGameName}`)
    }
  };

  createNewGame = async () => {
    const { uid } = auth.currentUser || {};
    const userInfo = collectIdsAndDocs(await this.usersRef.doc(`${uid}`).get());
    const game = {
      name: '',
      creator: uid,
      players: [{
        displayName: userInfo.displayName,
        uid: uid,
        faceId: parseInt(userInfo.faceId),
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
        
        <input 
          type="text" 
          value={this.state.searchGameName} 
          name="searchGameName" 
          onChange={this.changeSearchGameName} 
          placeholder="Search Game Name"
        />
        <button onClick={this.joinGame}>join game</button>
        


        <button onClick={this.createNewGame}>Create new game</button>
      </div>
    );
  }
}


export default Init;
