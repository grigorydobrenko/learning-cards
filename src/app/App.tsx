import React from 'react'

import './App.css'
import { Container } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import { AppRoutes } from '../common/components/Routing/Routes'
import { Header } from '../features/Header/Header'

function App() {
  return (
    <div className="App">
      <LinearProgress sx={{ position: 'absolute', width: '100%', height: '5px', top: '0' }} />
      <Header />
      <Container fixed sx={{ pt: 4 }}>
        <AppRoutes />
      </Container>
    </div>
  )
}

export default App
