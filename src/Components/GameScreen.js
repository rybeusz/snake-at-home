import React, { Component } from "react";
import { Sprite, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import SnakeFood from "../Containers/SnakeFood";
import SnakeFlower from "../Containers/SnakeFlower";
import SnakeModule from "../Containers/SnakeModule";

class GameScreen extends Component {
  render() {
    let description = 'points: ' + this.props.points;
    if(this.props.flowerData[2]) {
      description += '   flower time: ' + this.props.flowerData[3];
    }
    let filter = [];
    switch (this.props.eatingFilter) {
      case 0:
      default:
        filter = [];
        break;
      case 1:
        filter = new PIXI.filters.BlurFilter();
        break;
      case 2:
        filter = new PIXI.filters.ColorMatrixFilter();
        let colorMatrix = [
          1, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 0,
          0, 0, 0, 1
        ];
        filter.matrix = colorMatrix;
        break;
    }

    return (
        <Sprite filters={[filter]}>

          <SnakeFood TYPE='FOOD' X={this.props.foodData[0]} Y={this.props.foodData[1]}/>

          {(this.props.flowerData[2]) ? <SnakeFlower TYPE='FLOWER' X={this.props.flowerData[0]}
                                                     Y={this.props.flowerData[1]}/> : null}

          {this.props.snakeData.map((item, index) => {
            return <SnakeModule key={index} TYPE={index === 0 ? 'HEAD' : 'BODY'} X={item[0]} Y={item[1]}/>
          })}

          <Text
            anchor="0.5,1"
            interactive
            position={`${this.props.stageWidth / 2},${this.props.stageHeight}`}
            style={{ fill: 0x61dafb, fontSize: 24 }}
            text={description}
          />

        </Sprite>
    );
  }
}

export default GameScreen;