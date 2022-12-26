import React, { useEffect, useState } from 'react'

import { Col, Input, Slider } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { useDebounce } from '../../../../common/hooks/useDebounce'
import { packsSelector } from '../../../../common/selectors'
import { setMaxCardsCountAC, setMinCardsCountAC } from '../../packs-reducer'

export const CardsCountSlider = () => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)

  const [minCards, setMinCards] = useState<number>(min)
  const [maxCards, setMaxCards] = useState<number>(max)

  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)

  useEffect(() => {
    dispatch(setMinCardsCountAC(minCards))
  }, [debouncedMinCardsCount])

  useEffect(() => {
    dispatch(setMaxCardsCountAC(maxCards))
  }, [debouncedMaxCardsCount])

  useEffect(() => {
    setMinCards(min)
    setMaxCards(max)
  }, [min, max])

  const onChangeCardsCountSlider = ([minCards, maxCards]: Array<number>) => {
    setMinCards(minCards)
    setMaxCards(maxCards)
  }

  return (
    <>
      <Col xs={1} md={{ span: 1, offset: 1 }}>
        <Input value={minCards} />
      </Col>
      <Col xs={8} md={{ span: 8 }}>
        <Slider
          range={{ draggableTrack: true }}
          value={[minCards, maxCards]}
          onChange={onChangeCardsCountSlider}
        />
      </Col>
      <Col xs={1} md={{ span: 1 }}>
        <Input value={maxCards} />
      </Col>
    </>
  )
}
