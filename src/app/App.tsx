import React from 'react'

import './App.css'
import { Container } from '@mui/material'

import { AppRoutes } from '../common/components/Routing/Routes'
import { Header } from '../features/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      {/*<div className="routes">*/}
      <Container fixed>
        <AppRoutes />
      </Container>
      {/*</div>*/}
    </div>
  )
}

export default App
