import React, { Component } from "react";

import Game from "./Game";
import SettingsPopup from "./SettingsPopup";

export default class GameWrapper extends Component {
  state = {
    settings: {
      width: 800,
      height: 600,
      speed: 500,
      edgeWrapping: false
    },
    showSettingsPopup: false
  };

  showSettings = () => {
    this.setState({ showSettingsPopup: true });
  };

  hideSettings = () => {
    this.setState({ showSettingsPopup: false });
  };

  saveSettings = values => {
    this.setState({
      settings: values,
      showSettingsPopup: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <Game settings={this.state.settings} showSettings={this.showSettings} />
        {this.state.showSettingsPopup && (
          <SettingsPopup
            values={this.state.settings}
            saveSettings={this.saveSettings}
            hideSettings={this.hideSettings}
          />
        )}
      </React.Fragment>
    );
  }
}
