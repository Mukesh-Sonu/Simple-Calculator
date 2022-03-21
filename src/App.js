import "./App.css";
import { useEffect, useState } from "react";
import Buttons from "./components/Buttons";
import Display from "./components/Display";
import ScientificButtons from "./components/ScientificButtons";
import ThemeTogglers from "./components/ThemeTogglers";

const App = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [finalOutput, setFinalOutput] = useState("");
  const [operator, setOperator] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [scientificMode, setScientificMode] = useState(false);
  const [theme, setTheme] = useState(true);
  const [total, setTotal] = useState("");

  useEffect(() => {
    setFirstNumber(total);
    setSecondNumber("");
  }, [total]);

  useEffect(() => {
    if (secondNumber) {
      setFinalOutput(secondNumber);
    }
  }, [secondNumber]);

  const scientificButtons = ["sign", "square", "sqrt"];
  const operators = ["+", "-", "*", "/"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const toggleScientificMode = () => {
    setScientificMode((prevMode) => !prevMode);
  };

  const scientificCalculation = (type) => {
    if (!firstNumber && !secondNumber && type) return;

    let firstNumberOperation;
    let secondNumberOperation;
    if (type === "sign") {
      firstNumberOperation = firstNumber * -1;
      secondNumberOperation = secondNumber * -1;
    } else if (type === "square") {
      firstNumberOperation = firstNumber * firstNumber;
      secondNumberOperation = secondNumber * secondNumber;
    } else {
      firstNumberOperation = Math.sqrt(firstNumber);
      secondNumberOperation = Math.sqrt(secondNumber);
    }

    if (firstNumber && secondNumber === "") {
      setFirstNumber(firstNumberOperation);
      setFinalOutput(
        isNaN(firstNumberOperation) ? "Math Error" : firstNumberOperation
      );
    } else {
      setSecondNumber(secondNumberOperation);
      setFinalOutput(
        isNaN(secondNumberOperation) ? "Math Error" : secondNumberOperation
      );
    }
  };

  const equalAndClearHandler = (val) => {
    if (val === "=") {
      if (firstNumber && secondNumber && operator) {
        let output = basicMathfunction(firstNumber, secondNumber, operator);
        setTotal(output);
        setFinalOutput(output.toString());
      }
    } else {
      // This else statement is to handle, when "Clear" button is clicked

      setFirstNumber("");
      setSecondNumber("");
      setOperator("");
      setTotal("");
      setFinalOutput("");
    }
  };

  const basicMathfunction = (firstNum, secondNum, ops) => {
    //For basic Math operations

    let parsedFirstNumber = parseInt(firstNum);
    let parsedSecondNumber = parseInt(secondNum);
    switch (ops) {
      case "+":
        return parsedFirstNumber + parsedSecondNumber;
      case "-":
        return parsedFirstNumber - parsedSecondNumber;
      case "*":
        return parsedFirstNumber * parsedSecondNumber;
      case "/":
        return parsedFirstNumber / parsedSecondNumber;
      default:
        return null;
    }
  };

  const updateOperator = (value) => {
    // For updating the operator and result in state

    if (!firstNumber && !secondNumber && value) return;
    setOperator(value);
    if (firstNumber && secondNumber && operator) {
      let output = basicMathfunction(firstNumber, secondNumber, operator);
      setTotal(output);
      setFinalOutput(output.toString());
    }
  };

  const updateNumber = (num) => {
    // For updating the first,second number and result in state

    if (firstNumber === "" && secondNumber === "" && num === "0") return;
    if (firstNumber && operator && !secondNumber && num === "0") return;
    if (firstNumber === "" || operator === "") {
      setFirstNumber((prevNum) => prevNum + num);
      setFinalOutput((prevNum) => prevNum + num);
    } else if (secondNumber === "" || operator !== "") {
      setSecondNumber((prevNum) => prevNum + num);
    }
  };

  const handleClick = (value) => {
    if (finalOutput === "Math Error" && value !== "Clear") return;

    if (numbers.includes(value)) {
      updateNumber(value);
    } else if (operators.includes(value)) {
      updateOperator(value);
    } else if (scientificButtons.includes(value)) {
      scientificCalculation(value);
    } else {
      //This else statement is to handle the "=" and "Clear" operations
      equalAndClearHandler(value);
    }
  };

  return (
    <div className={theme ? "lightTheme" : "darkTheme"}>
      <h1>Simple Calculator</h1>
      <div className="container">
        <Display finalOutput={finalOutput} />
        <Buttons handleClick={handleClick} />
        <ScientificButtons
          scientificButtons={scientificButtons}
          scientificMode={scientificMode}
          toggleScientificMode={toggleScientificMode}
          handleClick={handleClick}
        />
      </div>
      <ThemeTogglers setTheme={setTheme} />
    </div>
  );
};

export default App;
