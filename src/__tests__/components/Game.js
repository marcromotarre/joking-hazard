import React from "react";
import ReactDOM from "react-dom";
import Game from "../../components/Game.jsx";
import PlayersInfo from "../../components/PlayersInfo.jsx";

test("getCardIdByIndex", () => {
  const container = document.createElement("div");
  ReactDOM.render(<Game />, container);
  //const playersInfo = container.querySelector("PlayersInfo");

  //const hand = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //expect(getCardIdByIndex(hand, 0)).toBe(1);
});
