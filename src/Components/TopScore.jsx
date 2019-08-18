import React from "react";
import PropTypes from "prop-types";

const TopScore = ({ topScore }) => (
  <span style={{ lineHeight: "40px" }}>Top score: {topScore}</span>
);

TopScore.propTypes = {
  topScore: PropTypes.string
};

export default TopScore;
