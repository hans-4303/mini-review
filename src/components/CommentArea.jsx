import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../redux/reducers/guest";

const CommentArea = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => (state.currentUser));
  const [input, setInput] = useState('')

  /* 다른 해결방식, 이때는 useEffect를 다루고
  전역 state인 currentUser에 반응하도록 설정 */
  useEffect(() => {
    setInput(currentUser ? currentUser.email : '')
  }, [currentUser])

  const nameArea = useRef(null);
  const textArea = useRef(null);
    return (
    <div>
      <div>
        <label htmlFor="">이름</label>
        {/* 렌더링할 조건으로 '키'를 걸어서 해결한 경우,
        혹은 state를 걸어서 해결할 수도 */}
        {currentUser ? <input type="text" name="" id="" value={input} ref={nameArea} key={'el1'}/> : <input type="text" name="" id="" ref={nameArea} key={'el2'}/>}
        <label htmlFor="">작성할 내용</label>
        <textarea name="" id="" cols="30" rows="10" ref={textArea}></textarea>
        <button onClick={() => {dispatch(addGuest({name: nameArea.current.value, text: textArea.current.value}))}}>작성</button>
      </div>
    </div>
  );
};

export default CommentArea;

/* 생각 외로 guest 페이지에서 이 컴포넌트를 호출하면
조건에 따른 리렌더링이 일어나지 않고 있다. 왜?

생명주기 문제인 것 같긴 한데..... */