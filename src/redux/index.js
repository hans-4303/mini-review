/* 리덕스 모듈을 하나로 묶고, 내보내는 index.js */

import { combineReducers } from 'redux'
import currentUser from './reducers/currentUser';
import guest from './reducers/guest';
import board from './reducers/board';
import comments from './reducers/comment';
import userInfoList from './reducers/userInfoList';

const rootReducer = combineReducers({
    currentUser,
    guest,
    board,
    comments,
    userInfoList
});

export default rootReducer;