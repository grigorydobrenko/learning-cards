import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'
import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import React, { ReactNode } from 'react'

type FormikErrorType = {
  question?: string
  answer?: string
}
type AddCardPropsType = {
  innerButton: ReactNode
  addCardHandler: (question: string, answer: string) => void
}
export const AddCardModal = ({ innerButton, addCardHandler }: AddCardPropsType) => {
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
      question: '',
      answer: '',
      format: 'Text',
    },
    onSubmit: values => {
      addCardHandler(values.question, values.answer)
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
      handleClose={handleClose}
      handleOpen={handleOpen}
      children2={innerButton}
    >
      <div className={style.modalHeader}>
        <h6 className={style.modalTitle}>Add new card</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.formWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <FormControl variant="outlined">
            <InputLabel id="input-label">Choose a question format</InputLabel>
            <Select
              labelId="input-label"
              {...formik.getFieldProps('format')}
              label="Choose a question format"
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            className={style.addCardInput}
            label="Question"
            {...formik.getFieldProps('question')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.question && formik.touched.question ? (
            <div style={{ color: 'red' }}>{formik.errors.question}</div>
          ) : null}
          <TextField
            variant="standard"
            className={style.addCardInput}
            label="Answer"
            {...formik.getFieldProps('answer')}
            onBlur={formik.handleBlur}
          />
          {formik.errors.answer && formik.touched.answer ? (
            <div style={{ color: 'red' }}>{formik.errors.answer}</div>
          ) : null}
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
