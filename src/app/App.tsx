import React from 'react'

import './App.css'
import { AppRoutes } from '../common/components/Routing/Routes'
import { Header } from '../features/Header/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="routes">
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
