import React from "react";
import PropTypes from "prop-types";

import "./OptionsGroup.css";

const OptionsGroup = ({ options, value, onChange }) => (
  <div className="OptionsGroup">
    {options.map(({ value: val, label }) => (
      <button
        key={val}
        className={value === val ? "selected" : ""}
        onClick={() => onChange(val)}
      >
        {label || val}
      </button>
    ))}
  </div>
);

OptionsGroup.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.bool.isRequired
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
      ]),
      label: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

export default OptionsGroup;
