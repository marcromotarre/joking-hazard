import React, { Component } from 'react';
//import { auth } from 'firebase-admin';

class PlayerDeck extends Component {
  state = {
    selected: false,
    cardsIds: [
      1,
      2,
      'drag-here',
    ],
  }

  renderImage(cardId, counter) {
    return (
        <img 
          key={`board-card-${cardId}-${counter}`}
          className="board-card" 
          src={require(`../assets/cards/card-${cardId}.svg`)} 
          alt="player-card" 
        />
    );
  }
  

  render() {
    return (
      <div className="GameBoard">
        {this.state.cardsIds.map((cardId, counter) => 
          this.renderImage(cardId, counter)
        )}
      </div>
    );
  }
}


export default PlayerDeck;
