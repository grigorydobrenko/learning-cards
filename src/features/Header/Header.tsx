import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import logo from '../../assets/img/incubator-logo.svg'
import userPhoto from '../../assets/img/user-photo.png'
import Container from '@mui/material/Container'
import SuperButton from '../../common/components/ui/c2-SuperButton/SuperButton'

import style from './Header.module.css'
import { Link, NavLink, redirect } from 'react-router-dom'
import { PATH } from '../../common/components/Routing/Routes'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'

export const Header = () => {
  const [isLoggined, setIsLoggined] = React.useState(false)
  return (
    <AppBar position="static" sx={{ boxShadow: 6, backgroundColor: '#FCFCFC' }}>
      <Toolbar disableGutters>
        <Container
          maxWidth="lg"
          sx={{ display: { md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="https://it-incubator.io/"
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { md: 'flex' },
            }}
          >
            <img src={logo} alt="logo of app" />
          </Typography>
          {isLoggined ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <NavLink className={style.profileLink} to={PATH.PROFILE}>
                user name
              </NavLink>
              <Avatar alt="user photo" src={userPhoto} />
            </Box>
          ) : (
            <NavLink className={style.headerButton} to={PATH.LOGIN}>
              Sign in
            </NavLink>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  )
}
