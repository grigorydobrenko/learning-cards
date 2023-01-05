import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react'

import { Box, Button, IconButton, Paper } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import closeIcon from '../../../../assets/img/icons/close-icon.svg'
import { useAppSelector } from '../../../hooks/customHooks'
import { convertFileToBase64 } from '../../../utils/baseTo64Converter'
import { BasicModal } from '../BasicModal'
import style from '../Modals.module.css'

type FormikErrorType = {
  question?: string
  answer?: string
}
type EditCardPropsType = {
  cardId: string
  innerButton: ReactNode
  editCardHandler: (id: string, question: string, answer: string, questionImg?: string) => void
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
      if (updatedImg) {
        editCardHandler(card._id, values.question, values.answer, updatedImg)
      } else {
        editCardHandler(card._id, values.question, values.answer)
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

  useEffect(() => {
    formik.initialValues.question = card.question
    formik.initialValues.answer = card.answer
  }, [card.question, card.answer])

  //operate with image

  const [updatedImg, setUpdatedImg] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let callBack = (file64: string) => {
      console.log('file64: ', file64)
      setUpdatedImg(file64)
      setIsUpdated(true)
    }

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 100000) {
        convertFileToBase64(file, callBack)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
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
        <h6 className={style.modalTitle}>Edit card</h6>
        <IconButton size="small" onClick={handleClose}>
          <img src={closeIcon} alt="" />
        </IconButton>
      </div>
      <div className={style.contentWrapper}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          {card.questionImg ? (
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
                <img src={isUpdated ? updatedImg : card.questionImg} className={style.image} />
              </Paper>
            </>
          ) : (
            <TextField
              variant="standard"
              label="Question"
              {...formik.getFieldProps('question')}
              onBlur={formik.handleBlur}
            />
          )}

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
