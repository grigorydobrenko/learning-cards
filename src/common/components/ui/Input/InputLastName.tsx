import React from 'react'

import { TextField } from '@mui/material'

const InputLastName = (props: any) => {
  return (
    <div>
      <TextField
        autoComplete="family-name"
        fullWidth
        error={!!props.formik.errors.lastName && props.formik.touched.lastName}
        id={props.formik.errors.lastName ? 'filled-error' : 'lastName'}
        label={
          props.formik.errors.lastName && props.formik.touched.lastName
            ? props.formik.errors.lastName
            : 'Last Name'
        }
        variant="standard"
        {...props.formik.getFieldProps('lastName')}
      />
    </div>
  )
}

export default InputLastName
