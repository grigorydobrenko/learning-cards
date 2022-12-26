import React, { useState } from 'react'

import { Radio, RadioChangeEvent } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { appSelector, packsSelector } from '../../../../common/selectors'
import { getPacksTC, setUserIdAC } from '../../packs-reducer'

export const RadioButtonComponent = () => {
  const dispatch = useAppDispatch()

  const userData = useAppSelector(appSelector.user)
  const isMyPacks = useAppSelector(packsSelector.isMyPacks)

  const [choosePacks, setChoosePacks] = useState<string>(isMyPacks)
  const onChangeFilterHandler = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setChoosePacks(e.target.value)
    if (choosePacks !== 'my' && userData) {
      dispatch(setUserIdAC(userData._id))
      //dispatch(setIsMyPacksAC(true))
    } else {
      dispatch(setUserIdAC(''))
      //dispatch(setIsMyPacksAC(false))
    }
    dispatch(getPacksTC())
  }
  // const options = [
  //   { label: 'My', value: true },
  //   { label: 'All', value: false },
  // ]

  // useEffect(() => {
  //   dispatch(getPacksTC())
  //   console.log('useEffect [user_id] in RadioButtonComponent worked')
  // }, [isMyPacks])

  return (
    <>
      <Radio.Group
        // options={options}
        onChange={onChangeFilterHandler}
        // value={choosePacks}
        // optionType="button"
      >
        <Radio.Button checked={choosePacks !== 'all'} value="my">
          My
        </Radio.Button>
        <Radio.Button checked={choosePacks !== 'my'} value="all">
          All
        </Radio.Button>
      </Radio.Group>
    </>
  )
}
