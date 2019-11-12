import React from "react";
import PropTypes from "prop-types";

import OptionsGroup from "./OptionsGroup";

import "./OptionsScreen.css";
import KeyboardOptionsGroup from "./KeyboardOptionsGroup";

const OptionsScreen = ({ values, onChange }) => (
  <div className="OptionsScreen">
    <div className="Option">
      <label>Board width</label>
      <OptionsGroup
        value={values.width}
        options={[
          {
            value: 640
          },
          {
            value: 720
          },
          {
            value: 800
          },
          {
            value: 880
          },
          {
            value: 960
          }
        ]}
        onChange={value => onChange("width", value)}
      />
    </div>
    <div className="Option">
      <label>Board height</label>
      <OptionsGroup
        value={values.height}
        options={[
          {
            value: 520
          },
          {
            value: 600
          },
          {
            value: 680
          },
          {
            value: 760
          },
          {
            value: 840
          }
        ]}
        onChange={value => onChange("height", value)}
      />
    </div>
    <div className="Option">
      <label>Initial snake speed</label>
      <OptionsGroup
        value={values.speed}
        options={[
          {
            value: 500,
            label: "Easy - 500"
          },
          {
            value: 300,
            label: "Normal - 300"
          },
          {
            value: 100,
            label: "Hard - 100"
          }
        ]}
        onChange={value => onChange("speed", value)}
      />
    </div>
    <div className="Option">
      <label>Edge wrapping</label>
      <OptionsGroup
        value={values.edgeWrapping}
        options={[
          {
            value: true,
            label: "Yes"
          },
          {
            value: false,
            label: "No"
          }
        ]}
        onChange={value => onChange("edgeWrapping", value)}
      />
    </div>
    <div className="Option">
      <label>Keyboard settings</label>
      <KeyboardOptionsGroup
        options={values.keyboard}
        onChange={value => onChange("keyboard", value)}
      />
    </div>
  </div>
);

OptionsScreen.propTypes = {
  values: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    speed: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    edgeWrapping: PropTypes.bool,
    keyboard: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func
};

export default OptionsScreen;
