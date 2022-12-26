import { ReactNode } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

type BasicModalPropsType = {
  open: boolean
  handleClose: () => void
  handleOpen: () => void
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

export const BasicModal = ({
  children,
  open,
  handleClose,
  handleOpen,
  children2,
}: BasicModalPropsType) => {
  const classes = useStyles()

  return (
    <div style={{ display: 'inline-block', cursor: 'pointer' }}>
      <div onClick={handleOpen}>{children2}</div>

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
