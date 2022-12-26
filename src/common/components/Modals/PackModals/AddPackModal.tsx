import React, { ReactNode } from 'react'

import { Box, Button, Checkbox, IconButton } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

type FormikErrorType = {
  packName?: string
  privatePack?: boolean
}
type AddPackModalPT = {
  buttonInner: ReactNode | string
  addPackHandler: (name: string) => void
}

export const AddPackModal = ({ buttonInner, addPackHandler }: AddPackModalPT) => {
  const [open, setOpen] = React.useState(false)
  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'PackName is required'
      }

      return errors
    },
    initialValues: {
      packName: '',
      privatePack: false,
    },
    onSubmit: values => {
      addPackHandler(values.packName)
      setOpen(false)
      formik.resetForm()
    },
  })
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  return (
    <BasicModal
      open={open}
      handleOpen={handleOpen}
      handleClose={handleClose}
      children2={buttonInner}
    >
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Add new pack</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.contentWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <TextField
            variant="standard"
            label="Pack name"
            {...formik.getFieldProps('packName')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.packName && <div style={{ color: 'red' }}>{formik.errors.packName}</div>}
          <FormControlLabel
            label={'Private pack'}
            control={<Checkbox />}
            {...formik.getFieldProps('privatePack')}
            checked={formik.values.privatePack}
          />
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
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ width: '127px', color: 'white', borderRadius: '30px' }}
            >
              Save
            </Button>
          </Box>
        </form>
      </div>
    </BasicModal>
  )
}
