import React, { useEffect, useState } from 'react'

import { ClearOutlined } from '@ant-design/icons'
import { Col, InputNumber, Radio, RadioChangeEvent, Row, Slider } from 'antd'
import Search from 'antd/es/input/Search'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { packsSelector } from '../../../common/selectors'
import {
  getPacksTC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setMyPacksDataAC,
  setSearchDataAC,
} from '../packs-reducer'

import styles from './Navbar.module.css'

export const Navbar = () => {
  const [choosePacks, setChoosePacks] = useState('all')

  const [searchValue, setSearchValue] = useState('')
  // const [minCountCardsInPacks, setMinCountCardsInPacks] = useState(0)
  // const [maxCountCardsInPacks, setMaxCountCardsInPacks] = useState(20)

  // const cardPacks = useAppSelector(packsSelector.cardPacks)
  const minCountCardsInPacks = useAppSelector(packsSelector.minCountCardsInPacks)
  const maxCountCardsInPacks = useAppSelector(packsSelector.maxCountCardsInPacks)
  const pageCount = useAppSelector(packsSelector.pageCount)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)
  // const userData = useAppSelector(appSelector.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [pageCount, isMyPacks])
  const onSearchHandler = (value: string) => {
    dispatch(setSearchDataAC(value))
    console.log(searchValue)
  }

  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
    if (choosePacks !== 'my') {
      dispatch(setMyPacksDataAC(true))
      // dispatch(changeSortAC('1updated'))
    }
    //dispatch(setMyPacksDataAC(false))

    // setChoosePacks(value)
  }
  const onSetMinCount = (minValue: number | null) =>
    minValue ? dispatch(setMinCardsCountAC(minValue)) : 0
  const onSetMaxCount = (maxValue: number | null) =>
    maxValue ? dispatch(setMaxCardsCountAC(maxValue)) : 20

  const onChangeCardsCountSlider = ([minValue, maxValue]: Array<number>) => {
    dispatch(setMinCardsCountAC(minValue))
    dispatch(setMaxCardsCountAC(maxValue))
    // setMinCountCardsInPacks(minValue)
    // setMaxCountCardsInPacks(maxValue)
    console.log([minValue, maxValue])
  }

  const resetFiltersHandler = () => {
    setChoosePacks('all')
    dispatch(getPacksTC())
    // setMinCountCardsInPacks(0)
    // setMaxCountCardsInPacks(20)
    dispatch(setMinCardsCountAC(0))
    dispatch(setMaxCardsCountAC(20))
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
            value={
              minCountCardsInPacks && maxCountCardsInPacks
                ? [minCountCardsInPacks, maxCountCardsInPacks]
                : [0, 20]
            }
            onChange={onChangeCardsCountSlider}
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
