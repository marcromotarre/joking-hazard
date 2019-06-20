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
    hasPlayerValidatedPlayedCard: false,
    playerCardIndex: -1,

    deckRandomCardId: -1,
    isPlayerJudge: false,

    hasDeckGaveRandomCard: false,
    judgePlayedCardId: -1,
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
        hasPlayerValidatedPlayedCard: player.hasValidatedCard,
        playerCardIndex: player.cardIndex,

        deckRandomCardId: game.deckCard,
        isPlayerJudge: isPlayerJudge,

        hasDeckGaveRandomCard: game.hasDeckGaveCard,
        judgePlayedCardId: this.getCardIdByIndex(judge.hand, judge.cardIndex),
        hasJudgePlayedCard: judge.hasValidatedCard,
        hasAllPlayersPlayedCard: game.players.filter(player =>  {return player.hasValidatedCard === false}),
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
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    let currentPlayer = this.getCurrentPlayer(gameInfo.players);
    currentPlayer.hasPlayedCard = false;
    currentPlayer.hasValidatedCard = true;

    //should remove card from hand and add it to the board

    this.gamesRef.doc(`${this.gameId}`).update({
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
    currentPlayer.hasPlayedCard = false;
    currentPlayer.hasValidatedCard = false;
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
      hasPlayerValidatedPlayedCard,
      playerCardIndex,

      deckRandomCardId,
      isPlayerJudge,

      hasDeckGaveRandomCard,
      judgePlayedCardId,
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
            judgePlayedCardId = { judgePlayedCardId }
            hasPlayerValidatedPlayedCard = { hasPlayerValidatedPlayedCard }
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
          playerSelectedCardId = { this.getHandCardIdByIndex(playerCardIndex) }
          hasJudgeValidatedPlayedCard = { this.state.hasJudgeValidatedPlayedCard }
          deselectCard = { () => this.deselectCard() }
          playCard = { () => this.playCard() }
        />
      </div>
    );
  }
}

export default Game;



