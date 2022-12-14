import React from 'react'

import './App.css'
import { Container, LinearProgress } from '@mui/material'

import { CustomizedSnackbars } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { AppRoutes } from '../common/components/Routing/Routes'
import { useAppSelector } from '../common/hooks/customHooks'
import { Header } from '../features/Header/Header'

function App() {
  const status = useAppSelector(state => state.appReducer.status)

  return (
    <div className="App">
      {status === 'loading' && (
        <LinearProgress sx={{ position: 'absolute', width: '100%', height: '5px', top: '0' }} />
      )}
      <Header />
      <Container fixed sx={{ pt: 4 }}>
        <AppRoutes />
      </Container>
      <CustomizedSnackbars />
    </div>
  )
}

export default App
