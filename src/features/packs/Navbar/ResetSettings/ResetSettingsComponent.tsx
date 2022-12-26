import React from 'react'

import { ClearOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../../common/hooks/customHooks'
import {
  setIsMyPacksAC,
  setMaxCardsCountAC,
  setMinCardsCountAC,
  setSearchDataAC,
  setUserIdAC,
} from '../../packs-reducer'

export const ResetSettingsComponent = () => {
  const dispatch = useAppDispatch()

  const resetFiltersHandler = () => {
    dispatch(setUserIdAC(''))
    dispatch(setMinCardsCountAC(0))
    dispatch(setMaxCardsCountAC(20))
    dispatch(setSearchDataAC(null))
    dispatch(setIsMyPacksAC('all'))
  }

  return (
    <div>
      <ClearOutlined style={{ fontSize: '28px' }} onClick={resetFiltersHandler} />
    </div>
  )
}
