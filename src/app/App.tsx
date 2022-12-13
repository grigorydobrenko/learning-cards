import React from 'react'

import './App.css'
import { AppRoutes } from '../common/components/Routing/Routes'
import { Header } from '../features/Header/Header'
import LinearProgress from '@mui/material/LinearProgress'

function App() {
  return (
    <div className="App">
      <LinearProgress sx={{ position: 'absolute', width: '100%', height: '5px', top: '0' }} />
      <Header />

      <div className="routes">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
