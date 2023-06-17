import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [inputNumbers, setInputNumbers] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumbers(event.target.value);
  };

  const game24 = (nums: number[]) => {
    const target = 24;
   // const operations = ["*", "/", "+", "-"];
    const operations = ["+", "-", "*", "/"];
    for (const op1 of operations) {
      for (const op2 of operations) {
        for (const op3 of operations) {
          const expression = `${nums[0]} ${op1} ${nums[1]} ${op2} ${nums[2]} ${op3} ${nums[3]}`;
          console.log("expression",expression); //1 * 2 * 3 * 4
          const result = eval(expression);
          console.log("result",result); //24
          if (result === target) {
            return expression;
          }
        }
      }
    }
    setErrorMessage("ไม่สามารถสร้างตัวเลข 24 ได้");
    return null; //กรณีทำให้เป็น 24 ไม่ได้
  };
  const calculateResult = () => {
    setErrorMessage("");
    setResult("");
    const numbers = inputNumbers.split(",").map((num) => num.trim());
    console.log(numbers);
    for (let i = 0; i < numbers.length; i++) {
      if (isNaN(Number(numbers[i]))) {
        //กรณีใส่ string อื่นที่ไม่ใช่ตัวเลข
        return setErrorMessage("กรุณาใส่ตัวเลข 1-9 เท่านั้น");
      } else if (numbers[i] === "") {
        //กรณีใส่ , เเล้วไม่เติมเลข หรือจัดformatผิด
        return setErrorMessage(
          "กรุณาใส่ตัวเลข 1-9 หรือใส่เครื่องหมาย , ให้ถูกต้อง"
        );
      }
    }

    const numbers1 = numbers.map((num) => parseFloat(num));
    console.log(numbers1);
    if (numbers.length !== 4) {
      //กรณีใส่เลขมากกว่าหรือน้อยกว่า4ตัว
      return setErrorMessage("กรุณาใส่ตัวเลขให้ครบ 4 ตัว");
    }

    for (const i of numbers1) {
      if (i > 9 || i < 1) {
        //กรณีใส่เลขที่เกิน 9 หรือน้อยกว่า 1
        return setErrorMessage("กรุณาใส่ตัวเลข 1-9");
      }
    }
    setResult(game24(numbers1));
  };
  return (
    <div className="container">
      <h1>ข้อที่2 เกมส์ 24</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="ใส่ตัวเลข (คั่นด้วยเครื่องหมาย ,)"
          value={inputNumbers}
          onChange={handleInputChange}
        />
        <button className="calculate-button" onClick={calculateResult}>
          ตรวจสอบ
        </button>
      </div>
      <h2>ผลลัพธ์ :</h2>
      <p className="error-message">{errorMessage}</p>
      <p className="result-message">{result}</p>
    </div>
  );
};

export default App;
