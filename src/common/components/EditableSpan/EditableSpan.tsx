import React, { ChangeEvent, useState } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import editIcon from '../../../assets/img/icons/edit-icon.svg'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="subtitle1" component="p">
        {props.value}
      </Typography>
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          right: '-24px',
          top: '0',
        }}
        onClick={activateEditMode}
      >
        <img src={editIcon} alt="" />
      </IconButton>
    </Box>
  )
})
