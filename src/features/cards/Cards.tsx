import React from 'react'

import { Button, CircularProgress, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Link, NavLink, useParams } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { appSelector, cardsSelector } from '../../common/selectors'

import { addNewCardTC } from './cards-reducer'
import s from './Cards.module.css'
import { TableForCards } from './TableForCards'
import { AddCardModal } from '../../common/components/Modals/CardModals/AddCardModal'

export const Cards = () => {
  const status = useAppSelector(appSelector.status)
  const packName = useAppSelector(cardsSelector.packName)
  const _id = useAppSelector(state => state.app.userData?._id)
  const packUserId = useAppSelector(cardsSelector.packUserId)

  const isMyPack = _id === packUserId

  const dispatch = useAppDispatch()

  const { pack_id } = useParams()

  const addCardHandler = (question: string, answer: string) => {
    dispatch(addNewCardTC(pack_id, question, answer))
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
            {packName}
          </Typography>

          {isMyPack ? (
            <AddCardModal
              innerButton={
                <Button
                  variant="contained"
                  sx={{ borderRadius: '30px' }}
                  className={s.Button}
                  disabled={status === 'loading'}
                >
                  Add new card
                </Button>
              }
              addCardHandler={addCardHandler}
            />
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
