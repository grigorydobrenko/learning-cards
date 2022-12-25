import React, { useState } from 'react'

import { Radio, RadioChangeEvent } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { appSelector } from '../../../../common/selectors'
import { getPacksTC, setUserIdAC } from '../../packs-reducer'

export const RadioButtonComponent = () => {
  const dispatch = useAppDispatch()

  const userData = useAppSelector(appSelector.user)
  //const user_id = useAppSelector(packsSelector.user_id)

  const [choosePacks, setChoosePacks] = useState<string>('all')
  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
    if (choosePacks !== 'my' && userData) {
      dispatch(setUserIdAC(userData._id))
    } else {
      dispatch(setUserIdAC(''))
    }
    dispatch(getPacksTC())
  }
  const options = [
    { label: 'My', value: 'my' },
    { label: 'All', value: 'all' },
  ]

  /* useEffect(() => {
    dispatch(getPacksTC())
    console.log('useEffect [user_id] in RadioButtonComponent worked')
  }, [user_id])*/

  return (
    <>
      <Radio.Group
        options={options}
        onChange={onChangeFilterHandler}
        value={choosePacks}
        optionType="button"
      />
    </>
  )
}
