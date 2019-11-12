export const DIRECTIONS = {
  DIR_UP: "UP",
  DIR_DOWN: "DOWN",
  DIR_LEFT: "LEFT",
  DIR_RIGHT: "RIGHT",
}

export const DEFAULT_CONTROL_OPTIONS = {
  keyboard: [
    {
      keyCode: 38,
      label: "Up",
      direction: DIRECTIONS.DIR_UP,
    },
    {
      keyCode: 40,
      label: "Down",
      direction: DIRECTIONS.DIR_DOWN,
    },
    {
      keyCode: 37,
      label: "Left",
      direction: DIRECTIONS.DIR_LEFT,
    },
    {
      keyCode: 39,
      label: "Right",
      direction: DIRECTIONS.DIR_RIGHT,
    }
  ]
};

export class InputController {
  direction;
  options;

  constructor() {
    this.reset();
  }

  changeControls(options) {
    if (options) {
      this.options = {...this.options, ...options};
    }
  }

  reset() {
    this.direction = DIRECTIONS.DIR_RIGHT;
    this.options = {...DEFAULT_CONTROL_OPTIONS};
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
    const keyOption = this.options.keyboard.find( x => x.keyCode === key.keyCode);
    if (keyOption) {
      this.setDirection(keyOption.direction);
    }
  };

  setDirection(direction) {
    //  set new direction if not totally opposite to current direction
    switch (direction) {
      default:
      case DIRECTIONS.DIR_RIGHT:
        if (this.direction !== DIRECTIONS.DIR_LEFT) this.direction = DIRECTIONS.DIR_RIGHT;
        break;
      case DIRECTIONS.DIR_DOWN:
        if (this.direction !== DIRECTIONS.DIR_UP) this.direction = DIRECTIONS.DIR_DOWN;
        break;
      case DIRECTIONS.DIR_LEFT:
        if (this.direction !== DIRECTIONS.DIR_RIGHT) this.direction = DIRECTIONS.DIR_LEFT;
        break;
      case DIRECTIONS.DIR_UP:
        if (this.direction !== DIRECTIONS.DIR_DOWN) this.direction = DIRECTIONS.DIR_UP;
        break;
    }
  }

  getDirection() {
    return this.direction;
  }
}