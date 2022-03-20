import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [ops, setOps] = useState("");
  const [total, setTotal] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setFirstNum(total);
    setSecondNum("");
  }, [total]);

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
  const opArr = ["+", "-", "*", "/"];
  const numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const otherOperations = (val) => {
    if (val === "=") {
      if (firstNum && secondNum && ops) {
        let output = basicfun(firstNum, secondNum, ops);
        setTotal(output);
        setResult(output.toString());
      }
    } else {
      setFirstNum("");
      setSecondNum("");
      setOps("");
      setTotal("");
      setResult("");
      return;
    }
  };

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

  const updateOp = (operator) => {
    setOps(operator);
    if (firstNum && secondNum && ops) {
      let output = basicfun(firstNum, secondNum, ops);
      setTotal(output);
      setResult(output.toString());
    }
  };

  const updateNum = (num) => {
    if (firstNum === "" || ops === "") {
      setFirstNum((prevNum) => prevNum + num);
      setResult((prevNum) => prevNum + num);
    } else if (secondNum === "" || ops) {
      setSecondNum((prevNum) => prevNum + num);
      setResult(num);
      return;
    }
  };

  console.log(firstNum, "Fir");
  console.log(ops, "ops");
  console.log(secondNum, "Sec");
  console.log(total, "Total");

  const clickedValues = (value) => {
    if (numArr.includes(value)) {
      updateNum(value);
    } else if (opArr.includes(value)) {
      updateOp(value);
    } else {
      otherOperations(value);
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
