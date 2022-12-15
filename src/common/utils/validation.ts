export const validate = (values: any) => {
  const errors: any = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 3) {
    errors.password = 'Too short password'
  }
  if (!values.fistName) {
    errors.fistName = 'Required'
  } else if (!/^[A-Z0-9._%+-]{3,20}$/i.test(values.fistName)) {
    errors.fistName = 'Incorrect first name'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
    // if (values.lastName.length > 20) {
    //   errors.lastName = 'The last name is too long.'
    // }
  } else if (!/^[A-Z0-9._%+-]{3,20}$/i.test(values.lastName)) {
    errors.lastName = 'Incorrect last name'
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords must be the same'
  }

  return errors
}
