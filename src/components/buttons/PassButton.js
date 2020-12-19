import React, { Component } from "react";
import PropTypes from "prop-types";

export default class PassButton extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <button
        className="button"
        key="passTurn"
        onClick={() => this.props.passTurn()}
      >
        Pass Turn
      </button>
    );
  }
}

PassButton.propTypes = {
  passTurn: PropTypes.func,
};
