import React from 'react'

import EmailIcon from '@mui/icons-material/Email'
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@mui/material'

import { PATH } from '../../../common/components/Routing/Routes'

export const CheckEmail = () => {
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
                  width: 168,
                  height: 32,
                }}
              >
                <Typography align="center" component="h2" variant="h5">
                  Check Email
                </Typography>
              </Box>

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
                  <Button href={PATH.LOGIN} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Back to login
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  )
}
