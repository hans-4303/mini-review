const initialState = null;

/* 다른 방법으로 데이터 관리
{userinfo: null, login: false}와 같이 객체로 나눠 사용해보기
키 값을 지정해주고, state는 스프레드 연산자로 펼쳐주기 */

/* 리듀서, 조건에 따라 실행해본다. switch, if문 */
function currentUser(state = initialState, action) {
    switch(action.type) {
      /* 비동기 내용은 기본 리듀서로 진행하기 어렵다. (미들웨어가 있어야 가능)
      이 경우 컴포넌트에서 실행하고 리듀서로 들고 오는 방법이 있다. */
      case "USER_LOGIN":
        /* 구글 인증을 통해서 가져온 값은 객체 형태를 가진다.
        1) 받아온 값을 그대로 넣어주는 방법
        2) 필요한 값만 골라서 넣어주는 방법(가능하다면 이쪽이 좋다.) */
        return action.payload;
      case "USER_LOG_OUT":
        return null;
      default:
        return state;
    }
}

/* 액션 함수, 호출할 때 특정 값을 넣으면 payload 키에 해당 값이 대입된다.
여기에서는 해당 유저라고 가정하고 다룬다. */
export const userLogin = (user) => ({type: "USER_LOGIN", payload: user})
export const userLogOut = () => ({type: "USER_LOG_OUT"})

export default currentUser;