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
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { sendEmailToSetNewPasswordTC } from '../auth-reducer'
import styles from '../authCommonStyle.module.css'

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#" className={styles.href}>
        Friday Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values))
      dispatch(sendEmailToSetNewPasswordTC(values))
    },
    validate: values => {
      const errors: any = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
  })

  if (status === 'succeeded') {
    return <Navigate to={PATH.CHECK_EMAIL} />
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
              <Typography component="h1" variant="h5">
                Forgot your password?
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="email"
                          fullWidth
                          required
                          error={formik.touched.email && !!formik.errors.email}
                          id={formik.errors.email ? 'filled-error' : 'email'}
                          label={
                            formik.errors.email && formik.touched.email
                              ? formik.errors.email
                              : 'Email Address'
                          }
                          variant="standard"
                          {...formik.getFieldProps('email')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography color="text.secondary" variant="body2">
                          Lost your password? Please enter your username or email address. You will
                          receive a link to create a new password via email.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Reset password
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link to={PATH.LOGIN} className={styles.href}>
                          Did you remember your password?
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </FormGroup>
              </form>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2 }} />
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}
