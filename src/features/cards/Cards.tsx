import React, { ChangeEvent, useEffect, useState } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ConfigProvider, Empty, Rate, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { Link, NavLink } from 'react-router-dom'

import arrowIcon from '../../assets/img/icons/arrow-left.svg'
import { PATH } from '../../common/components/Routing/Routes'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { useDebounce } from '../../common/hooks/useDebounce'

import {
  addNewCardTC,
  deleteCardTC,
  editCardTC,
  getCardsTC,
  setPagePageCountAC,
  toggleSortAC,
} from './cards-reducer'
import s from './Cards.module.css'

export const Cards = () => {
  const { cards, cardsTotalCount, page, pageCount, sort, isMyPack } = useAppSelector(
    state => state.cards
  )

  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const addCardHandler = () => {
    dispatch(addNewCardTC())
  }

  const editCardHandler = () => {
    dispatch(editCardTC())
  }

  const deleteCardHandler = () => {
    dispatch(deleteCardTC())
  }

  const dataSource = cards.map(card => ({
    key: card._id,
    question: card.question,
    answer: card.answer,
    lastUpdated: getDate(card.updated),
    grade: isMyPack ? (
      <div>
        <RateStars rating={card.grade} />
        <EditOutlined onClick={editCardHandler} className={s.CardSettingElement} />
        <DeleteOutlined onClick={deleteCardHandler} className={s.CardDeleteElement} />
      </div>
    ) : (
      <RateStars rating={card.grade} />
    ),
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
      width: '20%',
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

  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const debouncedSearchValue = useDebounce<string | undefined>(searchValue, 500)

  console.log(typeof debouncedSearchValue)
  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  // useEffect(() => {
  //   // dispatch(getCardsTC())
  // }, [debouncedSearchValue])

  useEffect(() => {
    dispatch(getCardsTC(debouncedSearchValue))
  }, [pageCount, page, sort, debouncedSearchValue])

  const toggleMessagge = 'click to toggle order'
  const locale = {
    triggerDesc: toggleMessagge,
    triggerAsc: toggleMessagge,
    cancelSort: toggleMessagge,
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
        <div className={s.SearchLabel}>Search</div>
        <Search
          onChange={handleSearchValue}
          prefix
          placeholder="Provide your text"
          style={{ width: '100%' }}
          className={s.Search}
        />
        <ConfigProvider
          renderEmpty={() => (
            <Empty
              style={{ color: 'black' }}
              description="В данной колоде нету карточек удовлетворяющих поиску"
            />
          )}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            locale={locale}
          />
        </ConfigProvider>
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
