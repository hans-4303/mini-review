import './App.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Guest from './pages/Guest';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/guest' element={<Guest></Guest>}></Route>
        <Route path='/loginform' element={<LoginForm></LoginForm>}></Route>
      </Routes>
    </div>
  );
}

export default App;
