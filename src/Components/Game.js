import React,  { Component } from 'react';
import GameDisplay from './GameDisplay';

const DIR_UP = "UP";
const DIR_DOWN = "DOWN";
const DIR_LEFT = "LEFT";
const DIR_RIGHT = "RIGHT";
const GAME_ROWS = 15;
const GAME_COLUMNS = 20;
const GRID_SIZE = 40;

let timer = null;
let direction = DIR_RIGHT;
let lastKeyPressed = 39;
let gameInterval = 500;

let hasEaten = false;

let initiallState = {
  gameState: 0,
  snake: [[3,1], [2,1], [1,1]],
  food: [0,0],
  points: 0
};

class Game extends Component {
  state = initiallState;

  componentDidMount() {
    window.addEventListener(
      "keydown", this.handleKeys, false
    );
  }

  componentWillUnmount() {
    clearInterval(timer);

    window.removeEventListener(
      "keydown", this.handleKeys, false
    );
  }

  // speeds up the snake every meal
  changeInterval() {
    clearInterval(timer);
    if(gameInterval > 100) gameInterval -= 20;
    timer = setInterval(this.moveSnake, gameInterval);
  }

  // recreates new food outside of snake recursively
  createNewMeal = () => {
    let newFoodPosition = [Math.floor(Math.random() * GAME_COLUMNS), Math.floor(Math.random() * GAME_ROWS)];

    let foodOnSnake = this.state.snake.filter(elem => elem[0] === newFoodPosition[0] && elem[1] === newFoodPosition[1]);
    if(foodOnSnake.length > 0) {
      this.createNewMeal();
      return;
    }

    this.setState(state => {
      state.food = newFoodPosition;
      return {
        state
      };
    });
  };

  //  game animation and logic
  moveSnake = () => {
    hasEaten = false;

    //  set new direction if not totally opposite to current direction
    switch (lastKeyPressed) {
      default:
      case DIR_RIGHT:
        if (direction !== DIR_LEFT) direction = DIR_RIGHT;
        break;
      case DIR_DOWN:
        if (direction !== DIR_UP) direction = DIR_DOWN;
        break;
      case DIR_LEFT:
        if (direction !== DIR_RIGHT) direction = DIR_LEFT;
        break;
      case DIR_UP:
        if (direction !== DIR_DOWN) direction = DIR_UP;
        break;
    }

    //  copy actual snake head position
    let headPosition = [[0,0]];
    headPosition[0] = this.state.snake[0][0];
    headPosition[1] = this.state.snake[0][1];

    //  set new head position according to direction
    switch (direction) {
      default:
      case DIR_RIGHT :
        headPosition[0]++;
        break;
      case DIR_LEFT :
        headPosition[0]--;
        break;
      case DIR_UP :
        headPosition[1]--;
        break;
      case DIR_DOWN :
        headPosition[1]++;
        break;
    }

    if(headPosition[0] > GAME_COLUMNS-1) {
        headPosition[0] = 0;
    }
    if(headPosition[0] < 0) {
        headPosition[0] = GAME_COLUMNS-1;
    }
    if(headPosition[1] > GAME_ROWS-1) {
        headPosition[1] = 0;
    }
    if(headPosition[1] < 0) {
        headPosition[1] = GAME_ROWS-1;
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
      hasEaten=true;
      this.createNewMeal();
      this.changeInterval();
      this.setState(state => {
        state.points++;
        return {
          state
        };
      });
    }

    //  unshift snake's array, and if snake hits the food - do not trim his tail
    this.setState(state => {
      if(!hasEaten) {
        state.snake.pop();
      }
      state.snake.unshift(headPosition);
      return {
        state
      };
    });
  };

  gameOver = () => {
    console.log("Game Over");
    clearInterval(timer);
    this.setState(state => {
      state.gameState = 2;
      return {
        state
      };
    });
  };

  reStartGame = () => {
    console.log("Game Start");

    hasEaten = false;
    lastKeyPressed = 39;
    gameInterval = 500;
    direction = DIR_RIGHT;

    this.setState(state => {
      state.gameState = 1;
      state.snake = [[3,1], [2,1], [1,1]];
      state.food = [0,0];
      state.points = 0;
      return {
        state
      };
    });

    this.createNewMeal();
    timer = setInterval(this.moveSnake, gameInterval);
  };

  handleKeys = (key) => {
    switch (key.keyCode) {
      default:
      case 39:
        lastKeyPressed = DIR_RIGHT;
        break;
      case 40:
        lastKeyPressed = DIR_DOWN;
        break;
      case 37:
        lastKeyPressed = DIR_LEFT;
        break;
      case 38:
        lastKeyPressed = DIR_UP;
        break;
    }
  };

  render() {
    return (<div>
              <GameDisplay snakeData={this.state.snake} foodData={this.state.food}
                           points={this.state.points} gameState={this.state.gameState}
                           callback={this.reStartGame}/>
            </div>);
  }
}

export default Game;