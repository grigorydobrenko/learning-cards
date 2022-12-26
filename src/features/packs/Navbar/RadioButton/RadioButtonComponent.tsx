import React, { useState } from 'react'

import { Button, Radio } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../../common/selectors'
import { setIsMyPacksAC, setUserIdAC } from '../../packs-reducer'

export const RadioButtonComponent = () => {
  const dispatch = useAppDispatch()

  const userData = useAppSelector(appSelector.user)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)

  const [choosePacks, setChoosePacks] = useState<string>(isMyPacks)

  const myPacksHandler = () => {
    if (choosePacks !== 'my' && userData) {
      dispatch(setUserIdAC(userData._id))
      setChoosePacks('all')
      dispatch(setIsMyPacksAC('my'))
    }
  }
  const allPacksHandler = () => {
    dispatch(setUserIdAC(''))
    setChoosePacks('all')
    dispatch(setIsMyPacksAC('all'))
  }

  return (
    <>
      <Radio.Group optionType="button">
        <Button disabled={isMyPacks === 'my'} onClick={myPacksHandler}>
          My
        </Button>
        <Button disabled={isMyPacks === 'all'} onClick={allPacksHandler}>
          All
        </Button>
      </Radio.Group>
    </>
  )
}
