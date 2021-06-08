import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';

function App() {
  return (
    <>
      {/* <UseRef></UseRef> */}
      {/* <UseRefVer2></UseRefVer2> */}
      {/* <UseRefVer3></UseRefVer3> */}
      <UseRefVer4></UseRefVer4>
    </>
  );
}

const UseRef = () => {
  const [count, setCount] = useState(10);
  // useRef に 0 を渡しているので、prevCountRef.current の初期値は 0
  const prevCountRef = useRef(0);

  useEffect(() => {
    // ref オブジェクトが更新されてもコンポーネントは再レンダーされない。
    console.log(prevCountRef)
    prevCountRef.current = count;
    console.log(prevCountRef)
  });

  return (
    <>
      <p>
        現在のcount: {count}, 前回のcount: {prevCountRef.current}
      </p>
      <p>前回のcountより{prevCountRef.current > count ? '小さい' : '大きい'}</p>
      <button onClick={() => setCount(Math.floor(Math.random() * 11))}>
        update
      </button>
    </>
  );
};
const UseRefVer2 = () => {
  const [count, setCount] = useState(0);
  // 初回レンダーかどうかのフラグ
  const isInitialRender = useRef(true);

  // isInitialRender.current を更新する副作用
  useEffect(() => {
    if (isInitialRender.current) {
      // ref オブジェクトが更新されてもコンポーネントは再レンダーされない。
      console.log(isInitialRender)
      isInitialRender.current = false;
      console.log(isInitialRender)
    }
  });
  console.log('レンダリングを走らせます。')
  return (
    <>
      {/* count が更新されるまで、「初回レンダー」が表示される。 */}
      <p>{isInitialRender.current ? "初回レンダー" : "再レンダー"}</p>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};

const UseRefVer3 = () => {
  const [count, setCount] = useState(0);
  // 初回レンダーかどうかのフラグ
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      // isInitialRender は state なので、
      // isInitialRender を更新したら再レンダーされる。
      console.log(isInitialRender)
      setIsInitialRender(false);
    }
  }, [isInitialRender]);
  console.log('レンダリングを走らせます。')
  console.log(isInitialRender)

  return (
    <>
      {/* レンダー後に副作用が実行され、isInitialRender が false に
      更新されるので、「初回レンダー」は表示されない。 */}
      <p>{isInitialRender ? "初回レンダー" : "再レンダー"}</p>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

export const UseRefVer4 = () => {
  const inputEl = useRef(null);
  const onClick = () => {
    console.log(inputEl.current)
    console.log(inputEl)
    if (!inputEl.current) return;

    inputEl.current.focus();
  };

  return (
    <>
      {/* ref 属性に inputEl を指定することで、inputEl.current で DOM にアクセスできる */}
      <input ref={inputEl} type="text" />
      <button onClick={onClick}>input要素をフォーカスする</button>
    </>
  );
};



export default App;