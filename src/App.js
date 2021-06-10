import logo from './logo.svg';
import './App.css';
import React, { useState, useMemo, useCallback } from 'react';

function App() {
  return (
    <>
      {/* <Parent></Parent> */}
      {/* <UseMemoParent></UseMemoParent> */}
      {/* <ParentFunc></ParentFunc> */}
      <ParentFuncCallback></ParentFuncCallback>
    </>
  );
}

// Parent コンポーネントが再レンダーする度に再レンダーされる
const Child = ({ count }) => {
  console.log("子要素がレンダリングされます。");
  return <p>子要素: {count}</p>;
}

const Parent = () => {
  console.log("親要素がレンダリングされます。");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>親要素（count1）：インクリメント</button>
      <button onClick={() => setCount2(count2 + 1)}>子要素（count2）：インクリメント</button>
      <p>親要素: {count1}</p>
      <Child count={count2} />
    </>
  );
}


// UseMemoParent コンポーネントが再レンダーに依存しない。
const UseMemoChild = React.memo(({ count }) => {
  console.log("子要素がレンダリングされます。");
  return <p>子要素: {count}</p>;
})

const UseMemoParent = () => {
  console.log("親要素がレンダリングされます。");
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <button onClick={() => setCount1(count1 + 1)}>親要素（count1）：インクリメント</button>
      <button onClick={() => setCount2(count2 + 1)}>子要素（count2）：インクリメント</button>
      <p>親要素: {count1}</p>
      <UseMemoChild count={count2} />
    </>
  );
}

const ChildFunc = React.memo(({ handleClick }) => {
  console.log("子要素がレンダリングされます。");
  return <button onClick={handleClick}>Child</button>;
});
const ParentFunc = () => {
  console.log("親要素がレンダリングされます。");

  const [count, setCount] = useState(0);
  // 関数はコンポーネントが再レンダーされる度に再生成されるため、
  // 関数の内容が同じでも、新しい handleClick と前回の handleClick は
  // 異なるオブジェクトなので、等価ではない。
  // そのため、コンポーネントが再レンダーされる。
  const handleClick = () => {
    console.log('click');
  };

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>親要素（count1）：インクリメント</button>
      <ChildFunc handleClick={handleClick} />
    </>
  );
}

const ChildFuncCallback = React.memo(({ handleClick }) => {
  console.log("子要素がレンダリングされます。");
  return <button onClick={handleClick}>Child</button>;
});
const ParentFuncCallback = () => {
  console.log("親要素がレンダリングされます。");

  const [count, setCount] = useState(0);
  // 関数をメモ化すれば、新しい handleClick と前回の handleClick は
  // 等価になる。そのため、Child コンポーネントは再レンダーされない。
  const handleClick = useCallback(() => {
    console.log('click');
  }, [])

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>親要素（count1）：インクリメント</button>
      <ChildFuncCallback handleClick={handleClick} />
    </>
  );
}


export default App;
