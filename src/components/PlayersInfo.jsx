import React, { Component } from 'react';

class PlayersInfo extends Component {

  renderPlayer(player) {
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



