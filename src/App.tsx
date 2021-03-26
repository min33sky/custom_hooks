import React from 'react';
import './App.css';
import useClick from './hooks/useClick';
import useInput from './hooks/useInput';
import useTabs from './hooks/useTabs';
import useTitle from './hooks/useTitle';
import { filterAtSign, maxLen10 } from './utils';
import { content } from './utils/db';

function App() {
  const sayHello = () => alert('Hi :)');

  const [inputValue1, onChangeInputValue1] = useInput<string>('', maxLen10);
  const [inputValue2, onChangeInputValue2] = useInput<string>('', filterAtSign);
  const { currentItem, changeItem } = useTabs(0, content);
  const changeTitle = useTitle('Loading....');
  const ref = useClick<HTMLHeadingElement>(sayHello);

  setTimeout(() => {
    changeTitle('App Title Changed by useTitle');
  }, 1000);

  return (
    <div className="container">
      <div>
        <h2>useInput Hook</h2>
        <input
          type="text"
          value={inputValue1}
          placeholder="10자리까지 입력 가능합니다."
          onChange={onChangeInputValue1}
        />
        <input
          type="text"
          value={inputValue2}
          placeholder="@는 입력 불가능합니다."
          onChange={onChangeInputValue2}
        />
      </div>

      <div>
        <h2>useTabs Hook</h2>
        {content.map((item, idx) => (
          <button key={item.tab} onClick={() => changeItem(idx)}>
            {item.tab}
          </button>
        ))}
        {<p>{currentItem.content}</p>}
      </div>

      <div>
        <h2>useClick Hook</h2>
        <h3 ref={ref} style={{ cursor: 'pointer' }}>
          Click!
        </h3>
      </div>
    </div>
  );
}

export default App;
