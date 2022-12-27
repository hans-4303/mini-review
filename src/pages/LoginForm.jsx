import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { userLogin } from "../redux/reducers/currentUser";
import { addUserInfo } from "../redux/reducers/userInfoList";


/* firebase.js를 전역으로 쓰지 않는다면 아마 이렇게,
getAuth에서도 app을 인수로 넣어준다. */
/* import { app } from '../database/firebase'; */

const LoginForm = () => {
  /* 로그인했을 때 userInfo 값이 있는지 확인하기 위해 useInfoList 호출해보기,
  이때 기본 리덕스는 데이터가 저장되지 않아서 호출했다. */
  const userInfoList = useSelector((state) => state.userInfoList)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* 이메일과 비밀번호를 가져올 state들
  -> 내가 개선한다면 차라리 useRef를 적용할 것 같다. */
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  /* 로그인했을 때 userInfo 값이 있는지 확인하는 메서드
  값이 없다면 addUserInfo를 통해서 추가하기 */
  const checkUserInfo = (email) => {
    const checkUser = userInfoList.find((info) => (info.userEmail == email));
    if(!checkUser) {
      dispatch(addUserInfo(email))
    }
    /* return (checkUser ? '' : dispatch(addUserInfo(email))); */
  }

  /* 회원가입을 위한 함수 */
  const signUpUser = () => {
    const auth = getAuth(/* app */);
    /* getAuth 메서드는 파이어베이스 앱에서 인증 부분을 받아온다. */
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          alert("이미 사용하고 있는 이메일입니다");
        } else if (errorCode == "auth/weak-password") {
          alert("비밀번호가 안전하지 못합니다");
        }
      });
  };

  /* 굳이 onSubmit에 연결할 함수까지 필요했을까? */
  const signInUser = (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch(userLogin(user));
        // ...
        /* 여기서 호출 */
        checkUserInfo(email)
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode == "auth/user-not-found") {
          alert("등록되지 않은 유저입니다");
        } else if (errorCode == "auth/wrong-password") {
          alert("잘못된 비밀번호입니다");
        }
      });
  };

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
        dispatch(userLogin(user));
        /* 구글 로그인 */
        checkUserInfo(user.email)
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <Form
        onSubmit={(event) => {
          signInUser(event);
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>

      {/* 구글로 로그인 */}
      <Button
        onClick={() => {
          signUpUser();
        }}
      >
        위 이메일과 비밀번호로 회원가입
      </Button>
      <Button
        onClick={() => {
          googleLogin();
        }}
      >
        구글로 로그인
      </Button>

      {email}
      {password}
    </div>
  );
};

export default LoginForm;
