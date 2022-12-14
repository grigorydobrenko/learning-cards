import * as React from 'react'

import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { registrationTC } from '../auth-reducer'
import styles from '../authCommonStyle.module.css'

import { PATH } from 'common/components/Routing/Routes'
import { Copyright } from 'common/components/ui/Copyright/Copyright'
import InputConfirmPassword from 'common/components/ui/Input/InputConfirmPassword'
import InputEmail from 'common/components/ui/Input/InputEmail'
import InputFirstName from 'common/components/ui/Input/InputFirstName'
import InputLastName from 'common/components/ui/Input/InputLastName'
import InputPassword from 'common/components/ui/Input/InputPassword'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { authSelector } from 'common/selectors'

export const Register = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(authSelector.isRegisteredIn)

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
                      <InputFirstName formik={formik} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLastName formik={formik} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputEmail formik={formik} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputPassword formik={formik} />
                    </Grid>
                    <Grid item xs={12}>
                      <InputConfirmPassword formik={formik} />
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
