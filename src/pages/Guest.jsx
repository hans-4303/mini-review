import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLink from "../components/HomeLink";
import { addGuest } from "../redux/reducers/guest";
import CommentArea from "../components/CommentArea";

const Guest = () => {

  const guestList = useSelector((state) => (state.guest));
  
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

/* 왜 이쪽에서는 조건에 맞춰 리렌더링이 계속 되고
CommentArea라는 별도 컴포넌트는 리렌더링이 되지 않는지 */