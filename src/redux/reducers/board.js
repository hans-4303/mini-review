const initialState = [
  {
    boardId: 1,
    userEmail: "abcd@aaa.com",
    title: "첫번째 게시글",
    content: "첫번째 글입니다",
    view: 0,
    like: 1,
  },
  {
    boardId: 2,
    userEmail: "efgh@bbb.com",
    title: "두번째 게시글",
    content: "두번째 글입니다",
    view: 0,
    like: 1,
  },
];

let boardId = 3;

function board(state = initialState, action) {
  switch (action.type) {
    case "DELETE_BOARD":
      /* state의 모든 요소 중 action.payload 안의 id가 같은지 비교하고,
      새로운 배열로 만들기 */
      const newBoardList = state.filter(
        (board) => board.boardId != action.payload
      );
      return newBoardList;
    case "MODIFY_BOARD":
      /* 수정된 board 값을 들고 오고, 값을 통채로 리스트에 바꿔서 넣어준다.
      배열의 개수는 바뀌지 않고, 값만 수정할 때 map을 사용해보기(배열의 길이만큼 반복되니까)

      수정할 id 값을 비교하고, board 값을 바꿔서 넣어준다. */
      
      const editBoard = state.map((board) => (board.boardId == action.payload.boardId ? action.payload : board))
      return editBoard;
    case "ADD_BOARD":
      /* 새로운 보드 값을 받아와서 boardId 값을 부여한 후에 추가하기
      payload를 통해서 Email, title, context를 추가하고,
      redux에서는 boardId, view, like를 추가한다. */
      const newBoard = {
        ...action.payload,
        boardId: boardId,
        view: 0,
        like: 0
      }
      boardId++;
      return state.concat(newBoard);
    case "UPDATE_VIEW":
      /* 보드 값을 받아오고, 해당 페이지 주소의 파라미터인 /:id와
      비교한 후에 해당 board의 id를 올리거나,
      조건이 맞지 않다면 내버려둔다. */
      const viewBoard = state.map((board) => (board.boardId == action.payload ? {...board, view: board.view + 1} : board))
      return viewBoard;
    default:
      return state;
  }
}

export const deleteBoard = (id) => ({ type: "DELETE_BOARD", payload: id });
export const modifyBoard = (board) => ({type: "MODIFY_BOARD", payload: board});
export const addBoard = (board) => ({type: "ADD_BOARD", payload: board})
export const viewBoard = (board) => ({type: "UPDATE_VIEW", payload: board})

export default board;
