import React, { Component } from "react";
import { Sprite, Text } from "react-pixi-fiber";
import SnakeFood from "./SnakeFood";
import SnakeFlower from "./SnakeFlower";
import SnakeModule from "./SnakeModule";

class GameScreen extends Component {
  render() {
    let description = 'points: ' + this.props.points;
    if(this.props.flowerData[2]) {
      description += '   flower time: ' + this.props.flowerData[3];
    }

    return (
        <Sprite>

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