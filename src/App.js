import logo from './logo.svg';
import './App.css';
import React, { useState, useContext, createContext, useReducer, useMemo } from "react";

function App() {
  return (
    <>
      <UseContext></UseContext>
    </>
  );
}

// Context オブジェクト
const MyContext = createContext();

const UseContext = () => {
  const [count, setCount] = useState(0);
  const value = {
    name: "soarflat",
    handleClick: () => setCount((count) => count + 1)
  };

  return (
    <div>
      <p>count: {count}</p>
      {/* Provider。value プロパティの値を共有する。 */}
      <MyContext.Provider value={value}>
        <Child />
      </MyContext.Provider>
    </div>
  );
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  return <GreatGrandChild />;
}

function GreatGrandChild() {
  // Provider（<MyContext.Provider value={value}>）から
  // Context オブジェクトの値（value プロパティの値）を取得する。
  // そのため、context は
  // {
  //   name: 'soarflat',
  //   handleClick: () => setCount(count => count + 1)
  // }
  // になる。
  const context = useContext(MyContext);
  console.log(context)
  return (
    <>
      <p>{context.name}</p>
      <button onClick={context.handleClick}>increment</button>
    </>
  );
}


export default App;
