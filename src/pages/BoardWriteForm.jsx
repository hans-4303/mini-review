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

  const onChangeValue = (event) => {
    setBoard({...board, [event.target.name] : event.target.value})
  }

  const onAddBoard = () => {
    dispatch(addBoard(board));
    navigate(`/board`)
  }

  return (
    <div>
      <input type="text" name='title' value={board.title} onChange={(event) => {onChangeValue(event)}} />
      <p>{board.userEmail}</p>
      <textarea name='content' onChange={(event) => {onChangeValue(event)}}>{board.content}</textarea>
      <button>취소</button>
      <button onClick={() => {onAddBoard()}}>글쓰기완료</button>
    </div>
  )
}

export default BoardWriteForm