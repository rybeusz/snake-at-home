import React from "react";
import PropTypes from "prop-types";
import { Sprite, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import SnakeFood from "../Containers/SnakeFood";
import SnakeFlower from "../Containers/SnakeFlower";
import SnakeModule from "../Containers/SnakeModule";

const GameScreen = ({
  points,
  snakeData,
  flowerData,
  foodData,
  eatingFilter,
  stageWidth,
  stageHeight
}) => {
  const getDescription = () => {
    let description = "points: " + points;
    if (flowerData[2]) {
      description += "   flower time: " + flowerData[3];
    }
    return description;
  };

  const getFilter = () => {
    let filter = [];
    switch (eatingFilter) {
      case 0:
      default:
        filter = [];
        break;
      case 1:
        filter = new PIXI.filters.BlurFilter();
        break;
      case 2:
        filter = new PIXI.filters.ColorMatrixFilter();
        let colorMatrix = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        filter.matrix = colorMatrix;
        break;
    }
    return filter;
  };

  return (
    <Sprite filters={[getFilter()]}>
      <SnakeFood TYPE="FOOD" X={foodData[0]} Y={foodData[1]} />

      {flowerData[2] && (
        <SnakeFlower TYPE="FLOWER" X={flowerData[0]} Y={flowerData[1]} />
      )}

      {snakeData.map((item, index) => (
        <SnakeModule
          key={index}
          TYPE={index === 0 ? "HEAD" : "BODY"}
          X={item[0]}
          Y={item[1]}
        />
      ))}

      <Text
        anchor="0.5,1"
        interactive
        position={`${stageWidth / 2},${stageHeight}`}
        style={{ fill: 0x61dafb, fontSize: 24 }}
        text={getDescription()}
      />
    </Sprite>
  );
};

GameScreen.propTypes = {
  snakeData: PropTypes.array.isRequired,
  foodData: PropTypes.array.isRequired,
  points: PropTypes.number.isRequired,
  flowerData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
  ).isRequired,
  eatingFilter: PropTypes.number.isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired
};

export default GameScreen;
