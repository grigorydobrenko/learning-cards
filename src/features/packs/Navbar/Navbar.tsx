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
        <Col span={8}>
          <SearchComponent />
        </Col>
        <Col span={4}>
          <RadioButtonComponent />
        </Col>
        <CardsCountSlider />
        <Col span={1}>
          <ResetSettingsComponent />
        </Col>
      </Row>
    </div>
  )
}
