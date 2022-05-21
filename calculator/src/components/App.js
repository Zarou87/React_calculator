import React from "react";
import "./App.css";
import Display from "./Display";
import ButtonsContainer from "./ButtonsContainer";

export default class App extends React.Component {
  state = {
    result: 0,
    operatorOne: null,
    operatorTwo: null,
    operation: null,
  };

  isOperation(key) {
    return /[x|+|\-|/]/.test(key);
  }

  customSolver(state) {
    console.log("custom", state);
    const a = parseFloat(state.operatorOne);
    const b = parseFloat(state.operatorTwo);

    if (state.operation === "+") {
      return `${a + b}`;
    }
    if (state.operation === "-") {
      return `${a - b}`;
    }
    if (state.operation === "x") {
      return `${a * b}`;
    }
    if (state.operation === "/") {
      if (b === 0) {
        return "0";
      } else {
        return `${a / b}`;
      }
    }
  }

  updateState(prevState, key) {
    console.log(prevState);
    switch (key) {
      case "C":
        return {
          result: 0,
          operatorOne: null,
          operatorTwo: null,
          operation: null,
        };
      case ".":
        if (prevState.operation) {
          if (!prevState.operatorTwo) return { operatorTwo: "0." };
          if (prevState.operatorTwo.includes(".")) return {};
          return { operatorTwo: `${prevState.operatorTwo}.` };
        } else {
          if (!prevState.operatorOne) return { operatorOne: "0." };
          if (prevState.operatorOne.includes(".")) return {};
          return { operatorOne: `${prevState.operatorOne}.` };
        }
      case "=":
        if (prevState.operatorTwo) {
          return {
            result: this.customSolver(prevState),
            operatorOne: null,
            operatorTwo: null,
            operation: null,
          };
        } else {
          return {};
        }
      default:
        if (prevState.result !== 0) prevState.result = 0;
        if (this.isOperation(key)) {
          if (!this.state.operatorOne) return {};
          return { operation: key, operatorTwo: null };
        }

        if (prevState.operation) {
          if (prevState.operatorTwo === "0" && key === "0") return {};
          return {
            operatorTwo: prevState.operatorTwo
              ? prevState.operatorTwo + key
              : key,
          };
        } else {
          if (prevState.operatorOne === "0" && key === "0") return {};
          return {
            operatorOne: prevState.operatorOne
              ? prevState.operatorOne + key
              : key,
          };
        }
    }
  }

  handleClick = (key) => {
    this.setState(this.updateState(this.state, key));
  };

  render() {
    return (
      <div className="Calculator-container">
        <Display
          result={this.state.result}
          operation={`${this.state.operatorOne ? this.state.operatorOne : ""} ${
            this.state.operation ? this.state.operation : ""
          } ${this.state.operatorTwo ? this.state.operatorTwo : ""}`}
        />
        <ButtonsContainer clickHandler={this.handleClick} />
      </div>
    );
  }
}
