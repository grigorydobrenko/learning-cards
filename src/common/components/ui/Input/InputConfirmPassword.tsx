import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'

const InputConfirmPassword = (props: any) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel
          htmlFor="standard-adornment-password"
          required={true}
          error={!!props.formik.errors.confirmPassword && props.formik.touched.confirmPassword}
        >
          {props.formik.errors.confirmPassword && props.formik.touched.confirmPassword
            ? props.formik.errors.confirmPassword
            : 'Confirm password'}
        </InputLabel>
        <Input
          autoComplete="new-password"
          fullWidth
          required
          error={!!props.formik.errors.confirmPassword && props.formik.touched.confirmPassword}
          type={showConfirmPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...props.formik.getFieldProps('confirmPassword')}
        />
      </FormControl>
    </div>
  )
}

export default InputConfirmPassword
