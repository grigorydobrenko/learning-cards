import React, { useEffect, useState } from 'react'

import { Col, Input, Slider } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from 'common/hooks/customHooks'
import { useDebounce } from 'common/hooks/useDebounce'
import { appSelector, packsSelector } from 'common/selectors'

export const CardsCountSlider = () => {
  const minCardsCount = useAppSelector(packsSelector.minCardsCount)
  const maxCardsCount = useAppSelector(packsSelector.maxCardsCount)
  const status = useAppSelector(appSelector.status)

  const [minCards, setMinCards] = useState(minCardsCount)
  const [maxCards, setMaxCards] = useState(maxCardsCount)
  const [touchedSlider, setTouchedSlider] = useState(false)

  const debouncedMinCardsCount = useDebounce(minCards, 1000)
  const debouncedMaxCardsCount = useDebounce(maxCards, 1000)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (touchedSlider) {
      if (debouncedMinCardsCount === minCardsCount) {
        searchParams.delete('min')
      } else {
        searchParams.has('min')
          ? searchParams.set('min', '' + minCards)
          : searchParams.append('min', '' + minCards)
      }

      setSearchParams(searchParams)
    }
  }, [debouncedMinCardsCount])
  useEffect(() => {
    if (touchedSlider) {
      if (debouncedMaxCardsCount === maxCardsCount) {
        searchParams.delete('max')
      } else {
        searchParams.has('max')
          ? searchParams.set('max', '' + maxCards)
          : searchParams.append('max', '' + maxCards)
      }

      setSearchParams(searchParams)
    }
  }, [debouncedMaxCardsCount])

  useEffect(() => {
    searchParams.has('min')
      ? setMinCards(Number(searchParams.get('min')))
      : setMinCards(minCardsCount)

    searchParams.has('max')
      ? setMaxCards(Number(searchParams.get('max')))
      : setMaxCards(maxCardsCount)

    if (!searchParams.has('min') && !searchParams.has('max')) {
      setTouchedSlider(false)
    }
  }, [minCardsCount, maxCardsCount, searchParams])

  const onChangeCardsCountSlider = ([minCards, maxCards]: Array<number>) => {
    !touchedSlider && setTouchedSlider(true)
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
