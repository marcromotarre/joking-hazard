import React, { Component } from 'react';
//import { auth } from 'firebase-admin';

class GameBoard extends Component {
  
  deletePlayerCard () {
    this.props.deletePlayerCard();
  }
  
  validatePlayerCard () {
    this.props.validatePlayerCard();
  }

  renderImage(cardId, counter) {
    return (
        <img 
          key={`board-card-${cardId}-${counter}`}
          className="board-card selected-board-card" 
          src={require(`../assets/cards/card-${cardId}.svg`)} 
          alt="player-card" 
        />
    );
  }

  validateIcons() {
    const {
      hasPlayerValidatedPlayedCard,
      hasPlayerPlayedCard,
    } = this.props

    const deleteIconClass = hasPlayerValidatedPlayedCard ? 
      'delete-player-played-card_validated':
      'delete-player-played-card'

    return (
      <div>
        { hasPlayerPlayedCard &&
        <div>
          <img 
            key={`delete-played-card`}
            className={`${deleteIconClass}`}
            src={require(`../assets/delete-icon.svg`)} 
            alt="delete-player-played-card"
            onClick={() => this.deletePlayerCard()}
          />
          { !hasPlayerValidatedPlayedCard  &&
            <img 
              key={`validate-played-card`}
              className="validate-player-played-card" 
              src={require(`../assets/accept-icon.svg`)} 
              alt="validate-player-played-card"
              onClick={() => this.validatePlayerCard()}
            />
          }
          </div>
        }
      </div>

    )
  }

  getFirstCard () {
    return this.props.hasDeckGaveRandomCard ? this.props.deckRandomCardId : 0;
  }

  getSecondCard () {
    if(this.props.isPlayerJudge) {
      return this.props.hasPlayerPlayedCard ? this.props.playerPlayedCardId : 0;
    } else {
      return this.props.hasJudgePlayedCard ? this.props.judgePlayedCardId : 0;
    }
  }

  getThirCard () {
    if(this.props.isPlayerJudge) {
    return 0;
    } else {
      return this.props.hasPlayerPlayedCard ? this.props.playerPlayedCardId : 0;
    }

  }

  render() {
    const gameBoardCards = [
      this.getFirstCard (),
      this.getSecondCard (),
      this.getThirCard (),
    ]
    return (
      <div className="GameBoard">
        {gameBoardCards.map((cardId, counter) => 
          this.renderImage(cardId, counter)
        )}

        {this.validateIcons()}
        
      </div>
    );
  }
}


export default GameBoard;
