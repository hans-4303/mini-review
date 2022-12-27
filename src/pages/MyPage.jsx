import React from 'react'
import { useSelector } from 'react-redux'
import HomeLink from '../components/HomeLink'

const MyPage = () => {
  const user = useSelector((state) => state.currentUser)
  const userInfo = useSelector((state) => state.userInfoList).find((info) => info.userEmail == user.email)

  return (
    <div>
      <h3>유저 페이지</h3>
      {userInfo ? <p>{userInfo.userEmail}</p> : ""}

      <h5>좋아요 리스트</h5>
      <ul>
        {userInfo.like.map((thing) => (
          <li key={thing.boardId}>{thing.title}</li>
        ))}
      </ul>
      <HomeLink></HomeLink>
    </div>
  )
}

export default MyPage