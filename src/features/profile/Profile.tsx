import React, { useCallback } from 'react'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/system'
import { Link, Navigate, NavLink } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import logoutIcon from '../../assets/img/icons/logout-icon.svg'
import photoIcon from '../../assets/img/icons/photo-icon.svg'
import userPhoto from '../../assets/img/user-photo.png'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { updateUserDataTC } from '../auth/auth-reducer'

import style from './Profile.module.css'

export const Profile = () => {
  const user = useAppSelector(state => state.app.userData)
  const dispatch = useAppDispatch()
  const changeUserName = useCallback((title: string) => {
    dispatch(updateUserDataTC({ name: title }))
  }, [])

  if (!user) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '40px' }}
      >
        <Link className={style.profileLink} to={PATH.NOT_FOUND}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Back to pack list</span>
        </Link>

        <Card className={style.profileWrapper} variant="outlined">
          <CardContent className={style.profileContent}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: '600' }} gutterBottom>
              Personal information
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <Avatar alt="user photo" src={userPhoto} sx={{ width: '96px', height: '96px' }} />
              <IconButton
                size="small"
                sx={{
                  backgroundColor: '#808080',
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  border: '1px solid #FFFFFF',
                }}
                onClick={() => {
                  alert('upload new photo')
                }}
              >
                <img src={photoIcon} alt="" />
              </IconButton>
            </Box>

            <EditableSpan value={'Andrey'} onChange={changeUserName} />
            <Typography variant="subtitle2" component="p" sx={{ opacity: '0.5' }}>
              andreykulish89@gmail.com
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink className={style.profileButton} to={PATH.LOGIN}>
              <img src={logoutIcon} />
              <span>Log out</span>
            </NavLink>
          </CardActions>
        </Card>
      </Container>
    </>
  )
}
