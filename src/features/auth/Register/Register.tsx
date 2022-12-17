import * as React from 'react'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { registrationTC } from '../auth-reducer'
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

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(state => state.auth.isRegisteredIn)
  const formik = useFormik({
    initialValues: {
      fistName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      allowExtraEmails: false,
    },
    onSubmit: values => {
      console.log(JSON.stringify(values))
      dispatch(registrationTC(values))
    },
    validate: values => {
      const errors: any = {}

      if (!values.fistName) {
        errors.fistName = 'Required'
      } else if (!/^[A-Z0-9._%+-]{3,20}$/i.test(values.fistName)) {
        errors.fistName = 'Incorrect first name'
      }
      if (!values.lastName) {
        errors.lastName = 'Required'
      } else if (!/^[A-Z0-9._%+-]{3,20}$/i.test(values.lastName)) {
        errors.lastName = 'Incorrect last name'
      }
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
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

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: '35px' }}>
          <Typography align="center" component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        fullWidth
                        required
                        error={!!formik.errors.fistName && formik.touched.fistName}
                        id={formik.errors.fistName ? 'filled-error' : 'fistName'}
                        label={
                          formik.errors.fistName && formik.touched.fistName
                            ? formik.errors.fistName
                            : 'First Name'
                        }
                        variant="standard"
                        {...formik.getFieldProps('fistName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="family-name"
                        fullWidth
                        required
                        error={!!formik.errors.lastName && formik.touched.lastName}
                        id={formik.errors.lastName ? 'filled-error' : 'lastName'}
                        label={
                          formik.errors.lastName && formik.touched.lastName
                            ? formik.errors.lastName
                            : 'Last Name'
                        }
                        variant="standard"
                        {...formik.getFieldProps('lastName')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="email"
                        fullWidth
                        required
                        error={!!formik.errors.email && formik.touched.email}
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
                      <TextField
                        autoComplete="new-password"
                        fullWidth
                        required
                        error={!!formik.errors.password && formik.touched.password}
                        id={formik.errors.password ? 'filled-error' : 'password'}
                        label={
                          formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : 'Password'
                        }
                        type="password"
                        variant="standard"
                        {...formik.getFieldProps('password')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        error={!!formik.errors.confirmPassword}
                        id={formik.errors.confirmPassword ? 'filled-error' : 'confirmPassword'}
                        label={
                          formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : 'Confirm password'
                        }
                        type="password"
                        variant="standard"
                        {...formik.getFieldProps('confirmPassword')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            {...formik.getFieldProps('allowExtraEmails')}
                            checked={formik.values.allowExtraEmails}
                            color="primary"
                          />
                        }
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to={PATH.LOGIN} className={styles.href}>
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            </FormGroup>
          </form>
          <Copyright sx={{ mt: 3 }} />
        </Paper>
      </Grid>
    </Grid>
  )
}
