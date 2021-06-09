import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

function App() {
  return (
    <>
      <UseEffect></UseEffect>
    </>
  );
}

const LIMIT = 60;
// カウントダウンをする（60 から 0 を表示する）コンポーネント。
function Timer() {
  // カウント
  const [timeLeft, setTimeLeft] = useState(LIMIT);

  // timeLeft をリセット（60に戻す）。
  const reset = () => {
    setTimeLeft(LIMIT);
  };

  // timeLeft を更新する。
  const tick = () => {
    console.log("tick");
    setTimeLeft((prevTime) => (prevTime === 0 ? LIMIT : prevTime - 1));
  };

  // setInterval で１秒毎に tick を実行するタイマーを作成する副作用。
  // 第２引数に [] を渡しているので、この副作用はレンダー後の１度しか実行されない。
  useEffect(() => {
    console.log("create Timer");
    const timerId = setInterval(tick, 1000);

    // クリーンアップ関数はコンポーネントがアンマウント、もしくは副作用が再度実行された時に呼ばれる。
    // ↑で作成したタイマー（timerId）は削除しない限り、コンポーネントがアンマウントされた後も延々と実行され続けてしまう。
    // そのため、コンポーネントがアンマウント、もしくは副作用が再度実行された時に clearInterval でタイマーを削除する。
    return () => {
      console.log("cleanup Timer");
      clearInterval(timerId);
    };
  }, []);

  return (
    <div>
      <p>time: {timeLeft}</p>
      <button onClick={reset}>reset</button>
    </div>
  );
}

const UseEffect = () => {
  // コンポーネントをレンダーするかどうかのフラグ
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>toggle Timer</button>

      {/* visible が true であれば Timer コンポーネントをレンダーする。
      false にすれば何もレンダーされない（Timer コンポーネントがアンマウントされる）ため、
      Timer コンポーネントの console.log('cleanup Timer'); などが実行される。 */}
      {visible ? <Timer /> : ""}
    </div>
  );
}

export default App;

