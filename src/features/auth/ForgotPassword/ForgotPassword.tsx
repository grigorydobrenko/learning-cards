import React from 'react'

import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
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

export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      console.log(JSON.stringify(values))
    },
    validate,
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    console.log({
      email: data.get('email'),
    })
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
              <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
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
                    <Link href={PATH.LOGIN} variant="body2">
                      Did you remember your password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5, mb: 2 }} />
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}
