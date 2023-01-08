import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from 'antd'

import { useAppSelector } from 'common/hooks/customHooks'
import { useDebounce } from 'common/hooks/useDebounce'
import { appSelector } from 'common/selectors'

export const SearchComponent = (props: SearchComponentPropsType) => {
  const status = useAppSelector(appSelector.status)

  const packsQuery = props.searchParams.get('packName') || ''
  const [searchValue, setSearchValue] = useState<string>(packsQuery)

  const debouncedSearchValue = useDebounce(searchValue, 700)
  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (packsQuery === '') setSearchValue('')
  }, [packsQuery])

  const params = props.searchParams

  useEffect(() => {
    if (searchValue && !props.searchParams.has('packName')) {
      params.append('packName', searchValue)
    } else if (searchValue && props.searchParams.has('packName')) {
      params.set('packName', searchValue)
    } else {
      params.delete('packName')
    }
    props.setSearchParams(params)
  }, [debouncedSearchValue])

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

type SearchComponentPropsType = {
  setSearchParams: (params: any) => void
  searchParams: any
}
