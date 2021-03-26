import React from 'react';
import './App.css';
import useClick from './hooks/useClick';
import useConfirm from './hooks/useConfirm';
import useHover from './hooks/useHover';
import useInput from './hooks/useInput';
import usePreventLeave from './hooks/usePreventLeave';
import useTabs from './hooks/useTabs';
import useTitle from './hooks/useTitle';
import { filterAtSign, maxLen10 } from './utils';
import { content } from './utils/db';

function App() {
  const [inputValue1, onChangeInputValue1] = useInput<string>('', maxLen10);
  const [inputValue2, onChangeInputValue2] = useInput<string>('', filterAtSign);
  const { currentItem, changeItem } = useTabs(0, content);
  const changeTitle = useTitle('Loading....');
  const clickRef = useClick<HTMLHeadingElement>(() => alert('click'));
  const hoverRef = useHover<HTMLHeadingElement>(() => alert('hover'));
  const { enablePrevent, disablePrevent } = usePreventLeave();

  const onConfirm = useConfirm(
    'useConfirm 메세지입니다.',
    () => console.log('확인'),
    () => console.log('취소')
  );

  setTimeout(() => {
    changeTitle('App Title Changed by useTitle');
  }, 2000);

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
        <h3 ref={clickRef} style={{ cursor: 'pointer' }}>
          Click!
        </h3>
      </div>

      <div>
        <h2>useHover Hook</h2>
        <h3 ref={hoverRef} style={{ cursor: 'pointer' }}>
          Hover!
        </h3>
      </div>

      <div>
        <h2>useConfirm Hook</h2>
        <button onClick={onConfirm}>클릭</button>
      </div>

      <div>
        <h2>usePreventLeave Hook</h2>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>Unprotect</button>
      </div>
    </div>
  );
}

export default App;
