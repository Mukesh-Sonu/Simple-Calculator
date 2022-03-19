import "./App.css";
import { useState } from "react";

function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [operator, setOperator] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState("");

  const buttonArr = [
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

  const basicfun = (firNum, secNum, opr) => {
    let fNum = parseInt(firNum);
    let sNum = parseInt(secNum);

    switch (opr) {
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
  const clickedValues = (value) => {
    if (
      (operators.includes(value) && result === "") ||
      (operators.includes(value) && operators.includes(result.slice(-1)))
    )
      return;
    if (firstNum === "" || (secondNum !== "" && !operators.includes(value))) {
      console.log(value, "baadu");
      setResult(value);
      setFirstNum(value);
    }
    if (secondNum === "") {
      setSecondNum(value);
    }
    if (operators.includes(value)) {
      if (firstNum && secondNum && operator) {
        console.log(firstNum, secondNum, operator);
        let output = basicfun(firstNum, secondNum, operator);
        setResult(output.toString());
        setTotal(output);
      }
      setOperator(value);
    }
    if (!operators.includes(value)) {
      console.log(value, "val");
      setResult(value);
    }

    if (value === "=") {
      setResult(total);
    }
  };

  return (
    <>
      <div className="container">
        <div className="display">{result || "0"}</div>
        <div className="buttons">
          {buttonArr.map((val, index) => (
            <button key={index} onClick={() => clickedValues(val)}>
              {val}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
