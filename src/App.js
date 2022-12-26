import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Guest from './pages/Guest';
import LoginForm from './pages/LoginForm';
import Board from './pages/Board';
import BoardPage from './pages/BoardPage';
import BoardModifyForm from './pages/BoardModifyForm';
import BoardWriteForm from './pages/BoardWriteForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/guest' element={<Guest></Guest>}></Route>
        <Route path='/loginform' element={<LoginForm></LoginForm>}></Route>
        <Route path='/board' element={<Board></Board>}></Route>
        <Route path='/board/:id' element={<BoardPage></BoardPage>}></Route>
        <Route path='/board/modifyform' element={<BoardModifyForm></BoardModifyForm>}></Route>
        <Route path='/board/writeform' element={<BoardWriteForm></BoardWriteForm>}></Route>
      </Routes>
    </div>
  );
}

export default App;
