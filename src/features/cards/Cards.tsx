import React, { useEffect, useState } from 'react'

import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Rate, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link, NavLink, useParams } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'

import { getCardsTC, setPagePageCountAC, toggleSortAC } from './cards-reducer'
import s from './Cards.module.css'

export const Cards = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const sort = useAppSelector(state => state.cards.sort)
  const { id } = useParams()
  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const dataSource = cards.map(card => ({
    key: card._id,
    question: card.question,
    answer: card.answer,
    lastUpdated: getDate(card.updated),
    grade: <RateStars rating={card.grade} />,
  }))

  const [flag, setFlag] = useState(!!sort[0])
  const dispatch = useAppDispatch()

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
      sorter: (a: any, b: any) => 0,
      onHeaderCell: (column: any) => {
        return {
          onClick: () => {
            setFlag(!flag)

            console.log(flag)
            dispatch(toggleSortAC(flag))
            console.log('onClick')
          },
        }
      },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
  ]

  const pagination = {
    defaultPageSize: pageCount,
    showSizeChanger: true,
    total: cardsTotalCount,
    pageSizeOptions: [2, 5, 7, 10, 15, 20],
    onChange: (page: number, pageSize: number) => {
      dispatch(setPagePageCountAC(pageSize, page))
    },
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(getCardsTC(id))
  }, [pageCount, page, sort])

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
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          locale={{
            triggerDesc: 'click to toggle order',
            triggerAsc: 'click to toggle order',
            cancelSort: 'click to toggle order',
          }}
        />
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
