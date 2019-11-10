
import React,  { Component } from 'react';
import PropTypes from "prop-types";

import GameDisplay from './GameDisplay';

export default class Game extends Component {
  static Model = {
    initiallState : {
      gameState: 0,
      snake: [[3,1], [2,1], [1,1]],
      food: [0,0],
      flower: [0,0, false, 25],
      points: 0,
      eatingFilter: 0,
      gameInterval: 500,
    },

    GRID_SIZE: 40,

    DIR_UP : "UP",
    DIR_DOWN : "DOWN",
    DIR_LEFT : "LEFT",
    DIR_RIGHT : "RIGHT",

    timer : null,
    direction : "RIGHT",
    lastKeyPressed : 39,
    flowerLifespan : 25,

    hasEaten : false
  };

  state = Game.Model.initiallState;

  componentDidMount() {
    window.addEventListener(
      "keydown", this.handleKeys, false
    );
  }

  componentWillUnmount() {
    clearInterval(Game.Model.timer);

    window.removeEventListener(
      "keydown", this.handleKeys, false
    );
  }

  getColumnsNumber = () => this.props.settings.width / Game.Model.GRID_SIZE;

  getRowsNumber = () => this.props.settings.height / Game.Model.GRID_SIZE;

  // speeds up the snake every meal
  changeInterval() {
    clearInterval(Game.Model.timer);
    if(this.state.gameInterval > 200){
      this.setState(prevState => ({
        gameInterval: prevState.gameInterval - 40,
      }));
    }
    Game.Model.timer = setInterval(this.moveSnake, this.state.gameInterval);
  }

  // recreates new food outside of snake recursively
  createNewMeal = () => {
    let newFoodPosition = [Math.floor(Math.random() * this.getColumnsNumber()), Math.floor(Math.random() * this.getRowsNumber())];

    let foodOnSnake = this.state.snake.filter(elem => elem[0] === newFoodPosition[0] && elem[1] === newFoodPosition[1]);
    if(foodOnSnake.length > 0) {
      this.createNewMeal();
      return;
    }

    this.setState({
      food: newFoodPosition
    });
  };

  // recreates new flower, that slows the snake down
  createSpecialMeal = () => {

    let newFlowerPosition = [Math.floor(Math.random() * this.getColumnsNumber()), Math.floor(Math.random() * this.getRowsNumber())];

    let foodOnSnake = this.state.snake.filter(elem => elem[0] === newFlowerPosition[0] && elem[1] === newFlowerPosition[1]);
    if(foodOnSnake.length > 0) {
      this.createSpecialMeal();
      return;
    }

    this.setState({
      flower: [...newFlowerPosition, true, Game.Model.flowerLifespan]
    })
  };

