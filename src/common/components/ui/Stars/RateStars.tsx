import React from 'react'

import { Rate } from 'antd'

type Props = {
  rating: number
}

export const RateStars = (props: Props) => {
  const { rating } = props

  return (
    <>
      <Rate allowHalf defaultValue={rating} />
    </>
  )
}
