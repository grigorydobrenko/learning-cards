import React, { useEffect } from 'react'

import { Button } from '@mui/material'
import { Col, Divider, Row } from 'antd'
import Title from 'antd/lib/typography/Title'

import { AddPackModal } from '../../common/components/Modals/PackModals/AddPackModal'
import { useAppDispatch, useAppSelector } from '../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../common/selectors'

import { Navbar } from './Navbar/Navbar'
import { addNewPackTC, getPacksTC } from './packs-reducer'
import styles from './Packs.module.css'
import { TableForPacks } from './TableForPacks/TableForPacks'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appSelector.status)
  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)
  const packName = useAppSelector(packsSelector.packName)
  const user_id = useAppSelector(packsSelector.user_id)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)

  const addNewPackHandler = (name: string) => {
    dispatch(addNewPackTC(name))
  }

  useEffect(() => {
    dispatch(getPacksTC())
  }, [min, max, packName, user_id])

  return (
    <div className={styles.mainContainer}>
      <Divider />
      <div className={styles.head}>
        <Title level={2}>{isMyPacks === 'all' ? 'Packs list' : 'My packs'}</Title>
        <div className={status === 'loading' ? styles.disabledButton : ''}>
          <AddPackModal
            addPackHandler={addNewPackHandler}
            buttonInner={
              <Button variant="contained" sx={{ borderRadius: '30px' }}>
                Add new pack
              </Button>
            }
          />
        </div>
      </div>
      <Navbar />
      <div>
        <Row>
          <Col xs={24}>
            <TableForPacks />
          </Col>
        </Row>
      </div>
    </div>
  )
}
