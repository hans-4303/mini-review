import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HomeLink from "../components/HomeLink";
import { addLikeUser, deleteBoard, viewBoard } from "../redux/reducers/board";
import { addComment } from "../redux/reducers/comment";
import { addLikeBoards } from "../redux/reducers/userInfoList";

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

  /* comment state 들고 온 뒤 filter로 원하는 요소만 갖고 오기 */
  const comments = useSelector((state) => state.comments);
  const boardComments = comments.filter((comment) => (comment.boardId == board.boardId))
  /* const userEmail = useSelector((state) => state.currentUser.email)
  이대로면 currentUser를 무조건 접근하게 되고, 로그인 하지 않아도 글을 볼 수 있는 요구사항과 달라지며
  null 값을 참조하기 때문에 에러 발생
  user의 값이 null이라면 댓글은 달 수 없어야 한다. */
  const user = useSelector((state) => state.currentUser)

  const [commentText, setCommentText] = useState('');

  const onAddComment = () => {
    dispatch(addComment({boardId: board.boardId, userEmail: user.email, text: commentText}))
  }

  const onDeleteBoard = (id) => {
    dispatch(deleteBoard(id));
    navigate('/board')
  }

  const toModifyBoard = ({board}) => {
    navigate('/board/modifyform', {state: board})
  }

  /* 좋아요 메서드 */
  const onAddLike = () => {
    if(user) {
      dispatch(addLikeBoards({userEmail: user.email, boardId: board.boardId, title: board.title}))
      dispatch(addLikeUser({boardId: board.boardId, userEmail: user.email}))
    }
    else return alert("좋아요는 로그인 후에 할 수 있습니다");
  }

  return (
    <div>
      <p>{board.boardId}</p>
      <h2>{board.title}</h2>
      {/* 로그인한 유저가 있고, 해당 이메일이 맞을 때 접근하기 */}
      {user && user.email === board.userEmail ?
        <>
          <button onClick={() => {toModifyBoard({board})}}>수정</button>
          <button onClick={() => {onDeleteBoard(board.boardId)}}>삭제</button>
        </> :
      <p>NOT YET</p>}
      <p>{board.userEmail}</p>
      <p>{board.content}</p>
      <p>{board.view}</p>
      <p onClick={() => {onAddLike()}}>{board.like}</p>
      <hr></hr>
      {boardComments.length > 0 ? (boardComments.map((comment) => <CommentBox comment={comment}></CommentBox>)) : <p>코멘트가 없습니다</p>}
      {user ? <CommentInput commentText={commentText} setCommentText={setCommentText} onAddComment={onAddComment}></CommentInput> : <button onClick={() => {navigate('/loginform')}}>로그인해주세요</button>}
    </div>
  );
}

/* 댓글 상자 컴포넌트 */
const CommentBox = ({comment}) => {
  return (
    <div>
      <h4>{comment.userEmail}</h4>
      <p>{comment.text}</p>
    </div>
  );
}

/* 댓글 입력 컴포넌트 */
const CommentInput = ({commentText, setCommentText, onAddComment}) => {
  return (
    <div>
      <textarea name="" id="" cols="30" rows="10" value={commentText} onChange={(event) => {setCommentText(event.target.value)}}></textarea>
      <button onClick={() => {onAddComment()}}>코멘트 작성</button>
    </div>
  );
}