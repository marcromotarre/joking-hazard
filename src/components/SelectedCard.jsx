import React, { Component } from 'react';


class SelectedCard extends Component {
  state = {
    cardId: 1
  }
  
  render() {
    const cardId = this.state.cardId
    return (
      <div>
        { cardId && 
          <div className="SelectedCard">
            <img 
                key={`selected-card-${this.state.cardId}`}
                className="player-deck-card" 
                src={require(`../assets/cards/card-${this.state.cardId}.svg`)} 
                alt="player-card"
              />
          </div>

        }
      </div>
    );
  }
}

export default SelectedCard;



