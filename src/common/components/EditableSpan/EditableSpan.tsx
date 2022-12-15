import React, { ChangeEvent, useState } from 'react'

import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
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
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
      opacity: '0.5',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
      opacity: '0.5',
    },
  })

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
    <CssTextField
      variant="standard"
      label="Nickname"
      value={title}
      onChange={changeTitle}
      autoFocus
      fullWidth
      InputProps={{
        endAdornment: (
          <Button variant="contained" size="small" sx={{ mb: '4px' }}>
            SAVE
          </Button>
        ),
      }}
      onBlur={activateViewMode}
    />
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
