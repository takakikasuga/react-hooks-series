import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback } from 'react';

function App() {
  return (
    <>
      <UseState></UseState>

    </>
  );
}

const UseState = () => {
  // count という state と setCount という count を更新する関数を定義。
  // 今回、useState に 10 を渡しているため count の初期値は 10 になる。
  const [count, setCount] = useState(10);

  const decrement = () => {
    // setCount に count - 1 を渡しているので、
    // decrement が実行される度に、count が 1 減る。
    // 更新直後の値は変化しない
    // setCount(count - 1);
    // 関数型
    setCount(pre => pre - 1)
    console.log(count)
    if (count === 10) {
      console.log('countの値は10です')
    } else {
      console.log('countの値は10ではないです。')
    }
  };

  const increment = () => {
    // setCount に count + 1 を渡しているので、
    // increment が実行される度に、count が 1 増える。
    // 更新直後の値は変化しない
    // setCount(count + 1);
    // 関数型
    setCount(pre => pre + 1)
    console.log(count)
    if (count === 10) {
      console.log('countの値は10です')
    } else {
      console.log('１')
    }
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  );
}
export default App;
