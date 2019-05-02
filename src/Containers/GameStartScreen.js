import React from "react";
import { Sprite, Text } from "react-pixi-fiber";

function GameStartScreen(props) {

  return (
    <Sprite interactive pointerdown={props.clickHandler} cursor="pointer">
      <Text
        anchor="0.5,1"
        interactive
        position={`${props.stageWidth / 2},${props.stageHeight / 2}`}
        style={{ fill: 0x61dafb, fontSize: 40 }}
        text={'START GAME'}
      />
    </Sprite>
  );
}

export default GameStartScreen;