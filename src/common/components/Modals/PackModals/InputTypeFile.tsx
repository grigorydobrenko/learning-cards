import React, { ChangeEvent, useState } from 'react'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { IconButton } from '@mui/material'

import { useAppDispatch } from '../../../hooks/customHooks'

import defaultAva from 'assets/img/icons/default-cover.jpg'
import { setPackDeckCoverAC } from 'features/packs/packs-reducer'

export const InputTypeFile = () => {
  const dispatch = useAppDispatch()

  const [ava, setAva] = useState(defaultAva)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64)
          dispatch(setPackDeckCoverAC(file64))
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

  return (
    <div>
      <img
        src={isAvaBroken ? defaultAva : ava}
        style={{ width: '100px' }}
        onError={errorHandler}
        alt="ava"
      />
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
    </div>
  )
}
