import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, Container } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import { CustomizedSnackbars } from '../common/components/ErrorSnackBar/ErrorSnackBar'
import { CustomizedFeedbackSnackbars } from '../common/components/FeddbackSnackBar/FeedbackSnackBar'
import { AppRoutes } from '../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../common/hooks/customHooks'
import { Header } from '../features/Header/Header'

import { initializeAppTC } from './app-reducer'

function App() {
  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])
  if (!isInitialized) {
    return <CircularProgress size="30px" className="circularProgress" />
  }

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
      <CustomizedFeedbackSnackbars />
    </div>
  )
}

export default App
