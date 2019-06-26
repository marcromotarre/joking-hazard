import React, { Component } from "react";

class GameBoard extends Component {
  deletePlayerCard() {
    this.props.deletePlayerCard();
  }

  validatePlayerCard() {
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
    const { hasPlayerValidatedCard, hasPlayerPlayedCard } = this.props;

    const deleteIconClass = hasPlayerValidatedCard
      ? "delete-player-played-card_validated"
      : "delete-player-played-card";

    return (
      <div>
        {hasPlayerPlayedCard && (
          <div>
            <img
              key={`delete-played-card`}
              className={`${deleteIconClass}`}
              src={require(`../assets/delete-icon.svg`)}
              alt="delete-player-played-card"
              onClick={() => this.deletePlayerCard()}
            />
            {!hasPlayerValidatedCard && (
              <img
                key={`validate-played-card`}
                className="validate-player-played-card"
                src={require(`../assets/accept-icon.svg`)}
                alt="validate-player-played-card"
                onClick={() => this.validatePlayerCard()}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      hasDeckGaveRandomCard,
      deckRandomCardId,

      hasJudgePlayedCard,
      judgeCardId,

      hasPlayerPlayedCard,
      hasPlayerValidatedCard,
      playerPlayedCardId
    } = this.props;

    const _deckRandomCardId = hasDeckGaveRandomCard ? deckRandomCardId : 0;

    let gameBoardCards;
    if (this.props.isPlayerJudge) {
      let _judgeCardId;
      if (hasPlayerPlayedCard) {
        _judgeCardId = playerPlayedCardId;
      } else if (hasPlayerValidatedCard) {
        _judgeCardId = judgeCardId;
      } else {
        _judgeCardId = 0;
      }
      gameBoardCards = [_deckRandomCardId, _judgeCardId, 0];
    } else {
      const _judgeCardId = hasJudgePlayedCard ? judgeCardId : 0;
      const _playerCard =
        hasPlayerPlayedCard || hasPlayerValidatedCard ? playerPlayedCardId : 0;
      gameBoardCards = [_deckRandomCardId, _judgeCardId, _playerCard];
    }

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
