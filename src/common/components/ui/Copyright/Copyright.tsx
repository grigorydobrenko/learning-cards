import React from 'react'

import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import styles from '../../../../features/auth/authCommonStyle.module.css'

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#" className={styles.href}>
        Friday Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
