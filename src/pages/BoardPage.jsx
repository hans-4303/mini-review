import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HomeLink from "../components/HomeLink";
import { deleteBoard } from "../redux/reducers/board";

const BoardPage = () => {
  const { id } = useParams();
  const boardList = useSelector((state) => state.board);

  /* 얘는 위쪽에서 불러온 state 중에서 찾는 내용,
  게시글의 id와 주소의 id까지 비교하는 건 동일 */
  const board = boardList.find((board) => board.boardId == id);

  /* 얘는 useSelector로 state를 부르고, 그 안에서 바로 find까지 주는 내용
  해당 게시글의 id와 주소의 id까지 비교 */
  const boardFind = useSelector((state) =>
    state.board.find((board) => board.boardId == id)
  );

  return (
    <div>
      {/* 결과 자체는 같다. */}
      <p>{board ? <BoardPrint board={board} /> : "없는 페이지입니다"}</p>
      <HomeLink></HomeLink>
    </div>
  );
};

export default BoardPage;

/* 호출될 컴포넌트 */
const BoardPrint = ({board}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteBoard = (id) => {
    dispatch(deleteBoard(id));
    navigate('/board')
  }

  const toModifyBoard = ({board}) => {
    navigate('/board/modifyform', {state: board})
  }

  return (
    <div>
      <p>{board.boardId}</p>
      <h2>{board.title}</h2>
      <button onClick={() => {toModifyBoard({board})}}>수정</button>
      <button onClick={() => {onDeleteBoard(board.boardId)}}>삭제</button>
      <p>{board.userEmail}</p>
      <p>{board.content}</p>
      <p>{board.view}</p>
      <p>{board.like}</p>
    </div>
  );
}