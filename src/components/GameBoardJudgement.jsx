import React, { Component } from "react";

class GameBoardJudgement extends Component {
  /*

 if (
          hasAllPlayersPlayedCard &&
          game.judgementPlayedCardsRandomized.length === 0
        ) {
          //generate randomized
          game.players.map(player => {
            return player.
          })
        }

  */

  componentDidMount = async () => {
    console.log("GameBoardJudgement");
  };

  renderImage(cardId, counter, className) {
    return (
      <img
        key={`board-card-${cardId}-${counter}`}
        className={`judgement-card ${className}`}
        src={require(`../assets/cards/card-${cardId}.svg`)}
        alt="player-card"
      />
    );
  }
  render() {
    const { firstCardId, secondCardId, thirdCardId } = this.props;
    const gameBoardCards = [firstCardId, secondCardId, thirdCardId];

    return (
      <div className="GameBoardJudgement">
        {this.renderImage(5, 0, `judgement-card-previous`)}
        {gameBoardCards.map((cardId, counter) =>
          this.renderImage(cardId, counter, `judgement-card-actual-${counter}`)
        )}
        {this.renderImage(6, 0, `judgement-card-next`)}
      </div>
    );
  }
}

export default GameBoardJudgement;
