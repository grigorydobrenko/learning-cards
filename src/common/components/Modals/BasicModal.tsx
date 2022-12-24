import React, { ReactNode } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

type BasicNodalPropsType = {
  children: ReactNode
  children2?: ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #F9F9FA',
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: 0,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%)`,
    },
  })
)

export const BasicModal = ({ children }: BasicNodalPropsType) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.paper}>{children}</Box>
      </Modal>
    </div>
  )
}
