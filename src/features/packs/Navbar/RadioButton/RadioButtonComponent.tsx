import React, { useState } from 'react'

import { Button, Radio } from 'antd'

import { clearLocalStorage } from '../../../../common/localStorage/clearLocalStorage'
import { saveStateToLocalStorage } from '../../../../common/localStorage/saveStateToLocalStorage'
import { setIsMyPacksAC, setUserIdAC } from '../../packs-reducer'

import s from './RadioButton.module.css'

import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { appSelector, packsSelector } from 'common/selectors'

export const RadioButtonComponent = () => {
  const dispatch = useAppDispatch()

  const userData = useAppSelector(appSelector.user)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)
  const status = useAppSelector(appSelector.status)

  const [choosePacks, setChoosePacks] = useState<string | null>(isMyPacks)

  const myPacksHandler = () => {
    if (choosePacks !== 'my' && userData) {
      dispatch(setUserIdAC(userData._id))
      setChoosePacks('all')
      saveStateToLocalStorage('userId', userData._id)
      dispatch(setIsMyPacksAC('my'))
    }
  }
  const allPacksHandler = () => {
    dispatch(setUserIdAC(''))
    setChoosePacks('all')
    clearLocalStorage('userId')
    dispatch(setIsMyPacksAC('all'))
  }

  return (
    <div className={status === 'loading' ? s.disabledButton : ''}>
      <Radio.Group optionType="button">
        <Button disabled={isMyPacks === 'my'} onClick={myPacksHandler}>
          My
        </Button>
        <Button disabled={isMyPacks === 'all'} onClick={allPacksHandler}>
          All
        </Button>
      </Radio.Group>
    </div>
  )
}
