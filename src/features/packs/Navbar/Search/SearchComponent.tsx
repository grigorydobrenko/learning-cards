import React, { ChangeEvent, useEffect, useState } from 'react'

import Search from 'antd/lib/input/Search'

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
    setSearchValue(e.target.value)
    console.log(e.target.value)
  }

  useEffect(() => {
    if (searchValue) {
      dispatch(setSearchDataAC(searchValue))
    } else {
      dispatch(setSearchDataAC(null))
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    if (packName === null) {
      setSearchValue(null)
    }
  }, [packName])

  return (
    <>
      <Search
        placeholder="input search text"
        allowClear
        onChange={onSearchHandler}
        disabled={status === 'loading'}
        style={{ width: 250 }}
      />
    </>
  )
}
