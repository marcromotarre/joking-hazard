import React, { Component } from 'react';

import PlayersInfo from './PlayersInfo'
import GameBoard from './GameBoard'
import PlayerDeck from './PlayerDeck'
import SelectedCard from './SelectedCard'


class Game extends Component {

  state = {
    cardId: null,
    index: null,
    hand: [
      1,
      2,
      3,
      4,
      5,
      1,
      2,
    ],
  }

  selectCard (index) {
    const cardId = this.state.hand[index]
    this.setState({
      cardId,
      index
    })
  }

  deselectCard () {
    this.setState({
      cardId: null,
      index: null
    })
  }

  render() {
    const {cardId, index, hand} = this.state
    return (
      <div>
        <div className="Game">
          <PlayersInfo />
          <GameBoard />
          <PlayerDeck 
            cardId={cardId} 
            index={index} 
            hand={hand}
            selectCard = {(index) => this.selectCard(index) }
          />
        </div>
        <SelectedCard />
      </div>
    );
  }
}

export default Game;



