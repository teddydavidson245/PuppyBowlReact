import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PlayerList from './components/PlayersList';
import PlayerDetails from './components/SinglePlayer';
import AddPlayerForm from './components/NewPlayerForm';

function App() {
  return (
    <Router>
      <div id='app-body'>
      <nav id="navbar">
        
            <p><Link to="/">Home</Link></p>
          
            <p><Link to="/add">Add Player</Link></p>
            
        
            
          
        </nav>
        <Routes>
      <Route path="/" element={<PlayerList/>} />
      <Route path="/players/:id" element={<PlayerDetails/>} />
      <Route path="/add" element={<AddPlayerForm/>} />
    </Routes>
      </div>
    
  </Router>
  );
}

export default App;
