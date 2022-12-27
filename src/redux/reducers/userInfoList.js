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
    default:
      return state;
  }
}

export default userInfoList;