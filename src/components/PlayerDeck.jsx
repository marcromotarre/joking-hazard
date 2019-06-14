import React, { Component } from 'react';
//import { auth } from 'firebase-admin';

class PlayerDeck extends Component {
  selectCard (index) {
    this.props.selectCard(index);
  }

  renderImage(cardId, counter) {
    return (
        <img 
          key={`player-deck-card-${cardId}-${counter}`}
          className="player-deck-card" 
          src={require(`../assets/cards/card-${cardId}.svg`)} 
          alt="player-card"
          onClick={() => this.selectCard(counter)}
        />
    );
  }
  

  render() {
    const {index, hand} = this.props

    return (
      <div className="PlayerDeck">
        <div className="PlayerDeck-title">
          <p className="your-cards">YOUR CARDS</p>
        </div>
        {hand.map((cardId, counter) => {
          return index !== counter ? this.renderImage(cardId, counter) : null

        })}
      </div>
    );
  }
}


export default PlayerDeck;
