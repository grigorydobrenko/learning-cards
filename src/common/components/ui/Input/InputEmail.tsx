import React from 'react'

import { TextField } from '@mui/material'

const InputEmail = (props: any) => {
  return (
    <div>
      <TextField
        autoComplete="email"
        fullWidth
        required
        error={!!props.formik.errors.email && props.formik.touched.email}
        id={props.formik.errors.email ? 'filled-error' : 'email'}
        label={
          props.formik.errors.email && props.formik.touched.email
            ? props.formik.errors.email
            : 'Email Address'
        }
        variant="standard"
        {...props.formik.getFieldProps('email')}
      />
    </div>
  )
}

export default InputEmail
