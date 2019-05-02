import React from "react";
import { Sprite, Text } from "react-pixi-fiber";
import SnakeFood from "./SnakeFood";
import SnakeModule from "./SnakeModule";

function GameScreen(props) {

  return (
    <Sprite>

      <SnakeFood TYPE='FOOD' X={props.foodData[0]} Y={props.foodData[1]}/>

      {props.snakeData.map((item, index) => {
        return <SnakeModule key={index} TYPE={index === 0 ? 'HEAD' : 'BODY'} X={item[0]} Y={item[1]}/>
      })}

      <Text
        anchor="0.5,1"
        interactive
        position={`${props.stageOptions.width / 2},${props.stageOptions.height}`}
        style={{ fill: 0x61dafb, fontSize: 24 }}
        text={'points: ' + props.points}
      />

    </Sprite>
  );
}

export default GameScreen;