import React from 'react'

import { ClearOutlined } from '@ant-design/icons'

import {
  setIsMyPacksAC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setSearchDataAC,
  setUserIdAC,
} from '../../packs-reducer'

import s from './ResetSettings.module.css'

import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { appSelector } from 'common/selectors'

export const ResetSettingsComponent = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appSelector.status)

  const resetFiltersHandler = () => {
    dispatch(setUserIdAC(''))
    dispatch(setMinCardsCountAC(0))
    dispatch(setMaxCardsCountAC(20))
    dispatch(setSearchDataAC(null))
    dispatch(setIsMyPacksAC('all'))
  }

  return (
    <div className={status === 'loading' ? s.disabledButton : ''}>
      <ClearOutlined style={{ fontSize: '28px' }} onClick={resetFiltersHandler} />
    </div>
  )
}
