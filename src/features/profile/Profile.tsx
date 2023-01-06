import React, { useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { Link, NavLink } from 'react-router-dom'

import defaultAva from '../../assets/img/user-photo.png'
import { logoutTC, updateUserDataTC } from '../auth/auth-reducer'

import style from './Profile.module.css'

import arrowIcon from 'assets/img/icons/arrow-left.svg'
import logoutIcon from 'assets/img/icons/logout-icon.svg'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'
import { InputTypeFile } from 'common/components/InputTypeFile/InputTypeFile'
import { PATH } from 'common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { appSelector } from 'common/selectors'

export const Profile = () => {
  const user = useAppSelector(appSelector.user)
  const dispatch = useAppDispatch()
  const changeUserName = (title: string) => {
    dispatch(updateUserDataTC({ name: title }))
  }
  const changeUserAvatar = (photo: string) => {
    dispatch(updateUserDataTC({ avatar: photo }))
  }
  const logOutHandler = (e: any) => {
    e.preventDefault()
    dispatch(logoutTC())
  }
  const avatarErrorHandler = () => {
    alert('Кривая картинка')
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '40px' }}
      >
        <Link className={style.profileLink} to={PATH.PACKS}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Back to pack list</span>
        </Link>

        <Card className={style.profileWrapper} variant="outlined">
          <CardContent className={style.profileContent}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: '600' }} gutterBottom>
              Personal information
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                alt="user photo"
                src={user?.avatar || defaultAva}
                onError={avatarErrorHandler}
                sx={{ width: '96px', height: '96px' }}
              />
              <InputTypeFile changeUserAvatar={changeUserAvatar} />
            </Box>

            <EditableSpan value={user?.name || ''} onChange={changeUserName} />
            <Typography variant="subtitle2" component="p" sx={{ opacity: '0.5' }}>
              {user?.email}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink className={style.profileButton} to={PATH.LOGIN} onClick={logOutHandler}>
              <img src={logoutIcon} alt={''} />
              <span>Log out</span>
            </NavLink>
          </CardActions>
        </Card>
      </Container>
    </>
  )
}
