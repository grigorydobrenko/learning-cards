import React, { ChangeEvent, useEffect, useState } from 'react'

import Search from 'antd/lib/input/Search'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/customHooks'
import { packsSelector } from '../../../../common/selectors'
import { useDebounce } from '../../../../common/utils/debounce'
import { getPacksTC, setSearchDataAC } from '../../packs-reducer'

export const SearchComponent = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(packsSelector.packName)

  const [searchValue, setSearchValue] = useState<string | null>(packName)

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    console.log('onSearchHandler: ', e.currentTarget.value)
  }

  useEffect(() => {
    if (searchValue) {
      dispatch(setSearchDataAC(searchValue))
    } else if (searchValue === '') {
      dispatch(setSearchDataAC(null))
      dispatch(getPacksTC())
    }

    console.log('useEffect [debouncedSearchValue] in SearchComponent worked')
  }, [debouncedSearchValue])

  useEffect(() => {
    if (packName) {
      dispatch(getPacksTC())
    } else {
      setSearchValue(null)
    }

    //setSearchValue(packName)
    console.log('useEffect [packName] in SearchComponent worked')
  }, [packName])

  return (
    <>
      <Search
        //placeholder="input search text"
        value={searchValue ? searchValue : ''}
        //placeholder={searchValue ? searchValue : 'input search text'}
        // value={searchValue ? searchValue : ''}
        allowClear
        onChange={onSearchHandler}
        style={{ width: 250 }}
      />
    </>
  )
}
