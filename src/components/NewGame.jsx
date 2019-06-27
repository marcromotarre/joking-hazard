import React, { Component } from "react";

import Slider from "react-slick";

class NewGame extends Component {
  state = {
    hasJudgeSelectedCard: false
  };

  createPlayer(id) {
    return <div key={`${id}`} className={`g-playerinfo`} />;
  }

  //https://react-slick.neostack.com/docs/example/center-mode

  render() {
    /*

     <div className="g-judge-actions">
          {!hasJudgeSelectedCard && <div className="g-judge-action" />}
          {hasJudgeSelectedCard && <div className="g-judge-action" />}
          {hasJudgeSelectedCard && <div className="g-judge-action" />}
        </div>
    */

    const settings = {
      className: "center",
      centerMode: true,
      centerPadding: "60px",
      arrows: false,
      infinite: false,
      slidesToShow: 1,
      vertical: true,
      verticalSwiping: true,
      speed: 500,
      slidesToScroll: 1,
      adaptiveHeight: true
    };

    const numberOfPlayers = 6;
    const players = Array.from(Array(numberOfPlayers), (x, index) => index + 1);

    const playersTop = [1, 2, 3];
    const playersBottom = [4, 5];

    const { hasJudgeSelectedCard } = this.state;
    return (
      <div className="g-judgement">
        <div className="g-playersinfo">
          <div className="g-playersrow">
            {playersTop.map(player => {
              return this.createPlayer(player);
            })}
          </div>
          <div className="g-playersrow">
            {playersBottom.map(player => {
              return this.createPlayer(player);
            })}
          </div>
        </div>
        <div className="g-gameboard">
          <div className="g-gameboard-actual g-gameboard-card-1">
            <img
              key={`delete-played-card`}
              className={`g-gameboard-card-center`}
              src={require(`../assets/cards/card-0.svg`)}
              alt="gameboard-card-img"
            />
          </div>
          <div className="g-gameboard-actual g-gameboard-card-2">
            <img
              key={`delete-played-card`}
              className={`g-gameboard-card-center`}
              src={require(`../assets/cards/card-0.svg`)}
              alt="gameboard-card-img"
            />
          </div>
          <div className="g-gameboard-card-3">
            <Slider className="g-slider" {...settings}>
              <div style={{ height: "100px" }}>
                <img
                  key={`delete-played-card`}
                  src={require(`../assets/cards/card-1.svg`)}
                  alt="gameboard-card-img"
                />
              </div>
              <div style={{ height: "100px" }}>
                <img
                  key={`delete-played-card`}
                  src={require(`../assets/cards/card-2.svg`)}
                  alt="gameboard-card-img"
                />
              </div>
              <div style={{ height: "100px" }}>
                <img
                  key={`delete-played-card`}
                  src={require(`../assets/cards/card-3.svg`)}
                  alt="gameboard-card-img"
                />
              </div>
              <div style={{ height: "50px" }}>
                <img
                  key={`delete-played-card`}
                  src={require(`../assets/cards/card-4.svg`)}
                  alt="gameboard-card-img"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default NewGame;
