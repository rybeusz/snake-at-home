import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Game from "../Components/Game";
import sFlower from "../Assets/specialFruit.fw.png";

function SnakeFood(props) {

  return (
    <Sprite anchor="0,0"
            name={props.TYPE}
            position={`${props.X*Game.Model.GRID_SIZE},${props.Y*Game.Model.GRID_SIZE}`}
            texture={PIXI.Texture.fromImage(sFlower)}
    />
  );
}

export default SnakeFood;