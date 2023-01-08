import React, { useEffect, useState } from 'react'

import { Col, Input, Slider } from 'antd'

import { useAppSelector } from 'common/hooks/customHooks'
import { useDebounce } from 'common/hooks/useDebounce'
import { appSelector, packsSelector } from 'common/selectors'

export const CardsCountSlider = (props: CardsCountSliderPropsType) => {
  const minCardsCount = useAppSelector(packsSelector.minCardsCount)
  const maxCardsCount = useAppSelector(packsSelector.maxCardsCount)
  const status = useAppSelector(appSelector.status)

  const [minCards, setMinCards] = useState(minCardsCount)
  const [maxCards, setMaxCards] = useState(maxCardsCount)
  const [touchedSlider, setTouchedSlider] = useState(false)

  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)

  const params = props.searchParams

  useEffect(() => {
    if (touchedSlider) {
      props.searchParams.has('min') ? params.set('min', minCards) : params.append('min', minCards)

      props.setSearchParams(params)
    }
  }, [debouncedMinCardsCount])
  useEffect(() => {
    if (touchedSlider) {
      props.searchParams.has('max') ? params.set('max', maxCards) : params.append('max', maxCards)

      props.setSearchParams(params)
    }
  }, [debouncedMaxCardsCount])

  useEffect(() => {
    props.searchParams.has('min')
      ? setMinCards(props.searchParams.get('min'))
      : setMinCards(minCardsCount)
    props.searchParams.has('max')
      ? setMaxCards(props.searchParams.get('max'))
      : setMaxCards(maxCardsCount)
    if (!props.searchParams.has('min') && !props.searchParams.has('max')) {
      setTouchedSlider(false)
    }
  }, [minCardsCount, maxCardsCount, props.searchParams])

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
          onAfterChange={() => setTouchedSlider(true)}
          max={maxCardsCount}
          min={minCardsCount}
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
