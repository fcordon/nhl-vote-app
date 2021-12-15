import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import Stats from './pages/Stats'

const Main = () => (
  <main>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/nhl-stats' element={<Stats/>}/>
      </Routes>
    </Router>
  </main>
)

export default Main
