import React from "react";
import PropTypes from "prop-types";
import { Container, Text } from "react-pixi-fiber";

const ScreenElement = ({ text, onClick, position, interactive }) => (
  <Container
    interactive={interactive}
    pointerdown={interactive ? onClick : undefined}
    cursor="pointer"
  >
    <Text
      anchor="0.5,1"
      position={position}
      style={{ fill: 0x61dafb, fontSize: 40, align: "center" }}
      text={text}
    />
  </Container>
);

ScreenElement.defaultProps = {
  interactive: true
};

ScreenElement.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  position: PropTypes.string.isRequired,
  interactive: PropTypes.bool
};

export default ScreenElement;
