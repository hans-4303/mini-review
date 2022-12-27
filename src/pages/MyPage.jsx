import React from 'react'
import { useSelector } from 'react-redux'
import HomeLink from '../components/HomeLink'

const MyPage = () => {
  const user = useSelector((state) => state.currentUser)
  const userInfo = useSelector((state) => state.userInfoList).find((info) => info.userEmail == user.email)

  return (
    <div>
      <div>
        {userInfo.userEmail}
        {userInfo.userEmail == user.email ? <p>OK</p> : <p>NOT YET</p>}
      </div>
      <HomeLink></HomeLink>
    </div>
  )
}

export default MyPage