import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLink from "../components/HomeLink";
import { addGuest } from "../redux/reducers/guest";

const Guest = () => {
  const dispatch = useDispatch();

  const guestList = useSelector((state) => (state.guest));
  const currentUser = useSelector((state) => (state.currentUser));

  /* name, text state를 input과 textarea로 보내겠다....
  고 하면 단순한 편집이 아니라 계속 렌더링되는 것을 뜻할텐데?
  
  state로 렌더링을 계속 만들기보다 차라리 useRef를 쓰는 게 낫다 생각된다. */

  /* 이렇게가 아니라
  const [name, setName] = useState('익명');
  const [text, setText] = useState(); */

  /* 이렇게 */
  const nameArea = useRef(null);
  const textArea = useRef(null);

  const CommentArea = () => {
    return (
      /* 어차피 currentUser도 전역에서 작동하는 state니까 useEffect는 필요없고,

      만약 별도의 컴포넌트로 만들려면

      const dispatch = useDispatch();

      const guestList = useSelector((state) => (state.guest));
      const currentUser = useSelector((state) => (state.currentUser));

      const nameArea = useRef(null);
      const textArea = useRef(null);
      
      이렇게 덧붙이면 끝이었을 듯 */
      currentUser ? (
        <div>
          <label htmlFor="">이름</label>
          <input type="text" name="" id="" value={currentUser.email} ref={nameArea} />
          <label htmlFor="">작성할 내용</label>
          <textarea name="" id="" cols="30" rows="10" ref={textArea}></textarea>
          <button onClick={() => {dispatch(addGuest({name: nameArea.current.value, text: textArea.current.value}))}}>작성</button>
        </div>) : (
        <div>
          <label htmlFor="">이름</label>
          <input type="text" name="" id="" placeholder="익명" ref={nameArea} />
          <label htmlFor="">작성할 내용</label>
          <textarea name="" id="" cols="30" rows="10" ref={textArea}></textarea>
          <button onClick={() => {dispatch(addGuest({name: nameArea.current.value, text: textArea.current.value}))}}>작성</button>
        </div>)
    );
  }

  return (
    <div>
      <h3>글을 쓰는 공간</h3>
        <CommentArea></CommentArea>
      <hr />
      <h3>글쓴 내용을 출력할 공간</h3>
        {guestList.map((guest) => <div><p>{guest.name}</p><p>{guest.text}</p></div>)}
      <HomeLink></HomeLink>
    </div>
  );
};

export default Guest;
