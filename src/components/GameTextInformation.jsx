import React, { Component } from 'react';

class GameTextInformation extends Component {
  getinformationText() {
    const {
      isPlayerJudge,
      hasPlayerPlayedCard,
      hasPlayerValidatedCard,
      hasAllPlayersPlayedCard,
      hasJudgePlayedCard,
    } = this.props

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
    return displayText;
  }
  
  render() {
    const informationText = this.getinformationText()
    return (
      <div className="GameTextInformation">
        <p>{informationText}</p>
      </div>
    );
  }
}


export default GameTextInformation;

  
  
  