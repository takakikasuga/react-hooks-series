import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo } from 'react';

function App() {
  return (
    <>
      {/* <UseMemo></UseMemo> */}
      <UseMemoVer2></UseMemoVer2>
    </>
  );
}

// 09 - useMemoを利用しない場合、コンポーネントを再レンダーする度に不要な再計算が発生する
const UseMemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 不要なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    console.log('double関数が実行されます。')
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // count2 を２倍にした値
  // double(count2) はコンポーネントが再レンダーされる度に実行されるため、
  // count1 を更新してコンポーネントが再レンダーされた時にも実行されてしまう。
  // そのため、count1 を更新してコンポーネントを再レンダーする時も時間がかかる。
  // count1 を更新しても doubledCount の値は変わらないため、count1 を更新した時に
  // double(count2) を実行する意味がない。したがって、不要な再計算が発生している状態である。
  // count1 が更新されてコンポーネントが再レンダーされた時は double(count2) が実行されないようにしたい。
  const doubledCount = double(count2);

  return (
    <>
      <h2>Increment count1</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment count1</button>

      <h2>Increment count2</h2>
      <p>
        Counter: {count2}, {doubledCount}
      </p>
      <button onClick={() => setCount2(count2 + 1)}>Increment count2</button>
    </>
  );
}

// 10 - useMemoで不要な再計算をスキップする
const UseMemoVer2 = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // 引数の数値を２倍にして返す。
  // 不要なループを実行しているため計算にかなりの時間がかかる。
  const double = count => {
    console.log('double関数が実行されます。')
    let i = 0;
    while (i < 1000000000) i++;
    return count * 2;
  };

  // count2 を２倍にした値をメモ化する。
  // 第２引数に count2 を渡しているため、count2 が更新された時だけ値が再計算される。
  // count1 が更新され、コンポーネントが再レンダーされた時はメモ化した値を利用するため再計算されない。
  const doubledCount = useMemo(() => {
    return double(count2)
  }, [count2]);

  return (
    <>
      <h2>Increment(fast)</h2>
      <p>Counter: {count1}</p>
      <button onClick={() => setCount1(count1 + 1)}>Increment(fast)</button>

      <h2>Increment(slow)</h2>
      <p>
        Counter: {count2}, {doubledCount}
      </p>
      <button onClick={() => setCount2(count2 + 1)}>Increment(slow)</button>
    </>
  );
}

export default App;
