import React from 'react'

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { setNewPasswordTC } from '../auth-reducer'

export const CreateNewPassword = () => {
  let { token } = useParams()
  const isNewPasswordSet = useAppSelector(state => state.auth.isNewPasswordSet)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values))
      console.log(token)
      if (!token) {
        token = ''
      }
      let data = {
        password: values.password,
        resetPasswordToken: token,
      }

      dispatch(setNewPasswordTC(data))
    },
    validate: values => {
      const errors: any = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Too short password'
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must be the same'
      }

      return errors
    },
  })

  if (isNewPasswordSet) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: '35px' }}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '10px',
              }}
            >
              <Box
                sx={{
                  width: 289,
                  height: 32,
                }}
              >
                <Typography align="center" component="h2" variant="h5">
                  Create new password
                </Typography>
              </Box>
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="new-password"
                        fullWidth
                        required
                        error={!!formik.errors.password && formik.touched.password}
                        id={
                          formik.errors.password && formik.touched.password
                            ? 'filled-error'
                            : 'password'
                        }
                        label={
                          formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : 'New password'
                        }
                        type="password"
                        variant="standard"
                        {...formik.getFieldProps('password')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="new-password"
                        fullWidth
                        error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                        id={
                          formik.errors.confirmPassword && formik.touched.confirmPassword
                            ? 'filled-error'
                            : 'confirmPassword'
                        }
                        label={
                          formik.errors.confirmPassword && formik.touched.confirmPassword
                            ? formik.errors.confirmPassword
                            : 'Confirm new password'
                        }
                        type="password"
                        variant="standard"
                        {...formik.getFieldProps('confirmPassword')}
                      />
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="flex-start" sx={{ mt: 3 }}>
                    <Typography color="text.secondary" variant="body2">
                      Create new password and we will send you further instructions to email.
                    </Typography>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Create new password
                  </Button>
                </Box>
              </form>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}
