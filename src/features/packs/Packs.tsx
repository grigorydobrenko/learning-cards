import React, { useEffect } from 'react'

import { Button, Col, Divider, Row } from 'antd'
import Title from 'antd/lib/typography/Title'

import { useAppDispatch } from '../../common/hooks/customHooks'

import { Navbar } from './Navbar/Navbar'
import { addNewPackTC, getPacksTC } from './packs-reducer'
import styles from './Packs.module.css'
import { TableForPacks } from './TableForPacks'

export const Packs = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [])
  const addNewPackHandler = () => {
    dispatch(addNewPackTC())
    dispatch(getPacksTC())
  }

  return (
    <div className={styles.mainContainer}>
      <Divider />
      <div className={styles.head}>
        <Title level={2}>Packs list</Title>
        <Button onClick={addNewPackHandler}> Add new pack</Button>
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
