import { Link } from 'react-router-dom'

import React from 'react'

const HomeLink = () => {
  /* 로그인 값 확인할 임시 상수 */
  const login = false;

  return (
    <div className='home-link'>
    {login ?
        /* 로그인 했을 때 보이는 화면
        단, 관리자 페이지는 홈페이지 주인만 보이기 */
        <div>
            <Link>포스트</Link>
            <Link>방명록</Link>
            <Link>관리자페이지</Link>
            <Link>마이페이지</Link>
            <Link>로그아웃</Link>
        </div> : 
        /* 로그인 되어 있지 않을 때 보여지는 링크 */
        <div>
            <Link>포스트</Link>
            <Link to='/guest'>방명록</Link>
            <Link to='/loginform'>로그인</Link>
        </div>}
    </div>
  )
}

export default HomeLink