import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

function App() {
  return (
    <>
      {/* <UseEffectVer1></UseEffectVer1> */}
      {/* <UseEffectVer2></UseEffectVer2> */}
      {/* <UseEffectVer3></UseEffectVer3> */}
      {/* <UseEffectVer4></UseEffectVer4> */}
      {/* <UseEffectVer5></UseEffectVer5> */}
      <UseEffectVer6_2></UseEffectVer6_2>
    </>
  );
}

const UseEffectVer1 = () => {
  const [count, setCount] = useState(0);

  // <p id="effectHook"></p> から取得したテキストをコンソールに出力する副作用。
  // 今回の場合、App コンポーネントが再レンダーされる度に実行される。
  // 副作用はコンポーネントのレンダー後に実行されるため、App コンポーネントの
  // レンダーで生成された <p id="effectHook"></p> も操作できる。
  // コンポーネントは state が更新される度にレンダーされるため、App コンポーネントは
  // count が更新される度に再レンダーされる。そのため、ボタンをクリックする度に
  // App コンポーネントは再レンダーされ、この副作用も実行される。
  useEffect(() => {
    console.log(document.getElementById("effectHook").innerText);
  });

  return (
    <div>
      <p id="effectHook">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>click</button>
    </div>
  );
}

const UseEffectVer2 = () => {
  // API から取得したデータ
  const [items, setItems] = useState([]);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // コンポーネントが初めてレンダーされた後に外部 API からデータを取得し、state を更新する副作用。
  // useEffect の第２引数（今回は空の配列）を指定しないと、items や isLoading が更新され、
  // コンポーネントが再レンダーされる度に API との通信が発生してしまう。
  // 今回はコンポーネントがレンダーされた後に、１度だけこの処理を実行したいので、第２引数に [] を渡している。
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=react"
      );

      console.log('async/awaitで待機後出力')
      console.log(result)
      setItems(result.data.hits);
      console.log('setItemsにセット')
      setIsLoading(false);
      console.log('setIsLoadingにセット')
    };

    fetchData();
  }, []);
  console.log('1')

  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
      {console.log('renderが終了')}
    </>
  );
}

const UseEffectVer3 = () => {
  // 外部 API から取得したデータ
  const [items, setItems] = useState([]);
  // input（入力欄）に入力した値
  const [inputValue, setInputValue] = useState("react");
  // 外部 API にリクエスト時に付与するクエリパラメータ
  const [query, setQuery] = useState(inputValue);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // 外部 API からデータを取得し、state を更新する副作用。
  // 第２引数に [query] を指定しているので、query が更新されたら実行される。
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );

      setItems(result.data.hits);
      setIsLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setQuery(inputValue);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
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

const UseEffectVer4 = () => {
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

const UseEffectVer5 = () => {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://hn.algolia.com/api/v1/search?query=redux',
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <ul>{!data.hits.length ? <p>データを取得中</p>
      :
      data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))
    }

    </ul>
  );
}

const UseEffectVer6 = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffectが実行されました')

    const interval = setInterval(() => {
      setCount(count => count + 1)
      console.log('カウントが1アップしました')
    }, 1000)

    return () => {
      // clearInterval(interval)
      console.log('コンポーネントがアンマウントしました')
    }
  }, [])
  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  );
}

const UseEffectVer6_2 = () => {
  const [display, setDisplay] = useState(true)

  return (
    <div className="App">
      <h1>Learn useEffect</h1>
      <button onClick={() => setDisplay(!display)}>Toggle</button>
      {display && <UseEffectVer6 />}
    </div>
  )
}

export default App;

