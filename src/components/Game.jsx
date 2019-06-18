import React, { Component } from 'react';

import PlayersInfo from './PlayersInfo'
import GameBoard from './GameBoard'
import PlayerDeck from './PlayerDeck'
import SelectedCard from './SelectedCard'


class Game extends Component {
  
  state = {
    deckRandomCardId: 9,
    judgePlayedCardId: 8,

    playerSelectedCardIndex: -1,
    playerPlayedCardIndex: 4,

    hasDeckGaveRandomCard: true,
    hasJudgePlayedCard: true,
    hasPlayerSelectedCard: false,
    hasPlayerPlayedCard: true,
    hasPlayerValidatedPlayedCard: false,

    hand: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
    ],
  }

  getHandCardIdByIndex (index) {
    return index >= 0 ? this.state.hand[index] : -1
  }


  playerPlayCard () {
    const playerPlayedCardIndex = this.state.playerSelectedCardIndex;
    this.setState({
      playerPlayedCardIndex,
      playerSelectedCardIndex: -1,
      hasPlayerSelectedCard: false,
      hasPlayerPlayedCard: true,
    })
  }

  selectCard (index) {
    this.setState({
      hasPlayerSelectedCard: true,
      playerSelectedCardIndex: index,
    })
  }

  deselectCard () {
    this.setState({
      playerSelectedCardIndex: -1,
      hasPlayerSelectedCard: false,
    })
  }

  validatePlayerCard () {
    this.setState({
      hasPlayerValidatedPlayedCard: true,
    })
  }

  deletePlayerCard () {
    this.setState({
      playerPlayedCardIndex: -1,
      hasPlayerPlayedCard: false,
      hasPlayerValidatedPlayedCard: false,
    })
  }

  render() {
    const {
      hasDeckGaveRandomCard,
      hasJudgePlayedCard, 
      hasPlayerPlayedCard,
      hasPlayerValidatedPlayedCard,
      deckRandomCardId, 
      judgePlayedCardId,
      playerPlayedCardIndex,

      hand,
      hasPlayerSelectedCard,
      playerSelectedCardIndex,
    } = this.state
    return (
      <div>
        <div className="Game">
          <PlayersInfo />
          <GameBoard 
            hasDeckGaveRandomCard = {hasDeckGaveRandomCard}
            hasJudgePlayedCard = {hasJudgePlayedCard}
            hasPlayerPlayedCard = {hasPlayerPlayedCard}
            deckRandomCardId = {deckRandomCardId}
            judgePlayedCardId = {judgePlayedCardId}
            hasPlayerValidatedPlayedCard = {hasPlayerValidatedPlayedCard}
            playerPlayedCardId = {this.getHandCardIdByIndex(playerPlayedCardIndex)}
            
            deletePlayerCard = { () => this.deletePlayerCard() }
            validatePlayerCard = { () => this.validatePlayerCard() }
          />

          <PlayerDeck 
            hand = {hand}
            hasPlayerSelectedCard = {hasPlayerSelectedCard}
            hasPlayerPlayedCard = {hasPlayerPlayedCard}
            playerSelectedCardIndex = {playerSelectedCardIndex}
            playerPlayedCardIndex = {playerPlayedCardIndex}
            selectCard = { (index) => this.selectCard(index) }
          />
          
        </div>

        <SelectedCard 
          hasPlayerSelectedCard={hasPlayerSelectedCard}
          playerSelectedCardId = {this.getHandCardIdByIndex(playerSelectedCardIndex)}

          deselectCard = { () => this.deselectCard() }
          playCard = { () => this.playerPlayCard() }
        />
      </div>
    );
  }
}

export default Game;



