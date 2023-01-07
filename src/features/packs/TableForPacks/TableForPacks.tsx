import React from 'react'

import { DeleteOutlined, EditOutlined, PlaySquareOutlined, SyncOutlined } from '@ant-design/icons'
import { Col, ConfigProvider, Empty, Image, Row, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'

import { CardPacksType, deletePackTC, getPacksTC, updatePackTC } from '../packs-reducer'

import s from './TableForPacks.module.css'

import defaultAva from 'assets/img/icons/default-cover.jpg'
import { DeletePackModal } from 'common/components/Modals/PackModals/DeletePackModal'
import { EditPackModal } from 'common/components/Modals/PackModals/EditPackModal'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { appSelector, packsSelector } from 'common/selectors'

export const TableForPacks = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(appSelector.user)
  const status = useAppSelector(appSelector.status)
  const packName = useAppSelector(packsSelector.packName)

  const navigate = useNavigate()

  const TeachHandler = (id: string) => {
    navigate(`../../learn/${id}`)
  }

  const EditHandler = (packName: string, id: string) => {
    dispatch(updatePackTC(id, packName, false))
  }

  const DeleteHandler = async (id: string) => {
    await dispatch(deletePackTC(id))
    dispatch(getPacksTC())
  }
  const getDate = (dateString: string) => {
    let date = new Date(Date.parse(dateString))

    return date.toLocaleString().slice(0, 10)
  }

  const cardPacks = useAppSelector(packsSelector.cardPacks).map((pack: CardPacksType) => {
    const myActions = [
      <PlaySquareOutlined
        key={uuid4()}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={() => TeachHandler(pack._id)}
        className={pack.cardsCount === 0 ? s.disabledButton : ''}
      />,

      <EditPackModal
        key={uuid4()}
        editPackHandler={EditHandler}
        innerButton={
          pack.entityStatus === 'loading' ? (
            <SyncOutlined spin style={{ fontSize: '15px', marginLeft: '5px' }} />
          ) : (
            <EditOutlined style={{ fontSize: '15px', margin: '0 5px' }} />
          )
        }
        id={pack._id}
      />,
      <DeletePackModal
        key={uuid4()}
        id={pack._id}
        buttonInner={
          pack.entityStatus === 'loading' ? (
            <SyncOutlined spin style={{ fontSize: '15px', marginLeft: '5px' }} />
          ) : (
            <DeleteOutlined style={{ fontSize: '15px', marginLeft: '5px' }} />
          )
        }
        deletePackHandler={DeleteHandler}
        name={pack.name}
      />,
    ]

    const notMyActions = [
      <PlaySquareOutlined
        key={uuid4()}
        style={{ fontSize: '15px', margin: '0 5px' }}
        onClick={() => TeachHandler(pack._id)}
        className={pack.cardsCount === 0 ? s.disabledButton : ''}
      />,
    ]

    let coverImg

    if (pack.deckCover && pack.deckCover.length > 1) {
      coverImg = pack.deckCover.includes('data:image') ? pack.deckCover : defaultAva
    }

    return {
      key: pack._id,
      deckCover: coverImg ? coverImg : defaultAva,
      name:
        pack.entityStatus === 'loading' ? (
          <SyncOutlined spin style={{ fontSize: '15px', marginLeft: '5px' }} />
        ) : (
          <Link to={pack._id}>{pack.name}</Link>
        ),
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
      key: 'name',
      render: (text: any, record: any) => {
        return (
          <div className={s.nameContainer}>
            <div className={s.deckCover}>
              <Image src={record.deckCover} alt={''} />
            </div>
            <div className={s.namePack}>{record.name}</div>
          </div>
        )
      },
      width: '30%',
    },
    {
      title: 'Cards',
      dataIndex: 'cards',
      key: 'cards',
      sorter: (a: any, b: any) => a.cards - b.cards,
      width: '10%',
      //alignItems: 'center',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      width: '10%',
      sorter: (a: any, b: any) => a.lastUpdated.localeCompare(b.lastUpdated),
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: '20%',
      sorter: (a: any, b: any) => (a.createdBy > b.createdBy ? 1 : -1),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '10%',
      render: (actions: any) => actions,
    },
  ]

  return (
    <div className={s.mainContainer}>
      <Row>
        <Col xs={24} span={12}>
          <ConfigProvider
            renderEmpty={cardPacks =>
              cardPacks && !packName ? (
                cardPacks
              ) : (
                <Empty
                  style={{ color: 'black' }}
                  description="Колод с таким названием не нашлось :("
                />
              )
            }
          >
            <Table
              loading={status === 'loading' ? { spinning: true, size: 'large' } : false}
              dataSource={cardPacks}
              tableLayout={'fixed'}
              columns={columns}
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20],
              }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </div>
  )
}
