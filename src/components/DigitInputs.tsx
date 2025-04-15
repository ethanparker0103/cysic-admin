import clsx from 'clsx';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { isMobile } from 'react-device-detect';

const base ='bg-[transparent] border border-[#FFFFFF73] text-[#fff] rounded-[16px] text-center'

function ensureArrayLength(value: any, n: any) {
    const splitArray = value.split('');
    // 如果数组长度小于n，用空字符串填充数组直到长度为n
    while (splitArray.length < n) {
      splitArray.push('');
    }
    // 如果数组长度大于n，截取前n个元素
    return splitArray.slice(0, n);
  }

  function DigitInputs({ n, value, onValueChange, className }: any) {
      // 使用传入的value作为初始值
      // const [digits, setDigits] = useState(value ? value.split('') : new Array(n).fill(''));

      const digits = value ? ensureArrayLength(value, n) : new Array(n).fill('')
      // const setDigits = (digits: any[])=>{}
    
      const inputsRef = useRef(new Array(n).fill(null));
    
      const handleChange = useCallback((index: number, value: string) => {
        const newDigits = [...digits];
        newDigits[index] = value;
        onValueChange(newDigits.join(''));
    
        if (value && index < n - 1) {
          inputsRef.current[index + 1].focus();
        }
      }, [digits, n, onValueChange]);
    
      const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          const newDigits = [...digits];
          
          // 找到最后一个有值的位置
          let lastFilledIndex = -1;
          for (let i = index; i >= 0; i--) {
            if (newDigits[i]) {
              lastFilledIndex = i;
              break;
            }
          }
    
          // 如果找到了有值的位置，则删除该位置的值
          if (lastFilledIndex !== -1) {
            newDigits[lastFilledIndex] = '';
            onValueChange(newDigits.join(''));
            inputsRef.current[lastFilledIndex].focus();
          }
        }
      }, [digits, onValueChange]);

      const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>, startIndex: number) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, ''); // 只保留数字
        const newDigits = [...digits];
        
        // 从起始位置开始填充粘贴的数字
        for (let i = 0; i < pasteData.length && startIndex + i < n; i++) {
            newDigits[startIndex + i] = pasteData[i];
        }
        
        onValueChange(newDigits.join(''));
        
        // 将焦点移动到最后一个填充的输入框
        const lastFilledIndex = Math.min(startIndex + pasteData.length, n - 1);
        inputsRef.current[lastFilledIndex].focus();
    }, [digits, n, onValueChange]);
    
      return (
        <div className='flex items-center gap-2'>
          {digits.map((digit: any, index: number) => (
            <input
              className={clsx(className, base)}
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e, index)}
              maxLength={1}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>
      );
    }
  
  export default DigitInputs;