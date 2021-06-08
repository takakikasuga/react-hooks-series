import logo from './logo.svg';
import './App.css';
import React, { useState, useContext, createContext, useReducer, useMemo } from "react";

function App() {
  return (
    <>
      <UseContext></UseContext>
      {/* <UseContextVer2></UseContextVer2> */}
      {/* <UseContextVer3></UseContextVer3> */}
      {/* <UseContextVer4></UseContextVer4> */}
      {/* <UseContextVer5></UseContextVer5> */}
      {/* <UseContextVer6></UseContextVer6> */}
      {/* <UseContextVer6></UseContextVer6> */}
    </>
  );
}

// // 01 - useContextで、Appから見てひ孫にあたるGreatGrandChildコンポーネントからMyContextの値を取得する
// // Context オブジェクト
const MyContext = createContext();
console.log(MyContext)

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

// // 02 - useContextを利用しない場合、AppからGreatGrandChildComponentに値を渡すためにはProp drillingを行う必要がある
// const UseContextVer2 = () => {
//   const [count, setCount] = useState(0);
//   const value = {
//     name: "soarflat",
//     handleClick: () => setCount((count) => count + 1)
//   };

//   return (
//     <div>
//       <p>count: {count}</p>
//       <Child2 value={value} />
//     </div>
//   );
// }

// // Child コンポーネント自体は value を利用しないが、GrandChild コンポーネントに
// // Props として渡すために、value を受け取る必要がある。
// function Child2({ value }) {
//   return <GrandChild2 value={value} />;
// }

// // GrandChild コンポーネント自体は value を利用しないが、GreatGrandChild コンポーネントに
// // Props として渡すために、value を受け取る必要がある。
// function GrandChild2({ value }) {
//   return <GreatGrandChild2 value={value} />;
// }

// function GreatGrandChild2({ value }) {
//   return (
//     <>
//       <p>{value.name}</p>
//       <button onClick={value.handleClick}>increment</button>
//     </>
//   );
// }

// // 03 - 複数のコンポーネントで共通利用するデータをContextで扱い、それをuseContextで取得する
// const LangContext = createContext();

// const UseContextVer3 = () => {
//   const [lang, setLang] = useState("JP");

//   return (
//     <>
//       <button onClick={() => setLang("JP")}>日本語</button>
//       <button onClick={() => setLang("EN")}>English</button>
//       <LangContext.Provider value={lang}>
//         <Header />
//         <Body />
//       </LangContext.Provider>
//     </>
//   );
// }

// function Header() {
//   const lang = useContext(LangContext);
//   const text = {
//     JP: "速習 React Hooks",
//     EN: "React Hooks Quick Start Guide"
//   };

//   return (
//     <header>
//       <h1>{text[lang]}</h1>
//     </header>
//   );
// }

// function Body() {
//   const lang = useContext(LangContext);
//   const text = {
//     JP: "useContext の利用例",
//     EN: "useContext Example"
//   };

//   return <p>{text[lang]}</p>;
// }


// // 04 - Contextの更新により不要な再レンダーが発生している例
// const CountContext = createContext();

// function countReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': {
//       return { count: state.count + 1 };
//     }
//     case 'DECREMENET': {
//       return { count: state.count - 1 };
//     }
//     default: {
//       return state;
//     }
//   }
// }

// function CountProvider({ children }) {
//   console.log(children)
//   const [state, dispatch] = useReducer(countReducer, { count: 0 });
//   const value = {
//     state,
//     dispatch
//   };

//   return (
//     // value（state か dispatch のどちらか）が更新したら、
//     // CountContext.Provider 内のすべての Consumer が再レンダーされる。
//     <CountContext.Provider value={value}>{children}</CountContext.Provider>
//   );
// }


// function Count() {
//   console.log('render Count');
//   // CountContext からは state のみを取得しているが、
//   // dispatch が更新されても再レンダーされる
//   const { state } = useContext(CountContext);

//   return <h1>{state.count}</h1>;
// }

// function Counter() {
//   console.log('render Counter');
//   // CountContext からは dispatch のみを取得しているが、
//   // state が更新されても再レンダーされる
//   const { dispatch } = useContext(CountContext);

//   return (
//     <>
//       <button onClick={() => dispatch({ type: 'DECREMENET' })}>-</button>
//       <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//     </>
//   );
// }

// const UseContextVer4 = () => {
//   return (
//     <CountProvider>
//       <Count />
//       <Counter />
//     </CountProvider>
//   );
// }

// // 05 - Contextオブジェクトを分割して、Contextの更新による不要な再レンダーを防ぐ
// const CountStateContext = createContext();
// const CountDispatchContext = createContext();

// function countReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': {
//       return { count: state.count + 1 };
//     }
//     case 'DECREMENT': {
//       return { count: state.count - 1 };
//     }
//     default: {
//       return state;
//     }
//   }
// }

// function CountProvider({ children }) {
//   const [state, dispatch] = useReducer(countReducer, { count: 0 });

