import React from "react";
import PropTypes from "prop-types";

import "./OptionsGroup.css";
import "./KeyboardOptionsGroup.css";

class KeyboardOptionsGroup extends React.Component {
  componentWillMount() {
    this.setState({
      options: [...this.props.options],
      keyToChange: null,
    })
  }

  componentWillUnmount() {
    this.stopListening();
  }

  getStringFromKeyCode(key) {
    let stringKey;
    //show arrows as unicode characters
    switch (key) {
      case 39:
        stringKey = "\u2192"
        break;
      case 40:
        stringKey = "\u2193";
        break;
      case 37:
        stringKey = "\u2190";
        break;
      case 38:
        stringKey = "\u2191";
        break;
      default:
        stringKey = String.fromCharCode((96 <= key && key <= 105)? key-48 : key);
    }
    return stringKey;
  }

  startChangingKey(keyToChange) {
    this.stopListening();
    this.setState({keyToChange}, () => this.startListening());
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
    //prevention of same keycodes for one direction
    const currentKeyCodes = this.state.options.map(x => x.keyCode).filter(x => x !== this.state.keyToChange.keyCode);
    if(currentKeyCodes.includes(key.keyCode)) return;

    this.setState(previousState => ({
      options: previousState.options.map(x => x.direction === previousState.keyToChange.direction ? {...x, keyCode: key.keyCode} : x),
      keyToChange: null,
    }), () => this.props.onChange(this.state.options));
    this.stopListening();
  };

  render() {
    const {keyToChange, options} = this.state;

    return (<center>
      <div className="OptionsGroup">
        {options.map(keyOption => (
        <center>
          <div>{keyOption.label}</div>
          <button
            key={keyOption.keyCode}
            className={keyToChange && keyToChange.label === keyOption.label ? "selected" : ""}
            onClick={() => this.startChangingKey(keyOption)}
          >
            {this.getStringFromKeyCode(keyOption.keyCode)}
          </button>
        </center>
        ))}
      </div>
      <div className={keyToChange ? "" : "hidden"}>Enter a key</div>
    </center>);
  }
}

KeyboardOptionsGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      keyCode: PropTypes.number.isRequired,
      label: PropTypes.string,
      direction: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default KeyboardOptionsGroup;
