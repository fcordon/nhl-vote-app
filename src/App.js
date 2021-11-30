import React from 'react'

import NavBar from './components/NavBar/NavBar'
import Routes from './Routes'

const App = (props) => {
  return (
    <section className='App'>
      <NavBar />
      <Routes />
    </section>
  );
}

export default App;