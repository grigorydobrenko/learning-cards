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

  const [searchValue, setSearchValue] = useState<string | null>(packName)

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  useEffect(() => {
    if (searchValue) {
      dispatch(setSearchDataAC(searchValue))
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (packName === null) {
      setSearchValue(null)
    }
  }, [packName])

  return (
    <>
      <Input
        value={searchValue ? searchValue : ''}
        placeholder={searchValue ? searchValue : 'input search text'}
        allowClear
        onChange={onSearchHandler}
        disabled={status === 'loading'}
        //style={{ width: 250 }}
      />
    </>
  )
}
