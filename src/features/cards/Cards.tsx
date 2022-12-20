import React from 'react'

import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link, NavLink } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'

import { getCardsTC } from './cards-reducer'
import s from './Cards.module.css'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cards)

  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const dataSource = cards.map(card => ({
    key: card._id,
    question: card.question,
    answer: card.answer,
    lastUpdated: getDate(card.updated),
    grade: card.grade,
  }))

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a: any, b: any) => a.lastUpdated.localeCompare(b.lastUpdated),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
  ]

  const pagination = {
    defaultPageSize: 2,
    showSizeChanger: true,
    pageSizeOptions: [2, 5, 15, 20],
  }

  const dispatch = useAppDispatch()

  const getcards = () => {
    dispatch(getCardsTC())
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
        <Link className={s.backLink} to={PATH.NOT_FOUND}>
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
            Friend’s Pack
          </Typography>

          <NavLink className={s.Button} to={PATH.CARDS}>
            Learn to pack
          </NavLink>
        </Container>
        <div className={s.SearchLabel}>Search</div>
        <Search
          prefix
          placeholder="Provide your text"
          style={{ width: '100%' }}
          className={s.Search}
        />
        <Table dataSource={dataSource} columns={columns} pagination={pagination} />
        <button onClick={getcards}>getCardds</button>
      </Container>
    </div>
  )
}
