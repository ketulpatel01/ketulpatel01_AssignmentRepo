import React from "react";
import Home from './Home';
import PickWinner from './PickWinner';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  return(
    <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pickwinner">Pick Winner</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/pickWinner" element={<PickWinner />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;