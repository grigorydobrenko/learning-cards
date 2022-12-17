import React, { useEffect } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import styles from '../../Header/Header.module.css'
import { LoginPayloadType } from '../auth-api'
import { loginTC } from '../auth-reducer'

import loginStyles from './Login.module.css'

type FormikErrorType = {
  email?: string
  password?: string
}

export const Login = () => {
  const [isShownPassword, setIsShownPassword] = React.useState(false)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const validate = (values: LoginPayloadType) => {
    const errors: FormikErrorType = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 3) {
      errors.password = 'Too short password'
    }

    return errors
  }

  const handleClickShowPassword = () => {
    setIsShownPassword(!isShownPassword)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: (values: LoginPayloadType) => {
      dispatch(loginTC(values))
    },
  })

  //nya-admin@nya.nya
  //1qazxcvBG
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
  }, [isLoggedIn])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: '35px' }}>
          <div>
            <h2 className={loginStyles.title}>Sign in</h2>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <FormControl variant="standard" sx={{ mb: 3 }} fullWidth>
                  <InputLabel htmlFor="standard-adornment-email" shrink={true}>
                    Email
                  </InputLabel>
                  <Input id="standard-adornment-email" {...formik.getFieldProps('email')} />
                  {formik.touched.email && formik.errors.email && (
                    <FormHelperText error id="component-error-text">
                      {formik.errors.email}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                  <InputLabel htmlFor="standard-adornment-password" shrink={true}>
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={isShownPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {isShownPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText error id="component-error-text">
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControlLabel
                  label={<div className={loginStyles.rememberMe}>Remember me</div>}
                  control={
                    <Checkbox
                      sx={{ p: 0, ml: 1, mr: 1.5 }}
                      {...formik.getFieldProps('rememberMe')}
                      checked={formik.values.rememberMe}
                    />
                  }
                  sx={{ mb: 3.5 }}
                />

                <Link
                  to={PATH.FORGOT_PASSWORD}
                  className={`${styles.link} ${loginStyles.forgotPassword}`}
                >
                  Forgot Password?
                </Link>

                <Button variant="contained" sx={{ borderRadius: 30, mb: 4 }} type={'submit'}>
                  Sign In
                </Button>

                <div className={loginStyles.question}>Already have an account?</div>
                <Button variant="text">
                  <Link to={PATH.REGISTER} className={`${styles.link} ${loginStyles.signUp}`}>
                    Sign Up
                  </Link>
                </Button>
              </FormGroup>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}
