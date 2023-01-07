import React, { ChangeEvent, useEffect, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../hooks/customHooks'

import s from './InputTypeFile.module.css'

import defaultAva from 'assets/img/icons/default-cover.jpg'
import { setPackDeckCoverAC } from 'features/packs/packs-reducer'

type InputTypeFilePropsType = {
  id?: string
}

export const InputTypeFile = (props: InputTypeFilePropsType) => {
  const dispatch = useAppDispatch()
  const pack = useAppSelector(
    state => state.packs.cardPacks.filter(pack => pack._id === props.id)[0]
  )

  const [ava, setAva] = useState(defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64)
          dispatch(setPackDeckCoverAC(file64))
          setIsAvaBroken(false)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  useEffect(() => {
    if (pack && pack.deckCover) {
      setAva(pack.deckCover)
    }
  }, [pack])

  return (
    <div className={s.mainContainer}>
      <div className={s.describeContainer}>
        <span>Choose the cover</span>
        <label>
          <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          <IconButton component="span">
            <CloudUploadIcon />
          </IconButton>
        </label>
      </div>

      <div className={s.pictureContainer}>
        <img
          src={isAvaBroken ? defaultAva : ava}
          // style={{ width: '100%' }}
          onError={errorHandler}
          alt="ava"
        />
      </div>
    </div>
  )
}
