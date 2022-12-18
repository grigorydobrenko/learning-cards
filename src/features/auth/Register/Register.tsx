import * as React from 'react'

import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import { Copyright } from '../../../common/components/ui/Copyright/Copyright'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { registrationTC } from '../auth-reducer'
import styles from '../authCommonStyle.module.css'

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(state => state.auth.isRegisteredIn)

  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
                      <FormControl variant="standard" fullWidth>
                        <InputLabel
                          htmlFor="standard-adornment-password"
                          required={true}
                          error={!!formik.errors.password && formik.touched.password}
                        >
                          {formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : 'Password'}
                        </InputLabel>
                        <Input
                          autoComplete="new-password"
                          fullWidth
                          required
                          error={!!formik.errors.password && formik.touched.password}
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...formik.getFieldProps('password')}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel
                          htmlFor="standard-adornment-password"
                          required={true}
                          error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                        >
                          {formik.errors.confirmPassword && formik.touched.confirmPassword
                            ? formik.errors.confirmPassword
                            : 'Confirm password'}
                        </InputLabel>
                        <Input
                          autoComplete="new-password"
                          fullWidth
                          required
                          error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                          type={showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          {...formik.getFieldProps('confirmPassword')}
                        />
                      </FormControl>
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
