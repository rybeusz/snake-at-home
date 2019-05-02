import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import sFood from "../Assets/sFood.png";

function SnakeFood(props) {

  return (
    <Sprite anchor="0,0"
            name={props.TYPE}
            position={`${props.X*40},${props.Y*40}`}
            texture={PIXI.Texture.fromImage(sFood)}
    />
  );
}

export default SnakeFood;