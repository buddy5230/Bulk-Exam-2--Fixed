import React, { useState } from "react";
import "./App.css";

//ข้อนี้ทำเสร็จไม่ทันนะครับ ยังไม่ได้จัดรูปเเบบoutput output ที่ได้ 6*3 = 18+4 = 22+2 = 24 ตัวอย่างต้องการ 6*3+4+2 เเต่คำตอบถูกอยู่ครับ
const App: React.FC = () => {
  const [inputNumbers, setInputNumbers] = useState<string>(""); // เก็บค่าตัวเลขที่ผู้ใช้ป้อน
  const [errorMessage, setErrorMessage] = useState<string>(""); // เก็บข้อความผิดพลาด
  const [result, setResult] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumbers(event.target.value);
  };

  const calculateResult = () => {
    setErrorMessage("");
    setResult(null);

    // แปลงข้อมูลเข้ารูปแบบตัวเลข
    const numbers = inputNumbers
      .split(",")
      .map((num) => parseFloat(num.trim()));

    // ตรวจสอบว่าป้อนตัวเลขหรือไม่
    const hasNonNumericInput = numbers.some((num) => isNaN(num));
    if (hasNonNumericInput) {
      setErrorMessage("กรุณาใส่ตัวเลข");
      return; // จบการทำงานของฟังก์ชันเมื่อมีข้อความผิดพลาด
    }

    // ตรวจสอบว่าตัวเลขมีไม่เกิน 4 ตัว
    if (numbers.length > 4) {
      setErrorMessage("กรุณาใส่ตัวเลขไม่เกิน 4 ตัว");
      return; // จบการทำงานของฟังก์ชันเมื่อมีข้อความผิดพลาด
    }

    // ตรวจสอบข้อตกลงเงื่อนไข 24
    const result = find24(numbers);
    if (result) {
      setResult(result);
    } else {
      setErrorMessage("ชุดตัวเลขนี้ไม่สามารถทำให้ได้ผลลัพธ์เป็น 24");
    }
    console.log("result", result);
  };

  const find24 = (nums: number[]): string | null => {
    if (nums.length === 1) {
      //ตรวจสอบว่าค่าตัวเลขนั้นใกล้เคียงกับ 24 หรือไม่
      return Math.abs(nums[0] - 24) < 0.01 ? "24" : null;
    }

    const operators = ["/", "*", "+", "-"];

    for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
        if (i !== j) {
          const num1 = nums[i];
          const num2 = nums[j];

          for (const op of operators) {
            const expression = `${num1}${op}${num2}`; //สร้างรูปเเบบสมการต่างๆ
            console.log("expression", expression);
            const result = evaluateExpression(expression);
            if (result !== null) {
              const rest = nums.filter(
                (num, index) => index !== i && index !== j
              );
              const subResult = find24([result, ...rest]);

              if (subResult !== null) {
                return `${expression} = ${subResult}`;
              }
            }
          }
        }
      }
    }

    return null;
  };

  const evaluateExpression = (expression: string): number | null => {
    //คำนวณผลลัพธ์จากสมการที่กำหนด
    try {
      const result = eval(expression);
      return Number.isFinite(result) ? result : null;
    } catch {
      return null;
    }
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {result && <p className="result-message">{result}</p>}
    </div>
  );
};

export default App;
