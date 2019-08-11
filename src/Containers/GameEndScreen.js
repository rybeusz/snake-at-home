import React from "react";
import PropTypes from "prop-types";

import ScreenElement from "../Components/ScreenElement";

const GameEndScreen = ({
  points,
  stageWidth,
  stageHeight,
  onClickStartGame,
  onClickSettings
}) => (
  <React.Fragment>
    <ScreenElement
      text={`GAME OVER \nSCORE: ${points}`}
      position={`${stageWidth / 2},${stageHeight / 2 - 60}`}
      interactive={false}
    />
    <ScreenElement
      text={"RESTART GAME"}
      onClick={onClickStartGame}
      position={`${stageWidth / 2},${stageHeight / 2 + 30}`}
    />
    <ScreenElement
      text="SETTINGS"
      onClick={onClickSettings}
      position={`${stageWidth / 2},${stageHeight / 2 + 90}`}
    />
  </React.Fragment>
);

GameEndScreen.propTypes = {
  points: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  onClickStartGame: PropTypes.func.isRequired,
  onClickSettings: PropTypes.func.isRequired
};

export default GameEndScreen;
