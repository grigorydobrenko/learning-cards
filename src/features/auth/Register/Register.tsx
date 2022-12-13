import * as React from 'react'
import { useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { useFormik } from 'formik'

import { PATH } from '../../../common/components/Routing/Routes'
import { validate } from '../../../common/utils/validation'

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Friday Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export const Register = () => {
  const [password, setPassword] = useState(null)

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
    },
    validate,
  })

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     confirmPassword: data.get('confirmPassword'),
  //     allowExtraEmails: data.get('allowExtraEmails'),
  //   })
  // }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: '35px' }}>
          <Box sx={{}}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          </Box>
          <Typography align="center" component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        fullWidth
                        error={!!formik.errors.fistName}
                        id={formik.errors.fistName ? 'filled-error' : 'fistName'}
                        label={formik.errors.fistName ? formik.errors.fistName : 'First Name'}
                        variant="standard"
                        {...formik.getFieldProps('fistName')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="family-name"
                        fullWidth
                        error={!!formik.errors.lastName}
                        id={formik.errors.lastName ? 'filled-error' : 'lastName'}
                        label={formik.errors.lastName ? formik.errors.lastName : 'Last Name'}
                        variant="standard"
                        {...formik.getFieldProps('lastName')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="email"
                        fullWidth
                        error={!!formik.errors.email}
                        id={formik.errors.email ? 'filled-error' : 'email'}
                        label={formik.errors.email ? formik.errors.email : 'Email Address'}
                        variant="standard"
                        {...formik.getFieldProps('email')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="new-password"
                        fullWidth
                        error={!!formik.errors.password}
                        id={formik.errors.password ? 'filled-error' : 'password'}
                        label={formik.errors.password ? formik.errors.password : 'Password'}
                        type="password"
                        variant="standard"
                        {...formik.getFieldProps('password')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="new-password"
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
                      <Link href={PATH.LOGIN} variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            </FormGroup>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
