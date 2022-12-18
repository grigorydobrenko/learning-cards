import React from 'react'

import { TextField } from '@mui/material'

const InputFirstName = (props: any) => {
  return (
    <div>
      <TextField
        autoComplete="given-name"
        fullWidth
        error={!!props.formik.errors.fistName && props.formik.touched.fistName}
        id={props.formik.errors.fistName ? 'filled-error' : 'fistName'}
        label={
          props.formik.errors.fistName && props.formik.touched.fistName
            ? props.formik.errors.fistName
            : 'First Name'
        }
        variant="standard"
        {...props.formik.getFieldProps('fistName')}
      />
    </div>
  )
}

export default InputFirstName

// type InputFirstNamePropsType = {

//   fistName: string
// }
