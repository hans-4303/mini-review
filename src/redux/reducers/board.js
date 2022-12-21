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
    default:
      return state;
  }
}

export const deleteBoard = (id) => ({ type: "DELETE_BOARD", payload: id });
export const modifyBoard = (board) => ({type: "MODIFY_BOARD", payload: board});

export default board;
