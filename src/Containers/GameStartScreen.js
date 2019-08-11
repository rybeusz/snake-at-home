import React from "react";
import PropTypes from "prop-types";

import ScreenElement from "../Components/ScreenElement";

const GameStartScreen = ({
  stageWidth,
  stageHeight,
  onClickStartGame,
  onClickSettings
}) => (
  <React.Fragment>
    <ScreenElement
      text="START GAME"
      onClick={onClickStartGame}
      position={`${stageWidth / 2},${stageHeight / 2 - 30}`}
    />
    <ScreenElement
      text="SETTINGS"
      onClick={onClickSettings}
      position={`${stageWidth / 2},${stageHeight / 2 + 30}`}
    />
  </React.Fragment>
);

GameStartScreen.propTypes = {
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  onClickStartGame: PropTypes.func.isRequired,
  onClickSettings: PropTypes.func.isRequired
};

export default GameStartScreen;
