import React, { Component } from "react";

import Game from "./Game";
import SettingsPopup from "./SettingsPopup";
import TopScore from "./TopScore";
import TopScoreService from "../TopScoreService";

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

  onGameOver = topScore => {
    TopScoreService.setTopScore(topScore);
    this.forceUpdate();
  };

  render() {
    return (
      <React.Fragment>
        <Game
          settings={this.state.settings}
          showSettings={this.showSettings}
          onGameOver={this.onGameOver}
        />
        <TopScore topScore={TopScoreService.getTopScore()} />
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
