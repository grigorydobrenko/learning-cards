import React from 'react'

import { Button, Col, Divider, Row } from 'antd'
import Title from 'antd/lib/typography/Title'

import { useAppDispatch } from '../../common/hooks/customHooks'

import { Navbar } from './Navbar/Navbar'
import { addNewPackTC } from './packs-reducer'
import styles from './Packs.module.css'
import { TableForPacks } from './TableForPacks/TableForPacks'

import { AddPackModal } from '../../common/components/Modals/PackModals/AddPackModal'
import { Button, CircularProgress } from '@mui/material'
import { appSelector } from '../../common/selectors'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appSelector.status)

  const addNewPackHandler = (name: string) => {
    dispatch(addNewPackTC(name))
  }

  return (
    <div className={styles.mainContainer}>
      <Divider />
      <div className={styles.head}>
        <Title level={2}>Packs list</Title>
        <AddPackModal
          addPackHandler={addNewPackHandler}
          buttonInner={
            <Button variant="contained" sx={{ borderRadius: '30px' }}>
              Add new pack
            </Button>
          }
        />
      </div>
      <Navbar />
      <div>
        <Row>
          <Col xs={24}>
            {status === 'loading' ? (
              <CircularProgress size="30px" className="circularProgress" />
            ) : (
              <TableForPacks />
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
