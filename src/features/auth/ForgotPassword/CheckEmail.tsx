import React from 'react'

import EmailIcon from '@mui/icons-material/Email'
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material'

const theme = createTheme()

export const CheckEmail = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#f9f9fa',
              borderRadius: '10px',
            }}
          >
            <Typography component="h1" variant="h5">
              Check Email
            </Typography>
            <EmailIcon fontSize="large" />
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                  <Typography color="text.secondary" variant="body2">
                    We&apos;ve sent an Email with instructions to example@mail.com
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Button href={'#'} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Back to login
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}
