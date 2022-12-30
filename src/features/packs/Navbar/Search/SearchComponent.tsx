import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import { setSearchDataAC } from '../../packs-reducer'

import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { useDebounce } from 'common/hooks/useDebounce'
import { appSelector, packsSelector } from 'common/selectors'

export const SearchComponent = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(packsSelector.packName)
  const status = useAppSelector(appSelector.status)

  const [searchValue, setSearchValue] = useState<string>(packName)

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }

  useEffect(() => {
    if (searchValue) {
      dispatch(setSearchDataAC(searchValue))
    } else {
      dispatch(setSearchDataAC(''))
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (packName === '') {
      setSearchValue('')
    }
  }, [packName])

  return (
    <>
      <Input.Search
        loading={status === 'loading'}
        placeholder="input search text"
        value={searchValue}
        allowClear
        onChange={onSearchHandler}
        disabled={status === 'loading'}
        style={{ width: 250 }}
      />
    </>
  )
}
