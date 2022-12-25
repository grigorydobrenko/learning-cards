import React, { useEffect, useState } from 'react'

import { Col, Input, Slider } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { packsSelector } from '../../../../common/selectors'
import { getPacksTC, setMaxCardsCountAC, setMinCardsCountAC } from '../../packs-reducer'

export const CardsCountSlider = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)
  // const minCardsCount = useAppSelector(packsSelector.minCardsCount)
  // const maxCardsCount = useAppSelector(packsSelector.maxCardsCount)

  const [minCards, setMinCards] = useState<number>(min)
  const [maxCards, setMaxCards] = useState<number>(max)

  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)

  useEffect(() => {
    dispatch(setMinCardsCountAC(minCards))

    console.log('useEffect -> setMinCardsCountAC: worked', minCards)
  }, [debouncedMinCardsCount])

  useEffect(() => {
    dispatch(setMaxCardsCountAC(maxCards))

    console.log('useEffect -> setMaxCardsCountAC: worked', maxCards)
  }, [debouncedMaxCardsCount])

  useEffect(() => {
    setMinCards(min)
    setMaxCards(max)
    dispatch(getPacksTC())

    console.log('useEffect [min, max] in CardsCountSlider worked')
  }, [min, max])

  const onChangeCardsCountSlider = ([minCards, maxCards]: Array<number>) => {
    setMinCards(minCards)
    setMaxCards(maxCards)
    console.log([minCards, maxCards])
  }

  return (
    <>
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
    </>
  )
}
