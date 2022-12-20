import React from 'react'

import { DeleteOutlined, EditOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Table } from 'antd'

import { useAppSelector } from '../../common/hooks/customHooks'
import { packsSelector } from '../../common/selectors'

import { CardPacksType } from './packs-api'

const TeachHandler = () => {
  console.log('Teach')
}
const EditHandler = () => {
  console.log('Edit')
}
const DeleteHandler = () => {
  console.log('Delete')
}

export const TableForPacks = () => {
  const myActions = [
    // eslint-disable-next-line react/jsx-key
    <StepForwardOutlined style={{ fontSize: '20px', margin: '0 5px' }} onClick={TeachHandler} />,
    // eslint-disable-next-line react/jsx-key
    <EditOutlined style={{ fontSize: '20px', margin: '0 5px' }} onClick={EditHandler} />,
    // eslint-disable-next-line react/jsx-key
    <DeleteOutlined style={{ fontSize: '20px', marginLeft: '5px' }} onClick={DeleteHandler} />,
  ]
  const notMyActions = [
    // eslint-disable-next-line react/jsx-key
    <StepForwardOutlined style={{ fontSize: '20px', margin: '0 5px' }} onClick={TeachHandler} />,
  ]
  const cardPacks = useAppSelector(packsSelector.cardPacks).map((pack: CardPacksType) => {
    return {
      key: pack._id,
      name: pack.name,
      cards: pack.cardsCount,
      lastUpdated: pack.updated,
      createdBy: pack.user_name,
    }
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Cards',
      dataIndex: 'cards',
      key: 'cards',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: (a: any, b: any) => a.lastUpdated - b.lastUpdated,
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ]

  console.log(cardPacks)

  return (
    <div>
      <Table
        dataSource={cardPacks}
        columns={columns}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 15, 20] }}
      />
    </div>
  )
}

type TablePacksType = {
  key: string
  name: string
  cards: number
  lastUpdated: string
  createdBy: string
}