  //  game animation and logic
  moveSnake = () => {
    Game.Model.hasEaten = false;
    this.setState({
      eatingFilter: 0
    });

    //  set new direction if not totally opposite to current direction
    switch (Game.Model.lastKeyPressed) {
      default:
      case Game.Model.DIR_RIGHT:
        if (Game.Model.direction !== Game.Model.DIR_LEFT) Game.Model.direction = Game.Model.DIR_RIGHT;
        break;
      case Game.Model.DIR_DOWN:
        if (Game.Model.direction !== Game.Model.DIR_UP) Game.Model.direction = Game.Model.DIR_DOWN;
        break;
      case Game.Model.DIR_LEFT:
        if (Game.Model.direction !== Game.Model.DIR_RIGHT) Game.Model.direction = Game.Model.DIR_LEFT;
        break;
      case Game.Model.DIR_UP:
        if (Game.Model.direction !== Game.Model.DIR_DOWN) Game.Model.direction = Game.Model.DIR_UP;
        break;
    }

    //  copy actual snake head position
    let headPosition = [[0,0]];
    headPosition[0] = this.state.snake[0][0];
    headPosition[1] = this.state.snake[0][1];

    //  set new head position according to direction
    switch (Game.Model.direction) {
      default:
      case Game.Model.DIR_RIGHT :
        headPosition[0]++;
        break;
      case Game.Model.DIR_LEFT :
        headPosition[0]--;
        break;
      case Game.Model.DIR_UP :
        headPosition[1]--;
        break;
      case Game.Model.DIR_DOWN :
        headPosition[1]++;
        break;
    }

    //  Wrap snake (in tortilla)wa
    let isCollisionDetected = false;
    if (headPosition[0] > this.getColumnsNumber() - 1) {
      headPosition[0] = 0;
      isCollisionDetected = true;
    }
    if (headPosition[0] < 0) {
      headPosition[0] = this.getColumnsNumber() - 1;
      isCollisionDetected = true;
    }
    if (headPosition[1] > this.getRowsNumber() - 1) {
      headPosition[1] = 0;
      isCollisionDetected = true;
    }
    if (headPosition[1] < 0) {
      headPosition[1] = this.getRowsNumber() - 1;
      isCollisionDetected = true;
    }

    if (
      isCollisionDetected &&
      !this.props.settings.edgeWrapping
    ) {
      this.gameOver();
      return;
    }

    //  check if snake bites himself
    let uroboros = this.state.snake.filter(part => {
      return headPosition[0] === part[0] && headPosition[1] === part[1]
    });
    if(uroboros.length > 0) {
      this.gameOver();
      return;
    }

    //  check if snake hits the food, count the points
    if(headPosition[0] === this.state.food[0] && headPosition[1] === this.state.food[1]) {
      Game.Model.hasEaten=true;
      this.createNewMeal();
      this.changeInterval();
      
      this.setState(prevState => ({
        points: prevState.points + 1,
        eatingFilter: 1,
      }));
    }

    //  check if snake hits the flower, reset speed and count point
    if(this.state.flower[2] === true && headPosition[0] === this.state.flower[0]
      && headPosition[1] === this.state.flower[1]) {
      this.changeInterval();

      this.setState(prevState => {
        const copyFlower = [...prevState.flower];
        copyFlower[2] = false;

        return ({
          points: prevState.points + 1,
          flower: copyFlower,
          eatingFilter: 2,
          gameInterval: this.props.settings.speed
        });
    });
  }

    //  if flower exists, count down it's time, if it doesn't - check if it should
    if(this.state.flower[2]) {
      this.setState(prevState => {
        const copyFlower = [...prevState.flower];
        copyFlower[3] = copyFlower[3] - 1;

        if (copyFlower[3] <= 0) {
          copyFlower[2] = false;
        }

        return ({
          flower: copyFlower
        });
      });
    } else {
      if(Math.random() > 0.95) {
        this.createSpecialMeal();
      }
    }

    //  unshift snake's array, and if snake hits the food - do not trim his tail
    this.setState(prevState => {
      const copySnake = [...prevState.snake];
      if(!Game.Model.hasEaten) {
        copySnake.pop();
      }
      copySnake.unshift(headPosition);
      return ({
        snake: copySnake
      });
    });
  };

  gameOver = () => {
    console.log("Game Over");
    clearInterval(Game.Model.timer);
    this.setState({
      gameState: 2,
    });

    this.props.onGameOver(this.state.points);
  };

  startGame = () => {
    console.log("Game Start");

    Game.Model.hasEaten = false;
    Game.Model.lastKeyPressed = 39;
    Game.Model.direction = Game.Model.DIR_RIGHT;

    this.setState({
      ...Game.Model.initiallState,
      gameState: 1,
      gameInterval: this.props.settings.speed,
    });

    this.createNewMeal();
    Game.Model.timer = setInterval(this.moveSnake, this.state.gameInterval);
  };

  handleKeys = (key) => {
    switch (key.keyCode) {
      default:
      case 39:
        Game.Model.lastKeyPressed = Game.Model.DIR_RIGHT;
        break;
      case 40:
        Game.Model.lastKeyPressed = Game.Model.DIR_DOWN;
        break;
      case 37:
        Game.Model.lastKeyPressed = Game.Model.DIR_LEFT;
        break;
      case 38:
        Game.Model.lastKeyPressed = Game.Model.DIR_UP;
        break;
    }
  };

  render() {
    return (
        <GameDisplay
          snakeData={this.state.snake}
          foodData={this.state.food}
          points={this.state.points}
          gameState={this.state.gameState}
          flowerData={this.state.flower}
          eatingFilter={this.state.eatingFilter}
          stageWidth={this.props.settings.width}
          stageHeight={this.props.settings.height}
          onClickStartGame={this.startGame}
          onClickSettings={this.props.showSettings}
        />
    );
  }
}

Game.prototypes = {
  settings: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    speed: PropTypes.number,
    edgeWrapping: PropTypes.bool
  }).isRequired,
  showSettings: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired,
};
