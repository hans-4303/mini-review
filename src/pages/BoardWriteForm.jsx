import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addBoard } from '../redux/reducers/board';

const BoardWriteForm = () => {
  const userEmail = useSelector((state) => state.currentUser.email);
  /* 미리 객체 형식으로 작성
  객체로 속성을 접근하면 결과값 undefined가 나온다. */
  const [board, setBoard] = useState({userEmail});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* 여러 input과 setter를 다룰 수 있는 메서드 */
  const onChangeValue = (event) => {
    setBoard({...board, [event.target.name] : event.target.value})
  }

  /* addBoard 액션 함수를 받아오고, payload에 board를 넘기기 */
  const onAddBoard = () => {
    dispatch(addBoard(board));
    navigate(`/board`)
  }

  return (
    <div>
      {/* 제목 */}
      <input type="text" name='title' value={board.title} onChange={(event) => {onChangeValue(event)}} />
      <p>{board.userEmail}</p>
      {/* 내용 */}
      <textarea name='content' onChange={(event) => {onChangeValue(event)}}>{board.content}</textarea>
      <button onClick={() => {navigate(`/board`)}}>취소</button>
      <button onClick={() => {onAddBoard()}}>글쓰기완료</button>
    </div>
  )
}

export default BoardWriteForm