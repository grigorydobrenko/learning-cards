import React, { useEffect, useState } from 'react'

import { ClearOutlined } from '@ant-design/icons'
import { Col, InputNumber, Radio, RadioChangeEvent, Row, Slider } from 'antd'
import Search from 'antd/es/input/Search'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../common/selectors'
import { useDebounce } from '../../../common/utils/debounce'
import {
  getPacksTC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setMyPacksDataAC,
  setSearchDataAC,
} from '../packs-reducer'

import styles from './Navbar.module.css'

export const Navbar = () => {
  const [choosePacks, setChoosePacks] = useState<string>('all')

  const [searchValue, setSearchValue] = useState<string>('')
  const [minCards, setMinCards] = useState<number>(0)
  const [maxCards, setMaxCards] = useState<number>(20)

  const cardPacks = useAppSelector(packsSelector.cardPacks)
  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)
  const pageCount = useAppSelector(packsSelector.pageCount)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)
  const search = useAppSelector(packsSelector.search)
  const userData = useAppSelector(appSelector.user)
  const dispatch = useAppDispatch()

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const debouncedMinCardsCount = useDebounce(minCards, 700)
  const debouncedMaxCardsCount = useDebounce(maxCards, 700)

  useEffect(() => {
    dispatch(getPacksTC())
  }, [search, min, max])

  useEffect(() => {
    dispatch(setSearchDataAC(searchValue))
  }, [debouncedSearchValue])

  useEffect(() => {
    dispatch(setMinCardsCountAC(minCards))
    //dispatch(changeSortAC('1updated'))
    console.log(minCards)
  }, [debouncedMinCardsCount])

  useEffect(() => {
    dispatch(setMaxCardsCountAC(maxCards))
    console.log(maxCards)
  }, [debouncedMaxCardsCount])

  const onSearchHandler = (value: string) => {
    setSearchValue(value)
    console.log(value)
  }

  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
    // if (choosePacks !== 'my' && userData) {
    //   dispatch(setUserIdAC(userData._id))
    //   dispatch(setIsMyPacksAC(true))
    // }

    if (choosePacks !== 'my' && userData) {
      const myPacks = cardPacks.filter(pack => pack._id === userData._id)

      dispatch(setMyPacksDataAC(myPacks))
    }
    if (choosePacks !== 'all' && userData) {
      dispatch(getPacksTC())
    }
  }

  // const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
  //   console.log('radio checked', value)
  //   setChoosePacks(value)
  //   if (choosePacks !== 'my') {
  //     dispatch(setMyPacksDataAC(true))
  //     // dispatch(changeSortAC('1updated'))
  //   }
  //   //dispatch(setMyPacksDataAC(false))
  //
  //   // setChoosePacks(value)
  // }
  const onChangeMinCardsCount = (minValue: number | null) => (minValue ? setMinCards(minValue) : 0)
  const onChangeMaxCardsCount = (maxValue: number | null) => (maxValue ? setMaxCards(maxValue) : 20)

  const onChangeCardsCountSlider = ([minCards, maxCards]: Array<number>) => {
    setMinCards(minCards)
    setMaxCards(maxCards)
    console.log([minCards, maxCards])
  }

  const resetFiltersHandler = () => {
    setChoosePacks('all')
    dispatch(getPacksTC())
    // setMinCountCardsInPacks(0)
    // setMaxCountCardsInPacks(20)
    setMinCards(0)
    setMaxCards(20)
    // setSearchValue('')
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
          <InputNumber value={minCards} onChange={onChangeMinCardsCount} />
        </Col>
        <Col span={6}>
          <Slider
            range={{ draggableTrack: true }}
            value={minCards && maxCards ? [minCards, maxCards] : [0, 20]}
            onChange={onChangeCardsCountSlider}
          />
        </Col>
        <Col span={3}>
          <InputNumber value={maxCards} onChange={onChangeMaxCardsCount} />
        </Col>
        <Col span={1}>
          <ClearOutlined style={{ fontSize: '30px' }} onClick={resetFiltersHandler} />
        </Col>
      </Row>
    </div>
  )
}
