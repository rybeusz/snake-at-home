import React from "react";

function GameModel() {
  const Model = {
    GridSize: 40,

    stageOptions : {
      autoResize: true,
      height: 600,
      width: 800,
      resolution: window.devicePixelRatio || 1,
      transparent: false
    }
    //
    //  GridSize
    //  GameTempo
    //  references to images
    //  Stage parameters
    //  Initial game state
    //
    //
  };

  return Model;
}

export default GameModel;

