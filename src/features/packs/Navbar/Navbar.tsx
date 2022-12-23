import React, { ChangeEvent, useEffect, useState } from 'react'

import { ClearOutlined } from '@ant-design/icons'
import { Col, Input, Radio, RadioChangeEvent, Row, Slider } from 'antd'
import Search from 'antd/lib/input/Search'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../common/selectors'
import { useDebounce } from '../../../common/utils/debounce'
import {
  getPacksTC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setSearchDataAC,
  setUserIdAC,
} from '../packs-reducer'

import styles from './Navbar.module.css'

export const Navbar = () => {
  //const cardPacks = useAppSelector(packsSelector.cardPacks)
  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)
  const user_id = useAppSelector(packsSelector.user_id)
  const packName = useAppSelector(packsSelector.packName)
  // const isMyPacks = useAppSelector(packsSelector.isMyPacks)
  //const search = useAppSelector(packsSelector.search)
  const userData = useAppSelector(appSelector.user)

  const dispatch = useAppDispatch()

  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [minCards, setMinCards] = useState<number>(min)
  const [maxCards, setMaxCards] = useState<number>(max)
  const [choosePacks, setChoosePacks] = useState<string>('all')

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [min, max, user_id, packName])

  // useEffect(() => {
  //   dispatch(setUserIdAC(''))
  // }, [searchValue])

  useEffect(() => {
    dispatch(setSearchDataAC(searchValue))
  }, [debouncedSearchValue])

  useEffect(() => {
    dispatch(setMinCardsCountAC(minCards))
    // dispatch(changeSortAC('1updated'))
    console.log('setMinCardsCountAC: ', minCards)
  }, [debouncedMinCardsCount])

  useEffect(() => {
    dispatch(setMaxCardsCountAC(maxCards))
    // dispatch(changeSortAC('1updated'))
    console.log('setMaxCardsCountAC: ', maxCards)
  }, [debouncedMaxCardsCount])

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    console.log('onSearchHandler: ', e.currentTarget.value)
  }

  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
    if (choosePacks !== 'my' && userData) {
      dispatch(setUserIdAC(userData._id))
    } else {
      dispatch(setUserIdAC(''))
    }
  }

  const onChangeCardsCountSlider = ([minCards, maxCards]: Array<number>) => {
    setMinCards(minCards)
    setMaxCards(maxCards)
    console.log([minCards, maxCards])
  }

  const resetFiltersHandler = () => {
    setChoosePacks('all')
    setMinCards(0)
    setMaxCards(20)
    setSearchValue(null)
    dispatch(setUserIdAC(''))
    // dispatch(changeSortAC('0updated'))
    // dispatch(getPacksTC())
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
            onChange={onSearchHandler}
            style={{ width: 250 }}
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
          <Input value={minCards} />
        </Col>
        <Col span={6}>
          <Slider
            range={{ draggableTrack: true }}
            value={[minCards, maxCards]}
            onChange={onChangeCardsCountSlider}
          />
        </Col>
        <Col span={3}>
          <Input value={maxCards} />
        </Col>
        <Col span={1}>
          <ClearOutlined style={{ fontSize: '30px' }} onClick={resetFiltersHandler} />
        </Col>
      </Row>
    </div>
  )
}
