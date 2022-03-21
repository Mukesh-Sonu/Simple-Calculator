import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState("");
  const [scientificMode, setScientificMode] = useState(false);
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    setFirstNumber(total);
    setSecondNumber("");
  }, [total]);

  useEffect(() => {
    if (secondNumber) {
      setResult(secondNumber);
    }
  }, [secondNumber]);

  const buttons = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    "Clear",
    "0",
    "=",
    "/"
  ];
  const operators = ["+", "-", "*", "/"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const scientificButtons = ["sign", "square", "sqrt"];

  const togglescientificMode = () => {
    setScientificMode(!scientificMode);
  };

  const commonScietificFunction = (type) => {
    let formula1;
    let formula2;
    if (type === "sign") {
      formula1 = firstNumber * -1;
      formula2 = secondNumber * -1;
    } else if (type === "square") {
      formula1 = firstNumber * firstNumber;
      formula2 = secondNumber * secondNumber;
    } else {
      formula1 = Math.sqrt(firstNumber);
      formula2 = Math.sqrt(secondNumber);
    }

    if (firstNumber && secondNumber === "") {
      setFirstNumber(formula1);
      setResult(isNaN(formula1) ? "Math Error" : formula1);
    } else {
      setSecondNumber(formula2);
      setResult(isNaN(formula2) ? "Math Error" : formula2);
    }
  };

  const updateScientificMode = (val) => {
    if (!firstNumber && !secondNumber && val) return;
    commonScietificFunction(val);
  };

  const otherOperations = (val) => {
    if (val === "=") {
      if (firstNumber && secondNumber && operator) {
        let output = basicMathfunction(firstNumber, secondNumber, operator);
        setTotal(output);
        setResult(output.toString());
      }
    } else {
      // This else statement is to handle, when "Clear" button is clicked

      setFirstNumber("");
      setSecondNumber("");
      setOperator("");
      setTotal("");
      setResult("");
    }
  };

  const basicMathfunction = (firstNum, secondNum, ops) => {
    //This function is to perform basic Math operations

    let fNum = parseInt(firstNum);
    let sNum = parseInt(secondNum);
    switch (ops) {
      case "+":
        return fNum + sNum;
      case "-":
        return fNum - sNum;
      case "*":
        return fNum * sNum;
      case "/":
        return fNum / sNum;
      default:
        return null;
    }
  };

  const updateOperator = (value) => {
    // This function updates the operator and result in state

    if (!firstNumber && !secondNumber && value) return;
    setOperator(value);
    if (firstNumber && secondNumber && operator) {
      let output = basicMathfunction(firstNumber, secondNumber, operator);
      setTotal(output);
      setResult(output.toString());
    }
  };

  const updateNumber = (num) => {
    // This function updates the first,second number and result in state

    if (firstNumber === "" && secondNumber === "" && num === "0") return;
    if (firstNumber && operator && !secondNumber && num === "0") return;
    if (firstNumber === "" || operator === "") {
      setFirstNumber((prevNum) => prevNum + num);
      setResult((prevNum) => prevNum + num);
    } else if (secondNumber === "" || operator !== "") {
      setSecondNumber((prevNum) => prevNum + num);
    }
  };

  const handleClick = (value) => {
    if (result === "Math Error" && value !== "Clear") return;
    if (numbers.includes(value)) {
      updateNumber(value);
    } else if (operators.includes(value)) {
      updateOperator(value);
    } else if (scientificButtons.includes(value)) {
      updateScientificMode(value);
    } else {
      //This else statement is to handle the "=" and "Clear" operations
      otherOperations(value);
    }
  };

  return (
    <div className={theme ? "lightMode" : "darkMode"}>
      <h1>Simple Calculator</h1>
      <div className="container">
        <div className="display">{result || "0"}</div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <button key={index} onClick={() => handleClick(button)}>
              {button}
            </button>
          ))}
        </div>
        <div className="scientificMode">
          <button onClick={togglescientificMode}>
            {`Scientific Mode ${scientificMode ? "(off)" : "(on)"}`}
          </button>
          {scientificMode && (
            <>
              {scientificButtons.map((button, index) => {
                return (
                  <button key={index} onClick={() => handleClick(button)}>
                    {button}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="mode">
        <button onClick={() => setTheme(true)}>Light</button>
        <button onClick={() => setTheme(false)}>Dark</button>
      </div>
    </div>
  );
}

export default App;
