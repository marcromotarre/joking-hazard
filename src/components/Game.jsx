import React, { Component } from 'react';

import { firestore, auth  } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

import PlayersInfo from './PlayersInfo'
import GameBoard from './GameBoard'
import PlayerDeck from './PlayerDeck'
import SelectedCard from './SelectedCard'


class Game extends Component {
  
  state = {
    deckRandomCardId: -1,
    judgePlayedCardId: -1,

    playerSelectedCardIndex: -1,
    playerPlayedCardIndex: -1,

    isPlayerJudge: false,

    hasDeckGaveRandomCard: false,
    hasJudgeSelectedCard: false,
    hasJudgePlayedCard: false,
    hasPlayerSelectedCard: false,
    hasPlayerPlayedCard: false,
    hasPlayerValidatedPlayedCard: false,

    hand: [],
    deck: [],
  }

  get gameId() {
    return this.props.match.params.id;
  }
  get gamesRef () {
    return firestore.collection(`games`)
  }
  unsubscribeFromGame = null;


  componentDidMount = async () => {
    this.unsubscribeFromGame = await this.gamesRef.doc(`${this.gameId}`).onSnapshot( snapshot => {
      let game = collectIdsAndDocs(snapshot)
      const { uid } = auth.currentUser || {};
      const player = game.players.find( player => {
        return player.uid === uid
      })
      const hand = (player) ? player.hand : [];
      
      const isPlayerJudge =  game.players[game.judgeIndex].uid === uid;


      this.setState({ 
        hand: hand,
        hasDeckGaveRandomCard: game.hasDeckGaveCard,
        deckRandomCardId: game.deckCard,

        hasJudgeSelectedCard: game.hasJudgeSelectedCard,
        hasJudgePlayedCard: game.hasJudgePlayCard,
        judgePlayedCardId: -1,
        judgeIndex: 0,
        isPlayerJudge: isPlayerJudge,
        deck: game,

      })
    })
  }

  getinformationText() {
    const {
      isPlayerJudge,
      hasJudgeSelectedCard,
      hasJudgePlayedCard,
      hasPlayerSelectedCard,
      hasPlayerPlayedCard
    } = this.state

    let displayText = 'this is text to display';
    if(isPlayerJudge) {
      if (!hasJudgeSelectedCard && !hasJudgePlayedCard){
        displayText = 'Select a card'
      }
      if (hasJudgeSelectedCard && !hasJudgePlayedCard){
        displayText = 'Validate your card'
      }
      if (hasJudgePlayedCard){}
    } else {
      if(!hasJudgePlayedCard){
        displayText = 'Wait until judge play a card'
      } else {
        if(!hasPlayerSelectedCard && !hasPlayerPlayedCard) {
          displayText = 'Select a card'
        }
        if(!hasPlayerSelectedCard && hasPlayerPlayedCard) {
          displayText = 'Validate your card'
        }
      }
    }
    return (<p>{displayText}</p>);
  }

  componentWillUnmount = () => {
      this.unsubscribeFromGame = null;
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
          <div>{this.getinformationText()}</div>
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



