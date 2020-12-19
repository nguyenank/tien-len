import React, { Component } from "react";
import PropTypes from "prop-types";

export default class StagingAreaButtons extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.currentPlayer === this.props.currentPlayer) {
      return false;
    }
    return true;
  }
  render() {
    const className =
      this.props.currentPlayer === this.props.playerID
        ? "button current-staging-area-btn"
        : "button staging-area-btn";
    return (
      <div className="center-container">
        <button
          className={className}
          key="sortStagingArea"
          onClick={() => this.props.sortStagingArea()}
        >
          Sort
        </button>
        <button
          className={className}
          key="clearStagingArea"
          onClick={() => this.props.clearStagingArea()}
        >
          Clear
        </button>
      </div>
    );
  }
}

StagingAreaButtons.propTypes = {
  currentPlayer: PropTypes.string,
  playerID: PropTypes.string,
  clearStagingArea: PropTypes.func,
  sortStagingArea: PropTypes.func,
};
