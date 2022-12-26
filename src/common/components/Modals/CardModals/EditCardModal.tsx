import React, { ReactNode, useEffect } from 'react'

import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { useAppSelector } from '../../../hooks/customHooks'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

type FormikErrorType = {
  question?: string
  answer?: string
}
type EditCardPropsType = {
  cardId: string
  innerButton: ReactNode
  editCardHandler: (id: string, question: string, answer: string) => void
}
export const EditCardModal = ({ cardId, innerButton, editCardHandler }: EditCardPropsType) => {
  const card = useAppSelector(state => state.cards.cards.filter(c => c._id === cardId)[0])
  const [open, setOpen] = React.useState(false)
  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.question) {
        errors.question = 'Question is required'
      }
      if (!values.answer) {
        errors.answer = 'Answer is required'
      }

      return errors
    },
    initialValues: {
      question: card.question,
      answer: card.answer,
      format: '',
    },
    onSubmit: values => {
      editCardHandler(card._id, values.question, values.answer)
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

  useEffect(() => {
    formik.initialValues.question = card.question
    formik.initialValues.answer = card.answer
  }, [card.question, card.answer])

  return (
    <BasicModal
      open={open}
      handleClose={handleClose}
      handleOpen={handleOpen}
      children2={innerButton}
    >
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Edit card</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.contentWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <FormControl variant="outlined">
            <InputLabel id="input-label">Choose a question format</InputLabel>
            <Select
              labelId="input-label"
              {...formik.getFieldProps('format')}
              onBlur={formik.handleBlur}
              label="Choose a question format"
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="Question"
            {...formik.getFieldProps('question')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.question && <div style={{ color: 'red' }}>{formik.errors.question}</div>}
          <TextField
            variant="standard"
            label="Answer"
            {...formik.getFieldProps('answer')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.answer && <div style={{ color: 'red' }}>{formik.errors.answer}</div>}
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
