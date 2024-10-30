const base ='bg-[transparent] border border-[#FFFFFF73] text-[#fff] rounded-[16px] w-[80px] h-[110px] text-[32px] font-bold text-center'
import React, { useState, useEffect, useRef, useCallback } from 'react';

function ensureArrayLength(value: any, n: any) {
    const splitArray = value.split('');
    // 如果数组长度小于n，用空字符串填充数组直到长度为n
    while (splitArray.length < n) {
      splitArray.push('');
    }
    // 如果数组长度大于n，截取前n个元素
    return splitArray.slice(0, n);
  }

function DigitInputs({ n, value, onValueChange }: any) {
    // 使用传入的value作为初始值
    // const [digits, setDigits] = useState(value ? value.split('') : new Array(n).fill(''));

    const digits = value ? ensureArrayLength(value, n) : new Array(n).fill('')
    // const setDigits = (digits: any[])=>{}
  
    const inputsRef = useRef(new Array(n).fill(null));
  
    const handleChange = useCallback((index: number, value: string) => {
      const newDigits = [...digits];
      newDigits[index] = value;
    //   setDigits(newDigits);
      onValueChange(newDigits.join('')); // 实时将新值回调给父组件
  
      // 只有当当前输入框有值时，才会根据输入或删除移动焦点
      if (value && index < n - 1) {
        inputsRef.current[index + 1].focus();
      } else if (!value && index > 0 && digits[index - 1]) {
        // 如果当前输入框为空，且前一个输入框有值，则聚焦到前一个输入框
        inputsRef.current[index - 1].focus();
      }
    }, [n, onValueChange]);
  
    const handlePaste = useCallback((index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const newDigits = [...digits];
      for (let i = 0; i < pastedText.length && index + i < n; i++) {
        newDigits[index + i] = pastedText[i];
      }
    //   setDigits(newDigits);
      onValueChange(newDigits.join('')); // 实时将新值回调给父组件
  
      if (index + pastedText.length < n) {
        inputsRef.current[index + pastedText.length].focus();
      }
    }, [n, onValueChange]);
  
    // 不再需要这个useEffect，因为handleChange已经实时更新了父组件的状态
    // useEffect(() => {
    //   onValueChange(digits.join(''));
    // }, [digits, onValueChange]);
  
    return (
      <div className='flex items-center gap-4'>
        {digits.map((digit: any, index: number) => (
          <input
            className={base}
            key={index}
            type="text"
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