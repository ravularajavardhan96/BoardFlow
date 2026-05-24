import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css'
import HomePage from '../components/HomePage.jsx';
import Boards from '../components/Boards.jsx';
import Board from '../components/Board.jsx';



function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path="/boards" element={<Boards/>}></Route>
          <Route path='/board/:id' element = {<Board/>}></Route>
        </Routes>
      </BrowserRouter>

      {/* <h1>This is a root</h1> */}

    </>
  )
}

export default App
