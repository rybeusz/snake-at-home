import React from "react";
import PropTypes from "prop-types";
import { Sprite, Stage, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const options = {
  autoResize: true,
  height: 600,
  resolution: window.devicePixelRatio || 1,
  transparent: true,
  width: 800
};

function Snake({ logo }) {
  return (
    <Stage options={options}>
      <Sprite
        anchor="0.5,0.5"
        position={`${options.width / 2},${options.height / 2}`}
        texture={PIXI.Texture.fromImage(logo)}
      />
      <Text
        anchor="0.5,1"
        position={`${options.width / 2},${options.height - 30}`}
        style={{ fill: 0xffffff, fontSize: 20 }}
        text="Edit src/App.js and save to reload."
      />
      <Text
        anchor="0.5,1"
        interactive
        pointerdown={() => window.open("https://reactjs.org")}
        position={`${options.width / 2},${options.height}`}
        style={{ fill: 0x61dafb, fontSize: 20 }}
        text="Learn React"
      />
    </Stage>
  );
}
Snake.propTypes = {
  logo: PropTypes.string.isRequired
};

export default Snake;
