import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
/* 웹을 사용할 때 파이어베이스를 들고 오기 위해 import */
/* import { app } from './database/firebase'; */

/* 앱 전역에서 계속 실행되게 해주려면?

js, css를 들고 올 때 파일 전체를 import 해오는 경우,
전체 파일에 내용이 적용될 수 있다고?
-> 아마 최상위인 App.js나 index.js라서 해당되는 것 아닐까 */
import './database/firebase'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
