import React from 'react'

import { Button, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link, NavLink, useParams } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'

import { addNewCardTC } from './cards-reducer'
import s from './Cards.module.css'
import { TableForCards } from './TableForCards'

export const Cards = () => {
  const _id = useAppSelector(state => state.app.userData?._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const isMyPack = _id === packUserId

  const dispatch = useAppDispatch()

  const { pack_id } = useParams()

  const addCardHandler = () => {
    dispatch(addNewCardTC(pack_id))
  }

  return (
    <div>
      <Container
        disableGutters={true}
        sx={{
          display: { md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Link className={s.backLink} to={'/packs'}>
          <img src={arrowIcon} alt="arrow icon" />
          <span>Back to pack list</span>
        </Link>
        <Container
          disableGutters={true}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 3,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: '600' }} gutterBottom>
            {isMyPack ? 'My Pack' : 'Friend’s Pack'}
          </Typography>

          {isMyPack ? (
            <Button className={s.Button} onClick={addCardHandler}>
              Add new card
            </Button>
          ) : (
            <NavLink className={s.Button} to={PATH.CARDS}>
              Learn to pack
            </NavLink>
          )}
        </Container>
        <TableForCards isMyPack={isMyPack} />
      </Container>
    </div>
  )
}
