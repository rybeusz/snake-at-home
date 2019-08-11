import React from "react";
import PropTypes from "prop-types";
import { Stage, withApp } from "react-pixi-fiber";
import GameScreen from "./GameScreen";
import GameEndScreen from "../Containers/GameEndScreen";
import GameStartScreen from "../Containers/GameStartScreen";

const stageOptions = {
  autoResize: true,
  resolution: window.devicePixelRatio || 1,
  transparent: false
};

const GameDisplay = ({
  gameState,
  points,
  stageWidth,
  stageHeight,
  onClickStartGame,
  onClickSettings,
  ...otherProps
}) => {
  const renderCurrentScreen = () => {
    const commonProps = {
      stageWidth,
      stageHeight
    };

    const actionsProps = {
      onClickStartGame,
      onClickSettings
    };

    if (gameState === 1) {
      return <GameScreen points={points} {...commonProps} {...otherProps} />;
    }

    if (gameState === 2) {
      return (
        <GameEndScreen points={points} {...commonProps} {...actionsProps} />
      );
    }

    return <GameStartScreen {...commonProps} {...actionsProps} />;
  };

  const options = {
    ...stageOptions,
    width: stageWidth,
    height: stageHeight
  };

  return <Stage options={options}>{renderCurrentScreen()}</Stage>;
};

GameDisplay.propTypes = {
  snakeData: PropTypes.array.isRequired,
  foodData: PropTypes.array.isRequired,
  points: PropTypes.number.isRequired,
  gameState: PropTypes.oneOf([0, 1, 2]).isRequired,
  flowerData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
  ).isRequired,
  eatingFilter: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  onClickStartGame: PropTypes.func.isRequired,
  onClickSettings: PropTypes.func.isRequired
};

export default withApp(GameDisplay);
