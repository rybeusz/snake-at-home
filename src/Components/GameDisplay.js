import React, { Component } from "react";
import PropTypes from "prop-types";
import { Stage } from "react-pixi-fiber";
import GameScreen from '../Containers/GameScreen';
import GameEndScreen from '../Containers/GameEndScreen';
import GameStartScreen from '../Containers/GameStartScreen';

let stageOptions = {
  autoResize: true,
  width: 800,
  height: 600,
  resolution: window.devicePixelRatio || 1,
  transparent: false
};


class GameDisplay extends Component {

  componentDidMount() {

  }

  render() {
    let currentScreen;
    switch (this.props.gameState) {
      case 1:
        currentScreen = <GameScreen stageWidth={stageOptions.width} stageHeight={stageOptions.height}
                                    snakeData={this.props.snakeData}
                                    foodData={this.props.foodData} points={this.props.points}/>;
        break;
      case 2:
        currentScreen = <GameEndScreen stageWidth={stageOptions.width} stageHeight={stageOptions.height}
                                       clickHandler={this.props.callback}/>;
        break;
      case 0:
      default:
        currentScreen = <GameStartScreen stageWidth={stageOptions.width} stageHeight={stageOptions.height}
                                         clickHandler={this.props.callback}/>;
        break;
    }

    return (
      <Stage options={stageOptions}>
        {currentScreen}
      </Stage>
    );
  }
}

GameDisplay.propTypes = {
  snakeData: PropTypes.array.isRequired,
  foodData: PropTypes.array.isRequired,
  points: PropTypes.number.isRequired
};

export default GameDisplay;
