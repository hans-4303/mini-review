import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { modifyBoard } from "../redux/reducers/board";

const BoardModifyForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [board, setBoard] = useState(location.state)

  const onChangeValue = (event) => {
    setBoard({...board, [event.target.name]: event.target.value});
  }

  const onModifyBoard = () => {
    dispatch(modifyBoard(board));
    navigate(`/board/${board.boardId}`)
  }

  return (
    <div>
      <p>{board.boardId}</p>
      <h2>{board.title}</h2>
      <input type="text" name="title" value={board.title} onChange={(event) => {onChangeValue(event)}} />
      <button onClick={() => {onModifyBoard()}}>수정 완료</button>
      {/* <button
        onClick={() => {
          onDeleteBoard(board.boardId);
        }}
      >
        삭제
      </button> */}
      <p>{board.userEmail}</p>
      <p>{board.content}</p>
      <input type="text" name='content' value={board.content} onChange={(event) => {onChangeValue(event)}}></input>
      <span>조회수 {board.view}</span>
      <span>좋아요 {board.like}</span>
    </div>
  );
};

export default BoardModifyForm;
