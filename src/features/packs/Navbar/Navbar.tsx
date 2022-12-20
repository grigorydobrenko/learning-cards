import React, { useState } from 'react'

import { ClearOutlined } from '@ant-design/icons'
import { Col, InputNumber, Radio, RadioChangeEvent, Row, Slider } from 'antd'
import Search from 'antd/es/input/Search'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../common/selectors'
import { getPacksTC, setMyPacksDataAC } from '../packs-reducer'

import styles from './Navbar.module.css'

export const Navbar = () => {
  const [choosePacks, setChoosePacks] = useState('all')

  const [searchValue, setSearchValue] = useState('')
  const [minCountCardsInPacks, setMinCountCardsInPacks] = useState(1)
  const [maxCountCardsInPacks, setMaxCountCardsInPacks] = useState(20)

  const cardPacks = useAppSelector(packsSelector.cardPacks)
  const userData = useAppSelector(appSelector.user)
  const dispatch = useAppDispatch()
  const onSearchHandler = (value: string) => {
    setSearchValue(value)
    console.log(searchValue)
  }

  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
    if (choosePacks !== 'my' && userData) {
      const myPacks = cardPacks.filter(pack => pack._id === userData._id)

      dispatch(setMyPacksDataAC(myPacks))
    }
    if (choosePacks !== 'all' && userData) {
      dispatch(getPacksTC())
    }
  }
  const onChangeCardsCount = ([minValue, maxValue]: Array<number>) => {
    setMinCountCardsInPacks(minValue)
    setMaxCountCardsInPacks(maxValue)
    console.log([minValue, maxValue])
  }
  const onSetMinCount = (minValue: any) => {
    setMinCountCardsInPacks(minValue)
  }
  const onSetMaxCount = (maxValue: any) => {
    setMaxCountCardsInPacks(maxValue)
  }
  const resetFiltersHandler = () => {
    setChoosePacks('all')
    dispatch(getPacksTC())
    setMinCountCardsInPacks(1)
    setMaxCountCardsInPacks(20)
    setSearchValue('')
    console.log('Filters was reset')
  }

  const options = [
    { label: 'My', value: 'my' },
    { label: 'All', value: 'all' },
  ]

  return (
    <div className={styles.navbar}>
      <Row>
        <Col span={8}>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearchHandler}
            style={{ width: 304 }}
            enterButton
          />
        </Col>
        <Col span={4}>
          <Radio.Group
            options={options}
            onChange={onChangeFilterHandler}
            value={choosePacks}
            optionType="button"
          />
        </Col>

        <Col span={2}>
          <InputNumber value={minCountCardsInPacks} onChange={onSetMinCount} />
        </Col>
        <Col span={6}>
          <Slider
            range={{ draggableTrack: true }}
            value={[minCountCardsInPacks, maxCountCardsInPacks]}
            onChange={onChangeCardsCount}
          />
        </Col>
        <Col span={3}>
          <InputNumber value={maxCountCardsInPacks} onChange={onSetMaxCount} />
        </Col>
        <Col span={1}>
          <ClearOutlined style={{ fontSize: '30px' }} onClick={resetFiltersHandler} />
        </Col>
      </Row>
    </div>
  )
}
