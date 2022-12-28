import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLink from "../components/HomeLink";

const Board = () => {
  const boardList = useSelector((state) => (state.board))
  /* 현재 유저를 state에서 따지기 */
  const user = useSelector((state) => (state.currentUser))
  const navigate = useNavigate();

  const toBoardPage = (id) => {
    navigate(`/board/${id}`);
  }

  return (
    <div>
      <table>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>조회수</th>
          <th>좋아요</th>
        </tr>
        {boardList.map((board) => (
          <tr>
            <td>{board.boardId}</td>
            <td onClick={()=>{toBoardPage(board.boardId)}}>{board.title}</td>
            <td>{board.userEmail}</td>
            <td>{board.view}</td>
            <td>{board.like.length}</td>
          </tr>
        ))}
        <tr>
          {/* 글쓰기를 위한 버튼, 글쓰기 페이지로 이동하기 */}
          {user && <button onClick={() => {navigate(`/board/writeform`)}}>글쓰기</button>}
        </tr>
      </table>
      <HomeLink></HomeLink>
    </div>
  );
};

export default Board;
