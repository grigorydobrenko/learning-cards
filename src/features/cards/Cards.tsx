import React, { useEffect } from 'react'

import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Rate, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link, NavLink } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'

import { _getCardsTC, getCardsTC, setPagePageCountAC } from './cards-reducer'
import s from './Cards.module.css'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)

  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const dispatch = useAppDispatch()

  const dataSource = cards.map(card => ({
    key: card._id,
    question: card.question,
    answer: card.answer,
    lastUpdated: getDate(card.updated),
    grade: <RateStars rating={card.grade} />,
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
    showSizeChanger: true,
    total: cardsTotalCount,
    pageSizeOptions: [5, 10, 15, 20],
    onChange: (page: number, pageSize: number) => {
      dispatch(setPagePageCountAC(pageSize, page))
    },
  }

  const getcards = () => {
    dispatch(_getCardsTC())
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [pageCount, page])

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

type Props = {
  rating: number
}

const RateStars = (props: Props) => {
  const { rating } = props

  return (
    <>
      <Rate allowHalf defaultValue={rating} />
    </>
  )
}

export default RateStars
