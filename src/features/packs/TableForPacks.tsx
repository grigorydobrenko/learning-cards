import React from 'react'

import { DeleteOutlined, EditOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Table } from 'antd'

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
    dataIndex: 'actions',
    key: 'actions',
  },
]

const TeachHandler = () => {
  console.log('Teach')
}
const EditHandler = () => {
  console.log('Edit')
}
const DeleteHandler = () => {
  console.log('Delete')
}

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

const dataSource = [
  {
    key: '1',
    name: 'Study cards',
    cards: 32,
    lastUpdated: '2022.08.23',
    createdBy: 'Vasil Bereza',
    actions: notMyActions,
  },
  {
    key: '2',
    name: 'Learned cards',
    cards: 12,
    lastUpdated: '2022.11.10',
    createdBy: 'Ivan Petrov',
    actions: myActions,
  },
  {
    key: '3',
    name: 'First cards',
    cards: 1,
    lastUpdated: '2022.04.13',
    createdBy: 'Muhojouk',
    actions: notMyActions,
  },
  {
    key: '4',
    name: 'Second cards',
    cards: 21,
    lastUpdated: '2022.10.11',
    createdBy: 'Capitan O4evidnost',
    actions: myActions,
  },
  {
    key: '5',
    name: 'Best cards',
    cards: 15,
    lastUpdated: '2021.08.23',
    createdBy: 'Prodam garag',
    actions: notMyActions,
  },
  {
    key: '6',
    name: 'Finish cards',
    cards: 8,
    lastUpdated: '2021.01.10',
    createdBy: 'Vse tlen',
    actions: myActions,
  },
]

export const TableForPacks = () => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: [5, 10, 15, 20] }}
      />
    </div>
  )
}
