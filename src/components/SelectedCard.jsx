import React, { Component } from "react";

class SelectedCard extends Component {
  playCard() {
    if (
      (this.props.isPlayerJudge && !this.props.hasJudgePlayedCard) ||
      (!this.props.isPlayerJudge && this.props.hasJudgePlayedCard)
    ) {
      if (!this.props.hasPlayerValidatedCard) {
        this.props.playCard();
      }
    }
  }

  deselectCard() {
    this.props.deselectCard();
  }

  render() {
    const { hasPlayerSelectedCard, cardId } = this.props;

    return (
      <div>
        {hasPlayerSelectedCard && (
          <div className="SelectedCard">
            <img
              key={`selected-card-${cardId}`}
              className="selected-player-deck-card"
              src={require(`../assets/cards/card-${cardId}.svg`)}
              alt="selected-player-card"
              onClick={() => this.playCard()}
            />
            <img
              key={`delete-selected-card`}
              className="delete-selected-player-deck-card"
              src={require(`../assets/delete-icon.svg`)}
              alt="delete-selected-player-card"
              onClick={() => this.deselectCard()}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SelectedCard;
