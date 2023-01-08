import React, { useEffect, useState } from 'react'

import { Col, Input, Slider } from 'antd'

import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { useDebounce } from 'common/hooks/useDebounce'
import { appSelector, packsSelector } from 'common/selectors'

export const CardsCountSlider = (props: CardsCountSliderPropsType) => {
  const dispatch = useAppDispatch()

  const min = useAppSelector(packsSelector.min)
  const max = useAppSelector(packsSelector.max)

  const minCardsCount = useAppSelector(packsSelector.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  // const maxCardsCount = useSelector(state => state.packs.maxCardsCount)
  const status = useAppSelector(appSelector.status)

  const [minCards, setMinCards] = useState(minCardsCount)
  const [maxCards, setMaxCards] = useState(maxCardsCount)

  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)

  const params = props.searchParams

  useEffect(() => {
    if (minCards && !props.searchParams.has('min')) {
      params.append('min', minCards)
    } else if (minCards && props.searchParams.has('min')) {
      params.set('min', minCards)
    }
    props.setSearchParams(params)
  }, [debouncedMinCardsCount])

  useEffect(() => {
    if (maxCards && !props.searchParams.has('max')) {
      params.append('max', maxCards)
    } else if (maxCards && props.searchParams.has('max')) {
      params.set('max', maxCards)
    }
    props.setSearchParams(params)
  }, [debouncedMaxCardsCount])

  // useEffect(() => {
  //   setMinCards(minCardsCount)
  //   setMaxCards(maxCardsCount)
  // }, [maxCardsCount, minCardsCount])

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
          disabled={status === 'loading'}
        />
      </Col>
      <Col xs={1} md={{ span: 1 }}>
        <Input value={maxCards} />
      </Col>
    </>
  )
}

type CardsCountSliderPropsType = {
  setSearchParams: (params: any) => void
  searchParams: any
}
