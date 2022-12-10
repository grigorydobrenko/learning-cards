import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../common/components/Routing/Routes'

import styles from './Header.module.css'

export const Header = () => {
  return (
    <div className={styles.header}>
      <Link to={PATH.LOGIN} className={styles.link}>
        Sign in
      </Link>
    </div>
  )
}
