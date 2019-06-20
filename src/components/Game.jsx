import React, { Component } from 'react';

import { firestore, auth  } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

import PlayersInfo from './PlayersInfo'
import GameBoard from './GameBoard'
import PlayerDeck from './PlayerDeck'
import SelectedCard from './SelectedCard'


class Game extends Component {
  
  state = {
    hand: [],
    hasPlayerPlayedCard: false,
    hasPlayerSelectedCard: false,
    hasPlayerValidatedCard: false,
    playerCardIndex: -1,

    deckRandomCardId: -1,
    isPlayerJudge: false,

    hasDeckGaveRandomCard: false,
    judgeCardId: -1,
    hasJudgePlayedCard: false,
    hasAllPlayersPlayedCard: false,
  }

  getCurrentPlayer (players) {
    const { uid } = auth.currentUser || {};
    return players.find( player => {
      return player.uid === uid
    })
  }

  getPlayerById (players, uid) {
    return players.find( player => {
      return player.uid === uid
    })
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
      let player = this.getCurrentPlayer(game.players);
      let judge = this.getPlayerById(game.players, game.players[game.judgeIndex].uid);
      const hand = (player) ? player.hand : [];

      const { uid } = auth.currentUser || {};
      const isPlayerJudge =  game.players[game.judgeIndex].uid === uid;

      this.setState({ 
        hand: hand,
        hasPlayerPlayedCard: player.hasPlayedCard,
        hasPlayerSelectedCard: player.hasSelectedCard,
        hasPlayerValidatedCard: player.hasValidatedCard,
        playerCardIndex: player.cardIndex,

        deckRandomCardId: game.deckCard,
        isPlayerJudge: isPlayerJudge,

        hasDeckGaveRandomCard: game.hasDeckGaveCard,
        judgeCardId: game.judgeCardId,
        hasJudgePlayedCard: judge.hasValidatedCard,
        hasAllPlayersPlayedCard: game.players.filter(player =>  {return player.hasValidatedCard === false}).length === 0,
      })
    })
  }

  getinformationText() {
    const {
      isPlayerJudge,
      hasPlayerPlayedCard,
      hasPlayerSelectedCard,
      hasPlayerValidatedCard,
      hasAllPlayersPlayedCard,

      hasJudgePlayedCard,

    } = this.state

    let displayText = 'this is text to display';
    if(isPlayerJudge) {
      if (!hasPlayerPlayedCard && !hasPlayerValidatedCard){
        displayText = 'Select a card'
      } else if (hasPlayerPlayedCard){
        displayText = 'Validate your card'
      } else if (hasPlayerValidatedCard){
        if(!hasAllPlayersPlayedCard) {
          displayText = 'Wait until players play their cards'
        } else {
          displayText = 'Time to judge!'
        }
      }
    } else {
      if(!hasJudgePlayedCard){
        displayText = 'Wait until judge play a card'
      } else {
        if (!hasPlayerPlayedCard && !hasPlayerValidatedCard){
          displayText = 'Select a card'
        } else if( !hasPlayerValidatedCard) {
          displayText = 'Validate your card'
        } else if (!hasAllPlayersPlayedCard) {
          displayText = 'Wait until other players play their cards'
        } else if(hasPlayerValidatedCard) {
          displayText = 'Wait until judge validate your card'
        }
      }
    }
    return (<p>{displayText}</p>);
  }

  componentWillUnmount = () => {
      this.unsubscribeFromGame = null;
  }

  getCardIdByIndex(hand, index) {
    return index >= 0 ? hand[index] : -1
  }

  getHandCardIdByIndex (index) {
    return index >= 0 ? this.state.hand[index] : -1
  }

  selectCard = async (index) => {
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    currentPlayer.hasSelectedCard = true;
    currentPlayer.cardIndex = index;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  playCard = async () => {
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    currentPlayer.hasSelectedCard = false;
    currentPlayer.hasPlayedCard = true;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  validatePlayerCard = async () => {
    let gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    if(this.state.isPlayerJudge) {
      gameInfo.judgeCardId = currentPlayer.hand[currentPlayer.cardIndex];
      currentPlayer.hand.splice(currentPlayer.cardIndex, 1);
    }
    
    currentPlayer.hasPlayedCard = false;
    currentPlayer.hasValidatedCard = true;
    this.gamesRef.doc(`${this.gameId}`).update({
      judgeCardId: gameInfo.judgeCardId,
      players: gameInfo.players,
    });



  }

  deletePlayerCard = async () => {
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    currentPlayer.hasSelectedCard = false;
    currentPlayer.hasPlayedCard = false;
    currentPlayer.hasValidatedCard = false;
    currentPlayer.cardIndex = -1;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  //you can delete this function and call deletePlayerCard
  deselectCard = async () => {
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    currentPlayer.hasSelectedCard = false;
    currentPlayer.cardIndex = -1;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  render() {
    const {
      hand,
      hasPlayerPlayedCard,
      hasPlayerSelectedCard,
      hasPlayerValidatedCard,
      playerCardIndex,

      deckRandomCardId,
      isPlayerJudge,

      hasDeckGaveRandomCard,
      judgeCardId,
      hasJudgePlayedCard,
      hasAllPlayersPlayedCard,
    } = this.state
    
    return (
      <div>
        <div className="Game">
          <PlayersInfo />
          <div>{this.getinformationText()}</div>
          <GameBoard 
            isPlayerJudge = { isPlayerJudge }
            hasDeckGaveRandomCard = { hasDeckGaveRandomCard }
            hasJudgePlayedCard = { hasJudgePlayedCard }
            hasPlayerPlayedCard = { hasPlayerPlayedCard }
            deckRandomCardId = { deckRandomCardId }
            judgeCardId = { judgeCardId }
            hasPlayerValidatedCard = { hasPlayerValidatedCard }
            playerPlayedCardId = { this.getHandCardIdByIndex(playerCardIndex) }
            
            deletePlayerCard = { () => this.deletePlayerCard() }
            validatePlayerCard = { () => this.validatePlayerCard() }
          />

          <PlayerDeck 
            hand = {hand}
            hasPlayerSelectedCard = { hasPlayerSelectedCard }
            hasPlayerPlayedCard = { hasPlayerPlayedCard }
            playerSelectedCardIndex = { playerCardIndex }
            playerPlayedCardIndex = { playerCardIndex }
            selectCard = { (index) => this.selectCard(index) }
          />
          
        </div>

        <SelectedCard 
          isPlayerJudge = { isPlayerJudge }
          hasPlayerSelectedCard = { hasPlayerSelectedCard }
          cardId = { this.getHandCardIdByIndex(playerCardIndex) }
          hasJudgePlayedCard = { hasJudgePlayedCard }
          deselectCard = { () => this.deselectCard() }
          playCard = { () => this.playCard() }
        />
      </div>
    );
  }
}

export default Game;



