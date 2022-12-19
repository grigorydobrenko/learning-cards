import React, { useState } from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { Col, InputNumber, Radio, RadioChangeEvent, Row, Slider } from 'antd'
import Search from 'antd/es/input/Search'

import styles from './Navbar.module.css'

export const Navbar = () => {
  const [choosePacks, setChoosePacks] = useState('all')
  const [maxCountCardsInPacks, setMaxCountCardsInPacks] = useState(20)
  const [minCountCardsInPacks, setMinCountCardsInPacks] = useState(1)

  const onSearchHandler = () => {}

  const onChangeFilterHandler = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio checked', value)
    setChoosePacks(value)
  }
  const onChangeCardsCount = ([minValue, maxValue]: Array<number>) => {
    setMinCountCardsInPacks(minValue)
    setMaxCountCardsInPacks(maxValue)
    console.log([minValue, maxValue])
  }
  const onSetMinCount = (minValue: any) => {
    setMinCountCardsInPacks(minValue)
  }
  const onSetMaxCount = (maxValue: any) => {
    setMaxCountCardsInPacks(maxValue)
  }
  const resetFiltersHandler = () => {
    console.log('Filters was reset')
  }

  const options = [
    { label: 'My', value: 'my' },
    { label: 'All', value: 'all' },
  ]

  return (
    <div className={styles.navbar}>
      <Row>
        <Col span={9}>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearchHandler}
            style={{ width: 304 }}
            enterButton
          />
        </Col>
        <Col span={3}>
          <Radio.Group
            options={options}
            onChange={onChangeFilterHandler}
            value={choosePacks}
            optionType="button"
          />
        </Col>

        <Col span={2}>
          <InputNumber
            //style={{ margin: '0 16px' }}
            value={minCountCardsInPacks}
            onChange={onSetMinCount}
          />
        </Col>
        <Col span={6}>
          <Slider
            range={{ draggableTrack: true }}
            value={[minCountCardsInPacks, maxCountCardsInPacks]}
            onChange={onChangeCardsCount}
          />
        </Col>
        <Col span={3}>
          <InputNumber
            //style={{ margin: '0 16px' }}
            value={maxCountCardsInPacks}
            onChange={onSetMaxCount}
          />
        </Col>
        <Col span={1}>
          <FilterAltOffOutlinedIcon onClick={resetFiltersHandler} />
        </Col>
      </Row>
    </div>
  )
}
