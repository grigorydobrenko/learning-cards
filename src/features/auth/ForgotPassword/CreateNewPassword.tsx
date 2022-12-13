import React from 'react'

import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const theme = createTheme()

export const CreateNewPassword = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    console.log({
      password: data.get('newPassword'),
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
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="newPassword"
                      label="New password"
                      type="password"
                      id="newPassword"
                      variant="standard"
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
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}
