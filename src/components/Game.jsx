import React, { Component } from 'react';

import { firestore, auth } from '../firebase';
import { collectIdsAndDocs, getPlayerById } from '../utilities';

import PlayersInfo from './PlayersInfo'
import GameBoard from './GameBoard'
import PlayerDeck from './PlayerDeck'
import SelectedCard from './SelectedCard'
import GameTextInformation from './GameTextInformation';

class Game extends Component {
  state = {
    players: [],
    hand: [],
    hasPlayerPlayedCard: false,
    hasPlayerSelectedCard: false,
    hasPlayerValidatedCard: false,
    playerCardIndex: -1,

    deckRandomCardId: -1,
    isPlayerJudge: false,

    judgeId: '',

    hasDeckGaveRandomCard: false,
    judgeCardId: -1,
    hasJudgePlayedCard: false,
    hasAllPlayersPlayedCard: false,
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
      let game = collectIdsAndDocs(snapshot);
      const { uid } = auth.currentUser ? auth.currentUser : {};
      let player = getPlayerById(game.players, uid);
      let judge = getPlayerById(game.players, game.players[game.judgeIndex].uid);
      const hand = (player) ? player.hand : [];

      const judgeId = game.players[game.judgeIndex].uid;
      const hasAllPlayersPlayedCard = game.players.filter(player =>  {return player.hasValidatedCard === false}).length === 0
      this.setState({ 
        players: game.players,
        hand: hand,
        hasPlayerPlayedCard: player.hasPlayedCard,
        hasPlayerSelectedCard: player.hasSelectedCard,
        hasPlayerValidatedCard: player.hasValidatedCard,
        playerSelectedCardIndex: player.selectedCardIndex,
        playerPlayedCardIndex: player.playedCardIndex,

        deckRandomCardId: game.deckCard,

        judgeId: judgeId,
        isPlayerJudge: judgeId === uid,

        hasDeckGaveRandomCard: game.hasDeckGaveCard,
        judgeCardId: game.judgeCardId,
        hasJudgePlayedCard: judge.hasValidatedCard,
        hasAllPlayersPlayedCard: hasAllPlayersPlayedCard,
      })
    })
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
    
    const { uid } = auth.currentUser ? auth.currentUser : {};
    let currentPlayer = getPlayerById(gameInfo.players, uid);
    currentPlayer.hasSelectedCard = true;
    currentPlayer.selectedCardIndex = index;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  playCard = async () => {
    const gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    
    const { uid } = auth.currentUser ? auth.currentUser : {};
    let currentPlayer = getPlayerById(gameInfo.players, uid);
    currentPlayer.playedCardIndex = currentPlayer.selectedCardIndex;
    currentPlayer.selectedCardIndex = -1;
    currentPlayer.hasSelectedCard = false;
    currentPlayer.hasPlayedCard = true;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  validatePlayerCard = async () => {
    let gameInfo = collectIdsAndDocs(await this.gamesRef.doc(`${this.gameId}`).get());
    const { uid } = auth.currentUser ? auth.currentUser : {};
    let currentPlayer = getPlayerById(gameInfo.players, uid);
    if(this.state.isPlayerJudge) {
      gameInfo.judgeCardId = currentPlayer.hand[currentPlayer.playedCardIndex];
      currentPlayer.hand.splice(currentPlayer.playedCardIndex, 1);
      currentPlayer.playedCardIndex = -1;
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
    const { uid } = auth.currentUser ? auth.currentUser : {};
    let currentPlayer = getPlayerById(gameInfo.players, uid);
    
    currentPlayer.hasSelectedCard = false;
    currentPlayer.hasPlayedCard = false;
    currentPlayer.hasValidatedCard = false;
    currentPlayer.playedCardIndex = -1;
    currentPlayer.selectedCardIndex = -1;

    this.gamesRef.doc(`${this.gameId}`).update({
      players: gameInfo.players,
    });
  }

  render() {
    const {
      players,
      hand,
      hasPlayerPlayedCard,
      hasPlayerSelectedCard,
      hasPlayerValidatedCard,
      playerSelectedCardIndex,
      playerPlayedCardIndex,

      deckRandomCardId,
      judgeId,
      isPlayerJudge,

      hasDeckGaveRandomCard,
      judgeCardId,
      hasJudgePlayedCard,
      hasAllPlayersPlayedCard,
    } = this.state
    
    return (
      <div>
        <div className="Game">
          <PlayersInfo 
            players = { players }
            judgeId = { judgeId }
            hasJudgePlayedCard = { hasJudgePlayedCard }
          />
          <GameTextInformation 
            isPlayerJudge = { isPlayerJudge }
            hasPlayerPlayedCard = { hasPlayerPlayedCard }
            hasPlayerSelectedCard = { hasPlayerSelectedCard }
            hasPlayerValidatedCard = { hasPlayerValidatedCard }
            hasAllPlayersPlayedCard = { hasAllPlayersPlayedCard }
            hasJudgePlayedCard = { hasJudgePlayedCard }
          />
          <GameBoard 
            isPlayerJudge = { isPlayerJudge }
            hasDeckGaveRandomCard = { hasDeckGaveRandomCard }
            hasJudgePlayedCard = { hasJudgePlayedCard }
            hasPlayerPlayedCard = { hasPlayerPlayedCard }
            hasPlayerValidatedCard = { hasPlayerValidatedCard }
            deckRandomCardId = { deckRandomCardId }
            judgeCardId = { judgeCardId }
            playerPlayedCardId = { this.getHandCardIdByIndex(playerPlayedCardIndex) }
            
            deletePlayerCard = { () => this.deletePlayerCard() }
            validatePlayerCard = { () => this.validatePlayerCard() }
          />

          <PlayerDeck 
            hand = {hand}
            hasPlayerSelectedCard = { hasPlayerSelectedCard }
            hasPlayerPlayedCard = { hasPlayerPlayedCard }
            playerSelectedCardIndex = { playerSelectedCardIndex }
            playerPlayedCardIndex = { playerPlayedCardIndex }
            selectCard = { (index) => this.selectCard(index) }
          />
          
        </div>

        <SelectedCard 
          {...this.state}
          isPlayerJudge = { isPlayerJudge }
          hasPlayerSelectedCard = { hasPlayerSelectedCard }
          cardId = { this.getHandCardIdByIndex(playerSelectedCardIndex) }
          hasJudgePlayedCard = { hasJudgePlayedCard }
          deselectCard = { () => this.deletePlayerCard() }
          playCard = { () => this.playCard() }
        />
      </div>
    );
  }
}

export default Game;