import { Box, Button, Checkbox, IconButton, Typography } from '@mui/material'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'
import closeIcon from '../../../../assets/img/icons/close-icon.svg'

type FormikErrorType = {
  packName?: string
  privatePack?: boolean
}

export const DeletePackModal = (props: { name: string }) => {
  return (
    <BasicModal>
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Delete pack</h6>
        <IconButton
          size="small"
          onClick={() => {
            alert('close modal')
          }}
        >
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.formWrapper}>
        <p>
          Do you really want to remove {props.name}? <br /> All cards will be deleted!
        </p>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            className={style.modalButton}
            type={'reset'}
            sx={{ width: '113px', color: 'black', borderRadius: '30px' }}
          >
            Cancel
          </Button>
          <Button
            className={style.modalButton}
            variant={'contained'}
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
