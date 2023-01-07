import React, { ReactNode, useState } from 'react'

import { Box, Button, Checkbox, IconButton } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { useAppSelector } from '../../../hooks/customHooks'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

import { InputTypeFile } from './InputTypeFile/InputTypeFile'

type FormikErrorType = {
  packName?: string
  privatePack?: boolean
}
type EditPackPropsType = {
  id: string
  isPrivate?: boolean
  innerButton: ReactNode
  editPackHandler: (name: string, id: string) => void
  onClick?: () => void
}
export const EditPackModal = ({
  id,
  isPrivate,
  innerButton,
  editPackHandler,
}: EditPackPropsType) => {
  const _pack = useAppSelector(state => state.packs.cardPacks.filter(pack => pack._id === id)[0])
  const pack = useAppSelector(state => state.cards)
  const [open, setOpen] = useState(false)
  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.packName) {
        errors.packName = 'PackName is required'
      }

      return errors
    },
    initialValues: {
      packName: pack.packName,
      privatePack: isPrivate,
    },
    onSubmit: values => {
      editPackHandler(values.packName, id)
      setOpen(false)
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
      handleClose={handleClose}
      handleOpen={handleOpen}
      children2={innerButton}
    >
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Edit pack</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.contentWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <InputTypeFile id={id} />
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
              type={'reset'}
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
