import { AxiosRequestConfig } from 'axios';
import React from 'react';
import './App.css';
import useAxios from './hooks/useAxios';
import useBeforeLeave from './hooks/useBeforeLeave';
import useClick from './hooks/useClick';
import useConfirm from './hooks/useConfirm';
import useFadeIn from './hooks/useFadeIn';
import useFullscreen from './hooks/useFullscreen';
import useHover from './hooks/useHover';
import useInput from './hooks/useInput';
import useNetwork from './hooks/useNetwork';
import useNotification from './hooks/useNotification';
import usePreventLeave from './hooks/usePreventLeave';
import useScroll from './hooks/useScroll';
import useTabs from './hooks/useTabs';
import useTitle from './hooks/useTitle';
import { filterAtSign, maxLen10 } from './utils';
import { content } from './utils/db';

// ? 객체 리터럴 대신 따로 뺀 이유는 무한 리랜더링이 발생하기 때문에
const RequestConfig: AxiosRequestConfig = {
  url: 'https://jsonplaceholder.typicode.com/todos/1',
};

type ResponseProps = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [inputValue1, onChangeInputValue1] = useInput<string>('', maxLen10);
  const [inputValue2, onChangeInputValue2] = useInput<string>('', filterAtSign);
  const { currentItem, changeItem } = useTabs(0, content);
  const changeTitle = useTitle('Loading....');
  const clickRef = useClick<HTMLHeadingElement>(() => alert('click'));
  const hoverRef = useHover<HTMLHeadingElement>(() => alert('hover'));
  const { enablePrevent, disablePrevent } = usePreventLeave();

  useBeforeLeave(() => console.log('[useBeforeLeave] 나가지 마세욧 :<'));

  const onConfirm = useConfirm(
    'useConfirm 메세지입니다.',
    () => console.log('확인'),
    () => console.log('취소')
  );

  const fadeIn1 = useFadeIn<HTMLParagraphElement>(2, 2);
  const fadeIn2 = useFadeIn<HTMLParagraphElement>(5, 4);

  const networkStatus = useNetwork((online) => console.log(online ? '온 라 인' : '오 프 라 인'));

  const { yPos } = useScroll();

  const { elementRef, triggerFull, exitFull } = useFullscreen<HTMLImageElement>((isFull) =>
    console.log(isFull ? 'Full' : 'Small')
  );

  const onNotification = useNotification('알림창 입니다.', { body: '알림 내용입니다.' });

  const { loading, data, refetch } = useAxios<ResponseProps>(RequestConfig);

  // useTitle Hook
  setTimeout(() => {
    changeTitle('App Title Changed by useTitle');
  }, 2000);

  return (
    <div className="container">
      <div>
        <h2>useScroll Hook</h2>
        <p style={{ position: 'fixed', top: 50, color: yPos > 400 ? 'red' : 'blue' }}>
          u s e S c r o l l
        </p>
      </div>

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

      <div>
        <h2>useFadeIn Hook</h2>
        <p {...fadeIn1}>H E L L O ~ !</p>
        <p {...fadeIn2}>HiHiHi~!~!~!~!~!~!~!</p>
      </div>

      <div>
        <h2>useNetwork Hook</h2>
        <p>{networkStatus ? 'Online' : 'Offline'}</p>
      </div>

      <div>
        <h2>useFullScreen</h2>
        <img
          ref={elementRef}
          alt="fullScreenImg"
          src="https://images.unsplash.com/photo-1616628950295-d3288bd7a96d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          onClick={exitFull}
          style={{ cursor: 'pointer' }}
        />
        <button onClick={triggerFull}>Make Fullscreen</button>
      </div>

      <div>
        <h2>useNotification</h2>
        <button onClick={onNotification}>알림 버튼</button>
      </div>

      <div>
        <h2>useAxios</h2>
        {loading ? '데이터 요청중........' : '데이터 요청 성공!!'}
        <button onClick={refetch}>데이터 가져오기</button>
        <p>{data && data.title}</p>
      </div>
    </div>
  );
}

export default App;
