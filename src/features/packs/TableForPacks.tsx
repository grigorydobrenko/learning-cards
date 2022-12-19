import React from 'react'

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

const dataSource = [
  {
    key: '1',
    name: 'Study cards',
    cards: 32,
    lastUpdated: '2022.08.23',
    createdBy: 'Vasil Bereza',
  },
  {
    key: '2',
    name: 'Learned cards',
    cards: 12,
    lastUpdated: '2022.11.10',
    createdBy: 'Ivan Petrov',
  },
  {
    key: '3',
    name: 'First cards',
    cards: 1,
    lastUpdated: '2022.04.13',
    createdBy: 'Muhojouk',
  },
  {
    key: '4',
    name: 'Second cards',
    cards: 21,
    lastUpdated: '2022.10.11',
    createdBy: 'Capitan O4evidnost',
  },
  {
    key: '5',
    name: 'Best cards',
    cards: 15,
    lastUpdated: '2021.08.23',
    createdBy: 'Prodam garag',
  },
  {
    key: '6',
    name: 'Finish cards',
    cards: 8,
    lastUpdated: '2021.01.10',
    createdBy: 'Vse tlen',
  },
]

export const TableForPacks = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
