import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Display from "./Display";
import ButtonsContainer from "./ButtonsContainer";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  state = {
    result: 0,
    operandOne: null,
    operandTwo: null,
    operation: null,
  };

  isOperation(key) {
    return /[x|+|\-|/]/.test(key);
  }

  customSolver(state) {
    console.log("custom", state);
    const a = parseFloat(state.operandOne);
    const b = parseFloat(state.operandTwo);

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
        toast.error("Error dividing by 0.");
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
          operandOne: null,
          operandTwo: null,
          operation: null,
        };
      case ".":
        if (prevState.operation) {
          if (!prevState.operandTwo) return { operandTwo: "0." };
          if (prevState.operandTwo.includes(".")) return {};
          return { operandTwo: `${prevState.operandTwo}.` };
        } else {
          if (!prevState.operandOne) return { operandOne: "0." };
          if (prevState.operandOne.includes(".")) return {};
          return { operandOne: `${prevState.operandOne}.` };
        }
      case "=":
        if (prevState.operandTwo) {
          return {
            result: this.customSolver(prevState),
            operandOne: null,
            operandTwo: null,
            operation: null,
          };
        } else {
          return {};
        }
      default:
        if (prevState.result !== 0) prevState.result = 0;
        if (this.isOperation(key)) {
          if (!this.state.operandOne) {
            toast.info("Type the first operand.");
            return {};
          }
          return { operation: key, operandTwo: null };
        }

        if (prevState.operation) {
          if (prevState.operandTwo === "0" && key === "0") return {};
          return {
            operandTwo: prevState.operandTwo ? prevState.operandTwo + key : key,
          };
        } else {
          if (prevState.operandOne === "0" && key === "0") return {};
          return {
            operandOne: prevState.operandOne ? prevState.operandOne + key : key,
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
        <ToastContainer />
        <Display
          result={this.state.result}
          operation={`${this.state.operandOne ? this.state.operandOne : ""} ${
            this.state.operation ? this.state.operation : ""
          } ${this.state.operandTwo ? this.state.operandTwo : ""}`}
        />
        <ButtonsContainer clickHandler={this.handleClick} />
      </div>
    );
  }
}
