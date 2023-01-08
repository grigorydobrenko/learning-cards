import React, { useEffect } from 'react'

import { Col, Row } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from '../../../common/hooks/customHooks'
import { getPacksTC } from '../packs-reducer'

import { CardsCountSlider } from './CardsCountSlider/CardsCountSlider'
import styles from './Navbar.module.css'
import { RadioButtonComponent } from './RadioButton/RadioButtonComponent'
import { ResetSettingsComponent } from './ResetSettings/ResetSettingsComponent'
import { SearchComponent } from './Search/SearchComponent'

export const Navbar = (props: NavbarPropsType) => {
  return (
    <div className={styles.navbar}>
      <Row>
        <Col xs={6} md={{ span: 6 }}>
          <SearchComponent
            searchParams={props.searchParams}
            setSearchParams={props.setSearchParams}
          />
        </Col>
        <Col xs={3} md={{ span: 3, offset: 2 }}>
          <RadioButtonComponent
            searchParams={props.searchParams}
            setSearchParams={props.setSearchParams}
          />
        </Col>
        <CardsCountSlider
          searchParams={props.searchParams}
          setSearchParams={props.setSearchParams}
        />
        <Col xs={1} md={{ span: 1, offset: 1 }}>
          <ResetSettingsComponent setSearchParams={props.setSearchParams} />
        </Col>
      </Row>
    </div>
  )
}

type NavbarPropsType = {
  setSearchParams: (params: any) => void
  searchParams: any
}
