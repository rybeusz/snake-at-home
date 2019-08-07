import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import Game from '../Components/Game';
import sFood from "../Assets/sFood.png";

function SnakeFood(props) {

  return (
    <Sprite anchor="0,0"
            name={props.TYPE}
            position={`${props.X*Game.Model.GRID_SIZE},${props.Y*Game.Model.GRID_SIZE}`}
            texture={PIXI.Texture.fromImage(sFood)}
    />
  );
}

export default SnakeFood;