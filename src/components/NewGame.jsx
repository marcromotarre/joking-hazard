import React, { Component } from "react";

class NewGame extends Component {
  state = {
    hasJudgeSelectedCard: false,
    cardsArray: [1, 2, 3, 4, 5, 6, 7, 8],
    cardsPosition: 4
  };

  createPlayer(id) {
    return <div key={`${id}`} className={`g-playerinfo`} />;
  }

  //https://react-slick.neostack.com/docs/example/center-mode
  goPrevious() {
    if (this.state.cardsPosition > 0) {
      let gameBoardCardPrev = document.getElementById(
        "gameboard-card-previous"
      );
      gameBoardCardPrev.classList.add("g-animation-previous-to-actual");
      const previousCallback = () => {
        let gameBoardCardPrev = document.getElementById(
          "gameboard-card-previous"
        );
        if (gameBoardCardPrev) {
          gameBoardCardPrev.classList.remove("g-animation-previous-to-actual");
          gameBoardCardPrev.removeEventListener(
            "animationend",
            previousCallback,
            false
          );
        }
      };
      gameBoardCardPrev.addEventListener("animationend", previousCallback);
    }

    let gameBoardCardActual = document.getElementById("gameboard-card-actual");
    gameBoardCardActual.classList.add("g-animation-actual-to-next");
    let actualCallBack = () => {
      let gameBoardCardActual = document.getElementById(
        "gameboard-card-actual"
      );
      gameBoardCardActual.classList.remove("g-animation-actual-to-next");
      this.setState({ cardsPosition: this.state.cardsPosition - 1 });
      gameBoardCardActual.removeEventListener(
        "animationend",
        actualCallBack,
        false
      );
    };
    gameBoardCardActual.addEventListener("animationend", actualCallBack);

    if (this.state.cardsPosition < this.state.cardsArray.length - 1) {
      let gameBoardCardNext = document.getElementById("gameboard-card-next");
      gameBoardCardNext.classList.add("g-animation-next-to-previous");
      const nextCallback = () => {
        let gameBoardCardNext = document.getElementById("gameboard-card-next");
        if (gameBoardCardNext) {
          gameBoardCardNext.classList.remove("g-animation-previous-to-actual");
          gameBoardCardNext.removeEventListener(
            "animationend",
            nextCallback,
            false
          );
        }
      };
      gameBoardCardNext.addEventListener("animationend", nextCallback);
    }
  }

  goNext() {
    if (this.state.cardsPosition > 0) {
      let gameBoardCardPrev = document.getElementById(
        "gameboard-card-previous"
      );
      gameBoardCardPrev.classList.add("g-animation-previous-to-next");
      const previousCallback2 = () => {
        let gameBoardCardPrev = document.getElementById(
          "gameboard-card-previous"
        );
        if (gameBoardCardPrev) {
          gameBoardCardPrev.classList.remove("g-animation-previous-to-next");
          gameBoardCardPrev.removeEventListener(
            "animationend",
            previousCallback2,
            false
          );
        }
      };
      gameBoardCardPrev.addEventListener("animationend", previousCallback2);
    }

    let gameBoardCardActual = document.getElementById("gameboard-card-actual");
    gameBoardCardActual.classList.add("g-animation-actual-to-previous");
    let actualCallBack2 = () => {
      let gameBoardCardActual = document.getElementById(
        "gameboard-card-actual"
      );
      gameBoardCardActual.classList.remove("g-animation-actual-to-previous");
      this.setState({ cardsPosition: this.state.cardsPosition + 1 });
      gameBoardCardActual.removeEventListener(
        "animationend",
        actualCallBack2,
        false
      );
    };
    gameBoardCardActual.addEventListener("animationend", actualCallBack2);

    let gameBoardCardNext = document.getElementById("gameboard-card-next");
    gameBoardCardNext.classList.add("g-animation-next-to-actual");
    const nextCallback2 = () => {
      let gameBoardCardNext = document.getElementById("gameboard-card-next");
      if (gameBoardCardNext) {
        gameBoardCardNext.classList.remove("g-animation-next-to-actual");
        gameBoardCardNext.removeEventListener(
          "animationend",
          nextCallback2,
          false
        );
      }
    };
    gameBoardCardNext.addEventListener("animationend", nextCallback2);
  }

  render() {
    /*
      <div className="g-judge-actions">
        {!hasJudgeSelectedCard && <div className="g-judge-action" />}
        {hasJudgeSelectedCard && <div className="g-judge-action" />}
        {hasJudgeSelectedCard && <div className="g-judge-action" />}
      </div>
    */
    const numberOfPlayers = 6;
    const players = Array.from(Array(numberOfPlayers), (x, index) => index + 1);

    const playersTop = [1, 2, 3];
    const playersBottom = [4, 5];
    const { hasJudgeSelectedCard, cardsArray, cardsPosition } = this.state;
    console.log(cardsPosition);

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
          <div className="g-gameboard-actual g-gameboard-card-3">
            <img
              id="gameboard-card-actual"
              className="g-animation g-gameboard-card-center"
              key={`delete-played-card`}
              src={require(`../assets/cards/card-${
                cardsArray[cardsPosition]
              }.svg`)}
              alt="gameboard-card-img"
            />
          </div>
          {cardsPosition > 0 && (
            <div className="g-gameboard-previous">
              <img
                id="gameboard-card-previous"
                className="g-gameboard-card-small"
                key={`delete-played-card`}
                src={require(`../assets/cards/card-${
                  cardsArray[cardsPosition - 1]
                }.svg`)}
                alt="gameboard-card-img"
                onClick={() => this.goPrevious()}
              />
            </div>
          )}
          {cardsPosition < cardsArray.length - 1 && (
            <div className="g-gameboard-next">
              <img
                id="gameboard-card-next"
                className="g-gameboard-card-small"
                key={`delete-played-card`}
                src={require(`../assets/cards/card-${
                  cardsArray[cardsPosition + 1]
                }.svg`)}
                alt="gameboard-card-img"
                onClick={() => this.goNext()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NewGame;
