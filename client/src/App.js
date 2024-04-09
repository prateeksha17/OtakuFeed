import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './App.css';


function App() {
  
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
    
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
