import React from 'react'

import { Skeleton } from '@mui/material'
import Stack from '@mui/material/Stack'

export const MyLoader = () => (
  <Stack spacing={1.5} sx={{ marginTop: '30px' }}>
    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />

    <Skeleton variant="rounded" width={310} height={40} />
  </Stack>
)
