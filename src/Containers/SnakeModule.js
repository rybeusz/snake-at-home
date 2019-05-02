import React from "react";
import { Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import sHead from "../Assets/head2.fw.png";
import sBody from "../Assets/body2.fw.png";

function SnakeModule(props) {

let moduleStyle = (props.TYPE === 'HEAD') ? sHead : sBody;

  return (
    <Sprite anchor="0,0"
            name={props.TYPE}
            position={`${props.X*40}, ${props.Y*40}`}
            texture={PIXI.Texture.fromImage(moduleStyle)}
    />
  );
}

export default SnakeModule;
