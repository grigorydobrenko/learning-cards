import React, { useEffect } from 'react'

import { Box, Button, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import InputEmail from '../../../common/components/ui/Input/InputEmail'
import InputPassword from '../../../common/components/ui/Input/InputPassword'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { authSelector } from '../../../common/selectors'
import styles from '../../Header/Header.module.css'
import { LoginPayloadType } from '../auth-api'
import { loginTC } from '../auth-reducer'

import loginStyles from './Login.module.css'

type FormikErrorType = {
  email?: string
  password?: string
}

export const Login = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector(authSelector.isLoggedin)

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

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/packs')
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
                <Box sx={{ mt: 3, mb: 4 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputEmail formik={formik} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputPassword formik={formik} />
                    </Grid>
                  </Grid>
                </Box>
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
