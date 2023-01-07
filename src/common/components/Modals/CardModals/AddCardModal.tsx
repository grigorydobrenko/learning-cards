import React, { ChangeEvent, ReactNode, useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { setAppErrorAC } from '../../../../app/app-reducer'
import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { useAppDispatch } from '../../../hooks/customHooks'
import { convertFileToBase64 } from '../../../utils/baseTo64Converter'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

type FormikErrorType = {
  question?: string
  questionImg?: string
  answer?: string
}
type AddCardPropsType = {
  innerButton: ReactNode
  addCardHandler: (question: string, answer: string, img?: string) => void
}
export const AddCardModal = ({ innerButton, addCardHandler }: AddCardPropsType) => {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState('Text')

  const formik = useFormik({
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.question && selectedValue !== 'Image') {
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
    },
    onSubmit: values => {
      console.log(values)
      if (img) {
        addCardHandler(values.question, values.answer, img)
      } else {
        addCardHandler(values.question, values.answer)
      }

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

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string)
  }

  //operate with image

  const [img, setImg] = useState('')

  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let callBack = (file64: string) => {
      console.log('file64: ', file64)
      setImg(file64)
    }

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 100000) {
        convertFileToBase64(file, callBack)
        dispatch(setAppErrorAC(null))
      } else {
        dispatch(setAppErrorAC('Файл слишком большого размера'))
      }
    }
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
      <div className={style.contentWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <FormControl variant="outlined">
            <InputLabel id="input-label">Choose a question format</InputLabel>
            <Select
              labelId="input-label"
              {...formik.getFieldProps('format')}
              value={selectedValue}
              onChange={handleChange}
              label="Choose a question format"
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
          </FormControl>

          {selectedValue === 'Text' ? (
            <TextField
              variant="standard"
              label="Question"
              {...formik.getFieldProps('question')}
              onBlur={formik.handleBlur}
            />
          ) : (
            <>
              <div className={style.selectImageHeader}>
                <div className={style.selectImageTitle}>Question</div>
                <label>
                  <input
                    name={'questionImg'}
                    type="file"
                    onChange={uploadHandler}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <Button
                    sx={{
                      fontFamily: 'Montserrat',
                      fontSize: '14px',
                      fontWeight: '500',
                      fontStyle: 'normal',
                      lineHeight: '20px',
                      color: '#366eff',
                      textDecorationLine: 'underline',
                    }}
                    component="span"
                  >
                    Change cover
                  </Button>
                </label>
              </div>

              <Paper variant="outlined" className={style.imageContainer}>
                <img src={img} className={style.image} />
              </Paper>
            </>
          )}

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
