import React from 'react';

interface Card {
  value: number;
}

const JudgePoint24: React.FC<{ cards: Card[] }> = ({ cards }) => {
  const minV = 0.00000001;
  const numL: number[] = cards.map((card) => card.value);

  const judge = (nums: number[]): number | null => {
    if (nums.length === 1) {
      if (Math.abs(nums[0] - 24) <= minV) {
        return nums[0];
      }
      return null;
    } else {
      for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
          const a = nums[i];
          const b = nums[j];
          const val = [a + b, a - b, b - a, a * b, a / b, b / a];
          const copy = [...nums];
          copy.splice(i, 1);
          copy.splice(j, 1);
          for (const v of val) {
            copy.push(v);
            const result = judge(copy);
            if (result !== null) {
              return result;
            }
            copy.pop();
          }
        }
      }
      return null;
    }
  };

  const result = judge(numL);

  return (
    <div>
      {result !== null ? (
        <div>
          <h2>Result: {result}</h2>
          <p>Operator: {numL.join(", ")}</p>
        </div>
      ) : (
        <div>
          <h2>No solution found</h2>
        </div>
      )}
    </div>
  );
};

export default JudgePoint24;
