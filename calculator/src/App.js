import "./App.css";

function App() {
  const keys = [
    { key: 7, type: "number" },
    { key: 8, type: "number" },
    { key: 9, type: "number" },
    { key: "/", type: "operation" },
    { key: 4, type: "number" },
    { key: 5, type: "number" },
    { key: 6, type: "number" },
    { key: "x", type: "operation" },
    { key: 1, type: "number" },
    { key: 2, type: "number" },
    { key: 3, type: "number" },
    { key: "+/-", type: "operation" },
    { key: "C", type: "reset" },
    { key: 0, type: "number" },
    { key: ".", type: "number" },
    { key: "=", type: "operation" },
  ];

  function keyPress(key) {
    switch (key) {
      case "+":
        console.log("Suma");
        break;
      case "-":
        console.log("Resta");
        break;
      case "/":
        console.log("División");
        break;
      case ".":
        console.log("Decimal");
        break;
      case "x":
        console.log("Multiplicación");
        break;
      case "=":
        console.log("Solver");
        break;
      case "C":
        console.log("Reset");
        break;
      default:
        console.log("Add número");
    }
  }

  return (
    <div className="Calculator-container">
      <div className="Calculator-header">
        <span className="Calculator-operation">214124</span>
        <span className="Calculator-result">123</span>
      </div>
      <div className="Calculator-body ">
        {keys.map((k) => {
          return k.key === "+/-" ? (
            <div className="dual-operation" key={k.key}>
              <button
                className="Calculator-key left small operation"
                onClick={() => keyPress("+")}
              >
                +
              </button>
              <button
                className="Calculator-key right operation small"
                onClick={() => keyPress("-")}
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
              onClick={() => keyPress(k.key)}
            >
              {k.key}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
