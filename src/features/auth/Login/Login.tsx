import React from 'react'

import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import { Link, Route, Routes } from 'react-router-dom'

import { PATH } from '../../../common/components/Routing/Routes'
import styles from '../../Header/Header.module.css'

export const Login = () => {
  return (
    <div>
      <h2>Sign in</h2>
      <form>
        <FormControl>
          <FormGroup>
            <TextField id="standard-basic" label="Email" variant="standard" />
            <TextField id="standard-basic" label="Password" variant="standard" />
            <FormControlLabel label={'Remember me'} control={<Checkbox />} />

            <Link to={PATH.FORGOT_PASSWORD} className={styles.link}>
              Forgot Password?
            </Link>

            <Button variant="contained">Sign In</Button>

            <div>Already have an account?</div>
            <Button variant="text">
              <Link to={PATH.REGISTER} className={styles.link}>
                Sign Up
              </Link>
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  )
}
