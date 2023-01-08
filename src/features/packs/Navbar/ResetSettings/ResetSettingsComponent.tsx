import React from 'react'

import { ClearOutlined } from '@ant-design/icons'

import { clearLocalStorage } from '../../../../common/localStorage/clearLocalStorage'
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

export const ResetSettingsComponent = (props: ResetSettingsPropsType) => {
  //const dispatch = useAppDispatch()
  const status = useAppSelector(appSelector.status)

  const resetFiltersHandler = () => {
    props.setSearchParams({})
    // dispatch(setUserIdAC(''))
    // dispatch(setMinCardsCountAC(0))
    // dispatch(setMaxCardsCountAC(20))
    // dispatch(setSearchDataAC(''))
    // dispatch(setIsMyPacksAC(null))
    // clearLocalStorage('userId')
  }

  return (
    <div className={status === 'loading' ? s.disabledButton : ''}>
      <ClearOutlined style={{ fontSize: '28px' }} onClick={resetFiltersHandler} />
    </div>
  )
}

type ResetSettingsPropsType = {
  setSearchParams: (params: any) => void
}
