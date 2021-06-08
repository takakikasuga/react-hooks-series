import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback } from 'react';

function App() {
  return (
    <>
      {/* <UseStateVer1></UseStateVer1> */}
      {/* <UseStateVer2></UseStateVer2> */}
      {/* <UseStateVer3></UseStateVer3> */}
      {/* <UseStateVer3_2></UseStateVer3_2> */}
      {/* <UseStateVer4></UseStateVer4> */}
      <UseStateVer4_2></UseStateVer4_2>
    </>
  );
}

const UseStateVer1 = () => {
  console.log('UseStateVer1コンポーネントが発火しました！')
  // count という state と setCount という count を更新する関数を定義。
  // 今回、useState に 10 を渡しているため count の初期値は 10 になる。
  const [count, setCount] = useState(10);

  const decrement = () => {
    // setCount に count - 1 を渡しているので、
    // decrement が実行される度に、count が 1 減る。
    setCount(count - 1);
  };

  const increment = () => {
    // setCount に count + 1 を渡しているので、
    // increment が実行される度に、count が 1 増える。
    setCount(count + 1);
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  );
}


const UseStateVer2 = () => {
  // count という state と setCount という count を更新する関数を定義。
  // 今回、useState に 10 を渡しているため count の初期値は 10 になる。
  const [count, setCount] = useState(10);

  const decrement = () => {
    // 引数に渡した関数（(currentCount) => currentCount - 1）の
    // 引数（currentCount）には現在の count が渡される。
    // 関数の戻り値が新しい count になるため、
    // decrement が実行される度に count が 1 減る。
    setCount(currentCount => currentCount - 1);
  };

  const increment = () => {
    // 引数に渡した関数（(currentCount) => currentCount + 1）の
    // 引数（currentCount）には現在の count が渡される。
    // 関数の戻り値が新しい count になるため、
    // increment が実行される度に count が 1 増える。
    setCount(currentCount => currentCount + 1);
  };

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  );
}

const UseStateVer3 = () => {
  const [vote, setVote] = useState({ kinoko: 0, takenoko: 0 });

  const voteKinoko = () => {
    // 現在の vote に、kinoko プロパティ（現在の vote.kinoko + 1）を
    // マージしたオブジェクトを setVote に渡す。
    // 例えば、vote が以下の状態であれば
    // { kinoko: 0, takenoko: 0 }
    // 以下のように更新される
    // { kinoko: 1, takenoko: 0 }
    setVote({ ...vote, kinoko: vote.kinoko + 1 });
  };

  const voteTakenoko = () => {
    // 現在の vote に、takenoko プロパティ（現在の vote.takenoko + 1）を
    // マージしたを setVote に渡す。
    // 例えば、vote が以下の状態であれば
    // { kinoko: 0, takenoko: 0 }
    // 以下のように更新される
    // { kinoko: 0, takenoko: 1 }
    setVote({ ...vote, takenoko: vote.takenoko + 1 });
  };

  return (
    <>
      <p>きのこ: {vote.kinoko}</p>
      <p>たけのこ: {vote.takenoko}</p>
      <button onClick={voteKinoko}>きのこ</button>
      <button onClick={voteTakenoko}>たけのこ</button>
    </>
  );
}

const UseStateVer3_2 = () => {
  const [vote, setVote] = useState({ kinoko: 0, takenoko: 0 });

  const voteKinoko = () => {
    // 以下のように state を更新してしまうと、React は state が
    // 更新されていないと判定するのでコンポーネントが再レンダーされない。
    vote.kinoko = vote.kinoko + 1;
    setVote(vote);
  };

  const voteTakenoko = () => {
    // 以下のように state を更新してしまうと、React は state が
    // 更新されていないと判定するのでコンポーネントが再レンダーされない。
    vote.takenoko = vote.takenoko + 1;
    setVote(vote);
  };

  vote.kinoko = vote.kinoko + 1;
  const newVote = { ...vote, kinoko: vote.kinoko + 1 };

  const foo = { a: 1 };
  const bar = { a: 1 };
  console.log(Object.is(foo, foo));//true
  console.log(Object.is(foo, bar));//false
  console.log(Object.is(vote, vote));//true
  console.log(Object.is(vote, newVote));//false

  return (
    <>
      <p>きのこ: {vote.kinoko}</p>
      <p>たけのこ: {vote.takenoko}</p>
      <button onClick={voteKinoko}>きのこ</button>
      <button onClick={voteTakenoko}>たけのこ</button>
    </>
  );
}

const UseStateVer4 = () => {
  const [items, setItems] = useState([{ name: "きのこ" }]);

  const addItem = () => {
    const newItem = {
      name: Math.random() > 0.5 ? "きのこ" : "たけのこ"
    };
    // 現在の items に newItem を追加した配列を setItems に渡す。
    setItems([...items, newItem]);
  };

  // 引数 index は削除したい要素のインデックス
  const deleteItem = (index) => {
    // 現在の items から、引数 index と同じインデックスの要素を
    // 削除した配列を setItems に渡す。
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <>
      <button onClick={addItem}>「きのこ」か「たけのこ」を追加</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={() => deleteItem(index)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

const UseStateVer4_2 = () => {
  const [items, setItems] = useState([{ name: "きのこ" }]);

  const addItem = () => {
    const newItem = {
      name: Math.random() > 0.5 ? "きのこ" : "たけのこ"
    };
    // 以下のように state を更新してしまうと、React は state が
    // 更新されていないと判定するのでコンポーネントが再レンダーされない。
    items.push(newItem);
    setItems(items);
  };

  // 引数 index は削除したい要素のインデックス
  const deleteItem = (index) => {
    // 以下のように state を更新してしまうと、React は state が
    // 更新されていないと判定するのでコンポーネントが再レンダーされない。
    items.splice(index, 1);
    setItems(items);
  };

  return (
    <>
      <button onClick={addItem}>「きのこ」か「たけのこ」を追加</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={() => deleteItem(index)}>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
