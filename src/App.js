import logo from './logo.svg';
import './App.css';
import React, { useState, useReducer, useCallback } from 'react';

function App() {
  return (
    <>
      {/* <UseReducer></UseReducer> */}
      {/* <UseReducerVer2></UseReducerVer2> */}
      {/* <UseReducerVer3></UseReducerVer3> */}
      {/* <UseReducerVer4></UseReducerVer4> */}
      <UseReducerVer5></UseReducerVer5>
    </>
  );
}

// 01 - useReducerの利用例
// 現在の state と action を受け取り、action に応じて更新した state を返す関数
function reducer(state, action) {
  switch (action.type) {
    case 'INCEREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

const UseReducer = () => {
  // useReducer の第２引数に { count: 0 } を渡しているので、
  // state の初期値は { count: 0 }
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>count: {state.count}</p>

      {/* { type: 'DECREMENT' } という action を送信する */}
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>

      {/* { type: 'INCEREMENT' } という action を送信する */}
      <button onClick={() => dispatch({ type: 'INCEREMENT' })}>+</button>

      {/* { type: 'RESET' } という action を送信する */}
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </>
  );
}

// 02 - useStateを利用した場合、stateの更新方法の数だけ、コンポーネントに state 更新関数を渡す必要がある
const Counter = ({ decrement, increment, reset }) => {
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </>
  );
};

const UseReducerVer2 = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount(currentCount => currentCount - 1);
  };

  const increment = () => {
    setCount(currentCount => currentCount + 1);
  };

  const reset = () => {
    setCount(() => 0);
  };

  return (
    <>
      <p>Count: {count}</p>
      <Counter decrement={decrement} increment={increment} reset={reset} />
    </>
  );
}

// 03 - useReducerを利用した場合、stateを更新する窓口はdispatchに集約するため、コンポーネントにはdispatchさえ渡せば良い
function reducer2(state, action) {
  switch (action.type) {
    case 'INCEREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

const Counter2 = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'INCEREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </>
  );
};

const UseReducerVer3 = () => {
  const [state, dispatch] = useReducer(reducer2, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <Counter2 dispatch={dispatch} />
    </>
  );
}

// 04 - dispatchは同一性が保たれるので、useCallbackでラップをせずにメモ化したコンポーネントに渡せる
function reducer3(state, action) {
  switch (action.type) {
    case 'INCEREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

const Counter3 = React.memo(({ dispatch }) => {
  console.log('render Counter');
  return (
    <>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'INCEREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </>
  );
});

const UseReducerVer4 = () => {
  const [state, dispatch] = useReducer(reducer3, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <Counter3 dispatch={dispatch} />
    </>
  );
}

// 05 - Counterコンポーネントの再レンダーを防ぐためには、Propsとして渡す関数を全てuseCallbackでラップする必要がある
const Counter4 = React.memo(({ decrement, increment, reset }) => {
  console.log('render Counter');
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </>
  );
});

const UseReducerVer5 = () => {
  const [count, setCount] = useState(0);

  const decrement = useCallback(() => {
    setCount(currentCount => currentCount - 1);
  }, [setCount]);

  const increment = useCallback(() => {
    setCount(currentCount => currentCount + 1);
  }, [setCount]);

  const reset = useCallback(() => {
    setCount(() => 0);
  }, [setCount]);

  return (
    <>
      <p>Count: {count}</p>
      <Counter4 decrement={decrement} increment={increment} reset={reset} />
    </>
  );
}


export default App;

