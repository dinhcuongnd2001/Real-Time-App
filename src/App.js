
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom' 

import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<ChatRoom/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
