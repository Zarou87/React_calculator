import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

export default class Display extends React.Component {
  static propTypes = {
    operation: PropTypes.string,
    result: PropTypes.string,
  };

  render() {
    return (
      <div className="calculator-display">
        <span className="display-operation"> {this.props.operation} </span>
        <span className="display-result"> {this.props.result} </span>
      </div>
    );
  }
}
