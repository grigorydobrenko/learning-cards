import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
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
} from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { Link } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import styles from '../../Header/Header.module.css'

import loginStyles from './Login.module.css'

export const Login = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: '35px' }}>
          <div>
            <h2 className={loginStyles.title}>Sign in</h2>
            <form>
              <FormControl fullWidth>
                <FormGroup>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3 }}
                  />
                  {/*<TextField*/}
                  {/*  id="standard-basic"*/}
                  {/*  label="Password"*/}
                  {/*  variant="standard"*/}
                  {/*  InputLabelProps={{ shrink: true }}*/}
                  {/*  sx={{ mb: 3 }}*/}
                  {/*  InputProps={{*/}
                  {/*    startAdornment: <InputAdornment position="end">kg</InputAdornment>,*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                    <InputLabel htmlFor="standard-adornment-password" shrink={true}>
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      // type={showPassword ? 'text' : 'password'}
                      type={'password'}
                      // value={values.password}
                      // onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                          >
                            {/*{values.showPassword ? <VisibilityOff /> : <Visibility />}*/}
                            {<Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControlLabel
                    // label={'Remember me'}
                    label={<div className={loginStyles.rememberMe}>Remember me</div>}
                    control={<Checkbox sx={{ p: 0, ml: 1, mr: 1.5 }} />}
                    sx={{ mb: 3.5 }}
                  />

                  <Link
                    to={PATH.FORGOT_PASSWORD}
                    className={`${styles.link} ${loginStyles.forgotPassword}`}
                  >
                    Forgot Password?
                  </Link>

                  <Button variant="contained" sx={{ borderRadius: 30, mb: 4 }}>
                    Sign In
                  </Button>

                  <div className={loginStyles.question}>Already have an account?</div>
                  <Button variant="text">
                    <Link to={PATH.REGISTER} className={`${styles.link} ${loginStyles.signUp}`}>
                      Sign Up
                    </Link>
                  </Button>
                </FormGroup>
              </FormControl>
            </form>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}
