import React from 'react'

import { DeleteOutlined, EditOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Col, Row, Table } from 'antd'
import { Link } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../common/selectors'
import { CardPacksType } from '../packs-api'
import { deletePackTC, updatePackTC } from '../packs-reducer'

export const TableForPacks = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(appSelector.user)
  //const { pageCount, page } = useAppSelector(state => state.packs)

  const TeachHandler = (id: string) => {
    console.log('Teach. id ->', id)
  }
  const EditHandler = (id: string) => {
    dispatch(updatePackTC(id))
    console.log('Edit. id ->', id)
  }
  const DeleteHandler = (id: string) => {
    dispatch(deletePackTC(id))

    console.log('Delete. id ->', id)
  }
  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const cardPacks = useAppSelector(packsSelector.cardPacks).map((pack: CardPacksType) => {
    const myActions = [
      <StepForwardOutlined
        key={uuid4()}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={() => TeachHandler(pack._id)}
      />,
      <EditOutlined
        key={uuid4()}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={() => EditHandler(pack._id)}
      />,
      <DeleteOutlined
        key={uuid4()}
        style={{ fontSize: '15px', marginLeft: '5px' }}
        onClick={() => DeleteHandler(pack._id)}
      />,
    ]

    const notMyActions = [
      <StepForwardOutlined
        key={uuid4()}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={() => TeachHandler(pack._id)}
      />,
    ]

    return {
      key: pack._id,
      name: <Link to={pack._id}>{pack.name}</Link>,
      cards: pack.cardsCount,
      lastUpdated: getDate(pack.updated),
      createdBy: pack.user_name,
      actions: userData && userData._id === pack.user_id ? myActions : notMyActions,
    }
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
    },
    {
      title: 'Cards',
      dataIndex: 'cards',
      key: 'key',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'key',
      sorter: (a: any, b: any) => a.lastUpdated.localeCompare(b.lastUpdated),
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'key',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'key',
      render: (myActions: any) => myActions,
    },
  ]
  // const pagination = {
  //   defaultPageSize: pageCount,
  //   showSizeChanger: true,
  //   total: page,
  //   pageSizeOptions: [2, 5, 7, 10, 15, 20],
  //   onChange: (page: number, pageSize: number) => {
  //     dispatch(setPagePacksCountAC(pageSize, page))
  //   },
  // }

  // useEffect(() => {
  //   dispatch(getPacksTC())
  // }, [pageCount, page])
  console.log('TableForPacks: ', cardPacks)

  return (
    <div>
      <Row>
        <Col xs={24} span={12}>
          <Table
            dataSource={cardPacks}
            tableLayout={'fixed'}
            columns={columns}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20],
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
