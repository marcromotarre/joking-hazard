import React, { Component } from 'react';

class PlayersInfo extends Component {

  renderPlayer(player) {
    const {
      judgeId,
      hasJudgePlayedCard,
    } = this.props

    return (
        <div
            key={`player-image-${player.uid}`}
        > 
          <img 
            className="player-game-image" 
            src={require(`../assets/emojis/emoji-${player.faceId}.svg`)} 
            alt="player-card" 
          />
          <p>{player.displayName}</p>
          <p>Scrore: {player.score}</p>
          {judgeId === player.uid && 
            <img 
              className="judge-icon" 
              src={require(`../assets/judge-icon.svg`)} 
              alt="judge-icon" 
            />
          }
          {judgeId !== player.uid && !player.hasValidatedCard && hasJudgePlayedCard && 
            <img 
              className="judge-icon" 
              src={require(`../assets/cards-icon.svg`)} 
              alt="judge-icon" 
            />
          }
        </div>
    );
  }

  render() {
    const {
      players,
    } = this.props
    return (
      <div className="PlayersInfo">
        {players.map((player, counter) => 
          this.renderPlayer(player)
        )}
      </div>
    );
  }
}

export default PlayersInfo;



