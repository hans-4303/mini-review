import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLink from "../components/HomeLink";

const Board = () => {
  const boardList = useSelector((state) => (state.board))
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
            <td>{board.like}</td>
          </tr>
        ))}
      </table>
      <HomeLink></HomeLink>
    </div>
  );
};

export default Board;
