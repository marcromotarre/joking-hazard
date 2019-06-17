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

  joinGame = event => {
    event.preventDefault();
    const { searchGameName } = this.state;

    //try to add player into game
    //if can go to creation 

    //if can't show error message
      // does not exist
      // game is full

    /*
    if (displayName) {
      this.userRef.update({ displayName });
    }

    if (this.file) {
      storage
        .ref()
        .child('user-profiles')
        .child(this.uid).child(this.file.name)
        .put(this.file)
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => this.userRef.update({ photoURL }))
    }*/
  };


  changeSearchGameName = event => {
    const { name, value} = event.target;
    this.setState({ [name]: value });
  }

  createNewGame = async () => {
    console.log('create new game');
    const { uid } = auth.currentUser || {};

    const game = {
      name: '',
      creator: uid,
      players: [uid],
      started: false,
    }
    let gameDocRef = await firestore.collection('games').add(game);
    this.props.history.push(`/game_creation/${gameDocRef.id}`)
  }

  render() {
    
    return (
      <div className="Init">
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
