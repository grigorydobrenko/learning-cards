import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

import style from './Header.module.css'

import logo from 'assets/img/incubator-logo.svg'
import userPhoto from 'assets/img/user-photo.png'
import { PATH } from 'common/components/Routing/Routes'
import { useAppSelector } from 'common/hooks/customHooks'
import { appSelector, authSelector } from 'common/selectors'

export const Header = () => {
  const user = useAppSelector(appSelector.user)
  const isLoggedIn = useAppSelector(authSelector.isLoggedin)

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
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <NavLink className={style.profileLink} to={PATH.PROFILE}>
                {user?.name || 'user name'}
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
