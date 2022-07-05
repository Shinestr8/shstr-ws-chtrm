import './App.css';
import { Chat } from './Chat';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Login } from './Login';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState("");
  const [color, setColor] = useState("");

  function handleUsername(u){
    setUser(u);
  }

  function handleColor(c){
    setColor(c);
  }


  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={handleUsername} setColor={handleColor}/>}/>
        <Route path="/chat" element={<Chat user={user} color={color}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
