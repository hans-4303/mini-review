import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HomeLink from "../components/HomeLink";
import { deleteBoard, viewBoard } from "../redux/reducers/board";

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

  const dispatch = useDispatch();

  /* 화면이 실행되자 마자 조회수를 1 올리기
  리덕스를 통해서 페이지의 id 값을 전달하고, 해당 값을 가진 board의 view를 올리기
  
  하위 페이지에서 호출할 줄 알았다 생각하긴 했지만 동작하고 있다. */
  useEffect(() => {
    dispatch(viewBoard(id))
  }, [])

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