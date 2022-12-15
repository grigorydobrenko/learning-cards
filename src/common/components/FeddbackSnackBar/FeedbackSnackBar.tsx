import * as React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'

import { setAppFeedbackAC } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const CustomizedFeedbackSnackbars = () => {
  const feedBack = useAppSelector<string | null>(state => state.app.feedBack)
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAppFeedbackAC(null))
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={!!feedBack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {feedBack}
        </Alert>
      </Snackbar>
    </Stack>
  )
}
