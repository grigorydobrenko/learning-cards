import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'

const InputPassword = (props: any) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel
          htmlFor="standard-adornment-password"
          required={true}
          error={!!props.formik.errors.password && props.formik.touched.password}
        >
          {props.formik.errors.password && props.formik.touched.password
            ? props.formik.errors.password
            : 'Password'}
        </InputLabel>
        <Input
          autoComplete="new-password"
          fullWidth
          required
          error={!!props.formik.errors.password && props.formik.touched.password}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...props.formik.getFieldProps('password')}
        />
      </FormControl>
    </div>
  )
}

export default InputPassword
