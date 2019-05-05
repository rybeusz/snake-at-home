import React from "react";
import { Sprite, Text } from "react-pixi-fiber";
import SnakeFood from "./SnakeFood";
import SnakeFlower from "./SnakeFlower";
import SnakeModule from "./SnakeModule";

function GameScreen(props) {
  let description = 'points: ' + props.points;
  if(props.flowerData[2]) {
    description += '   flower time: ' + props.flowerData[3];
  }

  return (
    <Sprite>

      <SnakeFood TYPE='FOOD' X={props.foodData[0]} Y={props.foodData[1]}/>

      {(props.flowerData[2]) ? <SnakeFlower TYPE='FLOWER' X={props.flowerData[0]} Y={props.flowerData[1]}/> : null}

      {props.snakeData.map((item, index) => {
        return <SnakeModule key={index} TYPE={index === 0 ? 'HEAD' : 'BODY'} X={item[0]} Y={item[1]}/>
      })}

      <Text
        anchor="0.5,1"
        interactive
        position={`${props.stageWidth / 2},${props.stageHeight}`}
        style={{ fill: 0x61dafb, fontSize: 24 }}
        text={description}
      />

    </Sprite>
  );
}

export default GameScreen;