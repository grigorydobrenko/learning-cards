import React from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { PATH } from '../Routing/Routes'

export const NotFound = () => {
  return (
    <div>
      not found
      <Button variant="text">
        <NavLink to={PATH.PACKS}>Go back to PACKS</NavLink>
      </Button>
    </div>
  )
}
