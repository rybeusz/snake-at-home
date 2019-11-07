export default class InputController {
  static DIRECTIONS = {
    DIR_UP: "UP",
    DIR_DOWN: "DOWN",
    DIR_LEFT: "LEFT",
    DIR_RIGHT: "RIGHT",
  }

  direction;

  constructor() {
    this.reset();
  }

  reset() {
    this.direction = InputController.DIRECTIONS.DIR_RIGHT;
  }

  startListening() {
    window.addEventListener(
      "keydown", this.handleKeys, false
    );
  }
  
  stopListening() {
    window.removeEventListener(
        "keydown", this.handleKeys, false
    );
  }

  handleKeys = (key) => {
    switch (key.keyCode) {
      default:
      case 39:
        this.setDirection(InputController.DIRECTIONS.DIR_RIGHT);
        break;
      case 40:
        this.setDirection(InputController.DIRECTIONS.DIR_DOWN);
        break;
      case 37:
        this.setDirection(InputController.DIRECTIONS.DIR_LEFT);
        break;
      case 38:
        this.setDirection(InputController.DIRECTIONS.DIR_UP);
        break;
    }
  };

  setDirection(direction) {
    //  set new direction if not totally opposite to current direction
    switch (direction) {
      default:
      case InputController.DIRECTIONS.DIR_RIGHT:
        if (this.direction !== InputController.DIRECTIONS.DIR_LEFT) this.direction = InputController.DIRECTIONS.DIR_RIGHT;
        break;
      case InputController.DIRECTIONS.DIR_DOWN:
        if (this.direction !== InputController.DIRECTIONS.DIR_UP) this.direction = InputController.DIRECTIONS.DIR_DOWN;
        break;
      case InputController.DIRECTIONS.DIR_LEFT:
        if (this.direction !== InputController.DIRECTIONS.DIR_RIGHT) this.direction = InputController.DIRECTIONS.DIR_LEFT;
        break;
      case InputController.DIRECTIONS.DIR_UP:
        if (this.direction !== InputController.DIRECTIONS.DIR_DOWN) this.direction = InputController.DIRECTIONS.DIR_UP;
        break;
    }
  }

  getDirection() {
    return this.direction;
  }
}