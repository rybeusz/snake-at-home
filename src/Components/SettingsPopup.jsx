import React, { Component } from "react";
import PropTypes from "prop-types";

import OptionsScreen from "./OptionsScreen";

import "./SettingsPopup.css";

export default class SettingsPopup extends Component {
  state = {
    values: this.props.values
  };

  onChange = (name, value) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  render() {
    const { values, hideSettings, saveSettings } = this.props;

    return (
      <div
        className="SettingsPopup"
        style={{
          minWidth: `${values.width}px`,
          minHeight: `${values.height}px`
        }}
      >
        <h1>Settings</h1>
        <button className="CloseButton" onClick={hideSettings}>
          &times;
        </button>
        <OptionsScreen values={this.state.values} onChange={this.onChange} />
        <button
          className="SaveButton"
          onClick={() => saveSettings(this.state.values)}
        >
          Save
        </button>
      </div>
    );
  }
}

SettingsPopup.propTypes = {
  values: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    speed: PropTypes.number,
    edgeWrapping: PropTypes.bool
  }),
  hideSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired
};
