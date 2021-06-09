import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  return (
    <>
      {/* <UseEffect></UseEffect> */}
      <UseLayoutEffect></UseLayoutEffect>

    </>
  );
}

const UseEffect = () => {
  const [value, setValue] = useState(123);

  // 描画前に同期的に実行される
  useEffect(() => {
    setValue(Math.random());
  }, [])

  return <div>{value}</div>
};
const UseLayoutEffect = () => {
  const [value, setValue] = useState(123);

  // 描画前に同期的に実行される
  useLayoutEffect(() => {
    setValue(Math.random());
  }, [])

  return <div>{value}</div>
};


export default App;