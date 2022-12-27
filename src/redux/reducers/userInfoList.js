/* 구글 인증에서 가져온 이메일과 저장된 이메일을 비교하여
like 값을 저장, 또는 가져오는 리듀서 */
const initialState = [
  {
    userEmail: "aaaa@bbb.com",
    /* board의 id와 title을 가진 객체 */
    like: []
  }
];

function userInfoList (state = initialState, action) {
  switch(action.type) {
    case "ADD_USER_INFO":
      /* email 값만 받아오기, like = [] 생성 */
      const newUser = {
        userEmail: action.payload,
        like: []
      }
      /* 현재 state에 concat으로 이어주기 */
      return state.concat(newUser);
    case "TOGGLE_LIKE":
      /* board의 좋아요 버튼을 눌렀을 때 값 확인,
      1) userInfoList의 like 값: 해당 user가 좋아요 한 것 중 boardId, title를 배열로
      2) board의 like 값: 갯수를 출력하거나, userEmail을 배열로 다뤄서

      userEmail이 동일한 것으로 배열의 값을 수정 */

      /* 삼항 연산자를 연이어 쓰는 경우 */
      return state.map((userInfo) => (userInfo.userEmail == action.payload.userEmail ? {...userInfo, like: userInfo.like.find((boardLike) => boardLike.boardId == action.payload.boardId) ? userInfo.like : userInfo.like.concat({boardId: action.payload.boardId, title: action.payload.title})} : userInfo))
      /* like: userInfo.like.find((boardLike) => boardLike.boardId == action.payload.boardId) ? userInfo.like : userInfo.like.concat({boardId: action.payload.boardId, title: action.payload.title}) */
    default:
      return state;
  }
}

export const addUserInfo = (email) => ({type: "ADD_USER_INFO", payload: email})
export const addLikeBoards = (likeBoard) => ({type: "TOGGLE_LIKE", payload: likeBoard})

export default userInfoList;