import React from 'react'

import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link, NavLink } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'

import { addNewCardTC } from './cards-reducer'
import s from './Cards.module.css'
import { TableForCards } from './TableForCards'

export const Cards = () => {
  const isMyPack = useAppSelector(state => state.cards.isMyPack) // userId
  const dispatch = useAppDispatch()

  const addCardHandler = () => {
    dispatch(addNewCardTC())
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
            <NavLink className={s.Button} to={PATH.CARDS} onClick={addCardHandler}>
              Add new card
            </NavLink>
          ) : (
            <NavLink className={s.Button} to={PATH.CARDS}>
              Learn to pack
            </NavLink>
          )}
        </Container>
        <TableForCards />
      </Container>
    </div>
  )
}


