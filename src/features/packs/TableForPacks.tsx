import React, { useEffect } from 'react'

import { DeleteOutlined, EditOutlined, StepForwardOutlined } from '@ant-design/icons'
import { Col, Row, Table } from 'antd'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../common/selectors'

import { CardPacksType } from './packs-api'
import { getPacksTC, setPagePacksCountAC } from './packs-reducer'

export const TableForPacks = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(appSelector.user)
  const { pageCount, page } = useAppSelector(state => state.packs)

  const TeachHandler = () => {
    console.log('Teach')
  }
  const EditHandler = () => {
    console.log('Edit')
  }
  const DeleteHandler = () => {
    // dispatch(deletePackTC(e))
    console.log('Delete')
  }
  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const cardPacks = useAppSelector(packsSelector.cardPacks).map((pack: CardPacksType) => {
    const myActions = [
      // eslint-disable-next-line react/jsx-key
      <StepForwardOutlined style={{ fontSize: '15px', margin: '0 5px' }} onClick={TeachHandler} />,
      // eslint-disable-next-line react/jsx-key
      <EditOutlined style={{ fontSize: '15px', margin: '0 5px' }} onClick={EditHandler} />,
      // eslint-disable-next-line react/jsx-key
      <DeleteOutlined
        key={pack._id}
        style={{ fontSize: '15px', marginLeft: '5px' }}
        onClick={DeleteHandler}
      />,
    ]

    const notMyActions = [
      // eslint-disable-next-line react/jsx-key
      <StepForwardOutlined
        key={pack._id}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={TeachHandler}
      />,
    ]

    if (userData && userData._id === pack.user_id) {
      return {
        key: pack._id,
        // name: pack.name,
        name: <Link to={pack._id}>{pack.name}</Link>,
        cards: pack.cardsCount,
        lastUpdated: getDate(pack.updated),
        createdBy: pack.user_name,
        actions: myActions,
      }
    } else {
      return {
        key: pack._id,
        name: <Link to={pack._id}>{pack.name}</Link>,
        cards: pack.cardsCount,
        lastUpdated: getDate(pack.updated),
        createdBy: pack.user_name,
        actions: notMyActions,
      }
    }
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'key',
      // render: (text: string) => <a>{text}</a>,
      // render: (text: string) => <Link to={'617ff51fd7b1030004090a1f'}>{text}</Link>,
      // render: (text: string) => ,
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
  const pagination = {
    defaultPageSize: pageCount,
    showSizeChanger: true,
    total: page,
    pageSizeOptions: [2, 5, 7, 10, 15, 20],
    onChange: (page: number, pageSize: number) => {
      dispatch(setPagePacksCountAC(pageSize, page))
    },
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [pageCount, page])
  console.log(cardPacks)

  return (
    <div>
      <Row>
        <Col xs={24} span={12}>
          <Table
            dataSource={cardPacks}
            tableLayout={'fixed'}
            columns={columns}
            pagination={pagination}
          />
        </Col>
      </Row>
    </div>
  )
}
