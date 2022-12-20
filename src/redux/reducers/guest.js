/* 초기 값 */
const initialState = [
  { guestId: 1, name: "green", text: "blah blah" },
  { guestId: 2, name: "123123", text: "blah blah blah" },
];

/* 값을 구분하기 위한 id */
let guestId = 3;

function guest(state = initialState, action) {
  switch (action.type) {
    case "ADD_GUEST":
      /* 방명록 값을 들고와서 리스트에 추가하는 형태
            들고오는 방명록의 값은 name, text
            만들어야 하는 값은 guestId

                1) initialState 안에 id를 만드는 방법
                2) initialState 바깥에 id를 만드는 방법
            
            만들어진 방명록 객체를 배열에 추가하기 위해서는 새로운 배열을 만들어서 추가
            이때 배열에 요소를 더해주는 concat 메서드 사용 */

      const newGuest = { ...action.payload, guestId: guestId };

      /* state가 아닌 바깥에서 진행된 내용이기 때문 */
      guestId++;

      /* 초기 배열에 새로운 요소를 덧붙여서 리턴 */
      const newGuestArray = state.concat(newGuest);

      return newGuestArray;
    default:
      return state;
  }
}

/* payload 키에 들어갈 값은 미리 파라미터로 놓기,
타입과 payload 키 및 값을 선언해두기 */
export const addGuest = (guest) => ({type: "ADD_GUEST", payload: guest});

export default guest;