const base ='bg-[transparent] border border-[#00F0FF] text-[#00F0FF] rounded-[16px] w-[80px] h-[110px] text-[32px] font-bold text-center'
import React, { useState, useEffect, useRef, useCallback } from 'react';

function DigitInputs({ n, onValueChange }) {
  const [digits, setDigits] = useState(new Array(n).fill(''));
  const inputsRef = useRef(new Array(n).fill(null));

  const handleChange = useCallback((index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // 只有当当前输入框有值时，才会根据输入或删除移动焦点
    if (value && index < n - 1) {
      inputsRef.current[index + 1].focus();
    } else if (!value && index > 0 && digits[index - 1]) {
      // 如果当前输入框为空，且前一个输入框有值，则聚焦到前一个输入框
      inputsRef.current[index - 1].focus();
    }
  }, [digits, n]);

  const handlePaste = useCallback((index, e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const newDigits = [...digits];

    for (let i = 0; i < pastedText.length && index + i < n; i++) {
      newDigits[index + i] = pastedText[i];
    }

    setDigits(newDigits);
    if (index + pastedText.length < n) {
      inputsRef.current[index + pastedText.length].focus();
    }
  }, [digits, n]);

  useEffect(() => {
    onValueChange(digits.join(''));
  }, [digits, onValueChange]);


  return (
    <div className='flex items-center gap-4'>
      {digits.map((digit, index) => (
        <input
          className={base}
          key={index}
          type="text" // 修改为text类型
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={(e) => handlePaste(index, e)}
          maxLength={1}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default DigitInputs;
