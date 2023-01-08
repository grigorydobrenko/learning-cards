import React from 'react'

import { Button, Radio } from 'antd'

import s from './RadioButton.module.css'

import { useAppSelector } from 'common/hooks/customHooks'
import { appSelector } from 'common/selectors'

export const RadioButtonComponent = (props: RadioButtonPropsType) => {
  const userData = useAppSelector(appSelector.user)
  const status = useAppSelector(appSelector.status)

  const params = props.searchParams
  const myPacksHandler = () => {
    if (userData) params.append('user_id', userData._id)
    props.setSearchParams(params)
  }
  const allPacksHandler = () => {
    if (userData) params.delete('user_id')
    props.setSearchParams(params)
  }

  return (
    <div className={status === 'loading' ? s.disabledButton : ''}>
      <Radio.Group optionType="button">
        <Button disabled={props.searchParams.has('user_id')} onClick={myPacksHandler}>
          My
        </Button>
        <Button disabled={!props.searchParams.has('user_id')} onClick={allPacksHandler}>
          All
        </Button>
      </Radio.Group>
    </div>
  )
}

type RadioButtonPropsType = {
  searchParams: any
  setSearchParams: (params: any) => void
}
