import React, { ChangeEvent, useState } from 'react'

import { IconButton } from '@mui/material'

import photoIcon from '../../../assets/img/icons/photo-icon.svg'

import { useAppDispatch } from 'common/hooks/customHooks'
import { errorUtils } from 'common/utils/error-utils'
type InputTypeFilePT = {
  changeUserAvatar: (photo: string) => void
}
export const InputTypeFile = ({ changeUserAvatar }: InputTypeFilePT) => {
  const dispatch = useAppDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000 && file.type.includes('image')) {
        convertFileToBase64(file, (file64: string) => {
          changeUserAvatar(file64)
        })
      } else if (!file.type.includes('image')) {
        const error = new Error('It is not an image. PLease choose another file')

        errorUtils(error, dispatch)
      } else {
        const error = new Error('too large photo. Photo must be less than 100kB')

        errorUtils(error, dispatch)
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

  return (
    <div>
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <IconButton
          component="span"
          size="small"
          sx={{
            backgroundColor: '#808080',
            position: 'absolute',
            bottom: '0',
            right: '0',
            border: '1px solid #FFFFFF',
          }}
        >
          <img src={photoIcon} alt="" />
        </IconButton>
      </label>
    </div>
  )
}