//   // CountStateContext.Provider の value が更新したら、
//   // CountStateContext の値を取得している全ての Consumer が再レンダーされる。
//   // CountDispatchContext.Provider の value が更新したら、
//   // CountDispatchContext の値を取得している全ての Consumer が再レンダーされる。
//   return (
//     <CountStateContext.Provider value={state}>
//       <CountDispatchContext.Provider value={dispatch}>
//         {children}
//       </CountDispatchContext.Provider>
//     </CountStateContext.Provider>
//   );
// }

// function Count() {
//   console.log('render Count');
//   // state と dispatch を保持する Context オブジェクトが異なるので、
//   // dispatch が更新されてもこのコンポーネントは再レンダーされない。
//   const state = useContext(CountStateContext);

//   return <h1>{state.count}</h1>;
// }

// function Counter() {
//   console.log('render Counter');
//   // state と dispatch を保持する Context オブジェクトが異なるので、
//   // state が更新されてもこのコンポーネントは再レンダーされない。
//   const dispatch = useContext(CountDispatchContext);

//   return (
//     <>
//       <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
//       <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//     </>
//   );
// }

// const UseContextVer5 = () => {
//   return (
//     <CountProvider>
//       <Count />
//       <Counter />
//     </CountProvider>
//   );
// }

// // 06 - React.memoを利用して、Contextの更新による不要な再レンダーを防ぐ
// const CountContext = createContext();

// function countReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': {
//       return { count: state.count + 1 };
//     }
//     case 'DECREMENT': {
//       return { count: state.count - 1 };
//     }
//     default: {
//       return state;
//     }
//   }
// }

// function CountProvider({ children }) {
//   const [state, dispatch] = useReducer(countReducer, { count: 0 });
//   const value = {
//     state,
//     dispatch
//   };

//   return (
//     // value（state か dispatch のどちらか）が更新したら、
//     // CountContext.Provider 内のすべての Consumer が再レンダーされる。
//     <CountContext.Provider value={value}>{children}</CountContext.Provider>
//   );
// }

// function Count() {
//   console.log('render Count');
//   // CountContext からは state のみを取得しているが、
//   // dispatch が更新されても再レンダーされる
//   const { state } = useContext(CountContext);

//   return <h1>{state.count}</h1>;
// }

// function Counter() {
//   console.log('render Counter');
//   // CountContext からは dispatch のみを取得しているが、
//   // state が更新されても再レンダーされる
//   const { dispatch } = useContext(CountContext);

//   // CountContext.Provider の value の更新による Counter コンポーネントの
//   // 再レンダーは避けられない。そのため、このコンポーネントは CountContext から値を
//   // 取得するだけにして、メモ化したコンポーネントに取得した dispatch を渡すようにする。
//   return <DispatchButton dispatch={dispatch} />;
// }

// // dispatch を Props として受け取るコンポーネントをメモ化し、不要な再レンダーを防ぐ
// const DispatchButton = React.memo(({ dispatch }) => {
//   console.log('render DispatchButton');

//   return (
//     <>
//       <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
//       <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//     </>
//   );
// });

// const UseContextVer6 = () => {
//   return (
//     <CountProvider>
//       <Count />
//       <Counter />
//     </CountProvider>
//   );
// }

// 07 - useMemoを利用して、Contextの更新による不要な再レンダーを防ぐ例
// const CountContext = createContext();

// function countReducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': {
//       return { count: state.count + 1 };
//     }
//     case 'DECREMENT': {
//       return { count: state.count - 1 };
//     }
//     default: {
//       return state;
//     }
//   }
// }

// function CountProvider({ children }) {
//   const [state, dispatch] = useReducer(countReducer, { count: 0 });
//   const value = {
//     state,
//     dispatch
//   };

//   return (
//     // value（state か dispatch のどちらか）が更新したら、
//     // CountContext.Provider 内のすべての Consumer が再レンダーされる。
//     <CountContext.Provider value={value}>{children}</CountContext.Provider>
//   );
// }

// function Count() {
//   console.log('render Count');
//   // CountContext からは state のみを取得しているが、
//   // dispatch が更新されても再レンダーされる
//   const { state } = useContext(CountContext);

//   return <h1>{state.count}</h1>;
// }

// function Counter() {
//   console.log('render Counter');
//   // CountContext からは dispatch のみを取得しているが、
//   // state が更新されても再レンダーされる
//   const { dispatch } = useContext(CountContext);

//   // CountContext.Provider の value の更新による Counter コンポーネントの
//   // 再レンダーは避けられない。そのため dispatch を利用するレンダリング結果（計算結果）を
//   // メモ化し、不要な再レンダーを防ぐ。
//   return useMemo(() => {
//     console.log('rerender Counter');
//     return (
//       <>
//         <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
//         <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//       </>
//     );
//   }, [dispatch]);
// }

// const UseContextVer6 = () => {
//   return (
//     <CountProvider>
//       <Count />
//       <Counter />
//     </CountProvider>
//   );
// }


export default App;
