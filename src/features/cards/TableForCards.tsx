import React, { ChangeEvent, useEffect, useState } from 'react'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ConfigProvider, Empty, Table } from 'antd'
import Search from 'antd/lib/input/Search'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { useDebounce } from '../../common/hooks/useDebounce'

import {
  deleteCardTC,
  editCardTC,
  getCardsTC,
  setPagePageCountAC,
  toggleSortAC,
} from './cards-reducer'
import s from './Cards.module.css'
import { RateStars } from './RateStars'

export const TableForCards = () => {
  const { cards, cardsTotalCount, page, pageCount, sort, isMyPack } = useAppSelector(
    state => state.cards
  )

  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const dispatch = useAppDispatch()
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

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    dispatch(getCardsTC(id, debouncedSearchValue))
  }, [pageCount, page, sort, debouncedSearchValue])

  const toggleMessage = 'click to toggle order'
  const locale = {
    triggerDesc: toggleMessage,
    triggerAsc: toggleMessage,
    cancelSort: toggleMessage,
  }

  return (
    <div>
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
        <Table dataSource={dataSource} columns={columns} pagination={pagination} locale={locale} />
      </ConfigProvider>
    </div>
  )
}