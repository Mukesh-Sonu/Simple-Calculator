import "./App.css";

import { useState } from "react";
function App() {
  const [displayValue, setDisplayValue] = useState("");

  const operators = ["+", "-", "*", "/"];

  const clickedValues = (value) => {
    // this condition removes the duplicate operators and avoids displaying operator for the first time
    if (
      (operators.includes(value) && displayValue === "") ||
      (operators.includes(value) && operators.includes(displayValue.slice(-1)))
    )
      return;

    setDisplayValue(displayValue + value);
  };

  //looping Numbers...
  const numbers = () => {
    const numArr = [];
    for (let i = 1; i < 10; i++) {
      numArr.push(
        <button key={i} onClick={() => clickedValues(i.toString())}>
          {i}
        </button>
      );
    }
    return numArr;
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">{displayValue}</div>

        <div className="split">
          <div className="numbers">
            {numbers()}
            <button onClick={() => clickedValues("clr")}>Clear</button>
            <button onClick={() => clickedValues("0")}>0</button>
            <button onClick={() => clickedValues("=")}>=</button>
          </div>
          <div className="operators">
            <button onClick={() => clickedValues("+")}>Add (+)</button>
            <button onClick={() => clickedValues("-")}>Sub (-)</button>
            <button onClick={() => clickedValues("*")}>Mul (*)</button>
            <button onClick={() => clickedValues("/")}>Div (/)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
