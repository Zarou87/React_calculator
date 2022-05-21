import React from "react";
import PropTypes from "prop-types";

import "./ButtonsContainer.css";

export default class ButtonsContainer extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  keys = [
    { key: "7", type: "number" },
    { key: "8", type: "number" },
    { key: "9", type: "number" },
    { key: "/", type: "operation" },
    { key: "4", type: "number" },
    { key: "5", type: "number" },
    { key: "6", type: "number" },
    { key: "x", type: "operation" },
    { key: "1", type: "number" },
    { key: "2", type: "number" },
    { key: "3", type: "number" },
    { key: "+/-", type: "operation" },
    { key: "C", type: "reset" },
    { key: "0", type: "number" },
    { key: ".", type: "number" },
    { key: "=", type: "operation" },
  ];

  render() {
    return (
      <div className="Calculator-body ">
        {this.keys.map((k) => {
          return k.key === "+/-" ? (
            <div className="dual-operation" key={k.key}>
              <button
                className="Calculator-key left small operation"
                onClick={() => this.props.clickHandler("+")}
              >
                +
              </button>
              <button
                className="Calculator-key right operation small"
                onClick={() => this.props.clickHandler("-")}
              >
                -
              </button>
            </div>
          ) : (
            <button
              className={`Calculator-key medium ${
                k.type === "number"
                  ? "number"
                  : k.type === "operation"
                  ? "operation"
                  : "reset"
              }`}
              key={k.key.toString()}
              onClick={() => this.props.clickHandler(k.key)}
            >
              {k.key}
            </button>
          );
        })}
      </div>
    );
  }
}
