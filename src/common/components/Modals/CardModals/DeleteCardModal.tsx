import React, { ReactNode } from 'react'

import { Box, Button, IconButton } from '@mui/material'

import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

type DeleteCardModalPropsType = {
  question: string
  innerButton: ReactNode
  deleteCardHandler: () => void
}

export const DeleteCardModal = (props: DeleteCardModalPropsType) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    props.deleteCardHandler()
    setOpen(false)
  }

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      children2={props.innerButton}
    >
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Delete pack</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.contentWrapper}>
        <p>
          Do you really want to remove {props.question}? <br /> Card will be deleted!
        </p>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            className={style.modalButton}
            onClick={handleClose}
            sx={{ width: '113px', color: 'black', borderRadius: '30px' }}
          >
            Cancel
          </Button>
          <Button
            className={style.modalButton}
            variant={'contained'}
            color="error"
            onClick={handleDelete}
            sx={{
              width: '127px',
              color: 'white',
              borderRadius: '30px',
              backgroundColor: '#FF3636',
            }}
          >
            Delete
          </Button>
        </Box>
      </div>
    </BasicModal>
  )
}
