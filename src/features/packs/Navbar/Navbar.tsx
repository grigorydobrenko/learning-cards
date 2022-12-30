import React from 'react'

import { Col, Row } from 'antd'

import { CardsCountSlider } from './CardsCountSlider/CardsCountSlider'
import styles from './Navbar.module.css'
import { RadioButtonComponent } from './RadioButton/RadioButtonComponent'
import { ResetSettingsComponent } from './ResetSettings/ResetSettingsComponent'
import { SearchComponent } from './Search/SearchComponent'

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Row>
        <Col xs={6} md={{ span: 6 }}>
          <SearchComponent />
        </Col>
        <Col xs={3} md={{ span: 3, offset: 2 }}>
          <RadioButtonComponent />
        </Col>
        <CardsCountSlider />

        <Col xs={1} md={{ span: 1, offset: 1 }}>
          <ResetSettingsComponent />
        </Col>
      </Row>
    </div>
  )
}
