import * as React from 'react'

import { MoreOutlined } from '@material-ui/icons'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import SchoolIcon from '@mui/icons-material/School'
import { ListItemIcon, ListItemText } from '@mui/material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid4 } from 'uuid'

import { deletePackTC, updatePackTC } from '../../../../features/packs/packs-reducer'
import { useAppDispatch } from '../../../hooks/customHooks'
import { DeletePackModal } from '../PackModals/DeletePackModal'
import { EditPackModal } from '../PackModals/EditPackModal'

export const MyPackMenu = ({ pack_id, packName }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useAppDispatch()

  const EditHandler = (id: string) => {
    dispatch(updatePackTC(id))
    console.log('Edit. id ->', id)
  }

  const DeleteHandler = async (id: string) => {
    await dispatch(deletePackTC(id))
    navigate(`../../packs`)
    console.log('Delete. id ->', id)
  }

  const onLearnHandler = () => {
    navigate(`../../learn/${pack_id}`)
  }

  return (
    <div>
      <Button
        sx={{
          color: 'black',
        }}
        onClick={handleClick}
      >
        <MoreOutlined />
      </Button>
      <Menu
        sx={{
          width: '150px',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <EditPackModal
          key={uuid4()}
          editPackHandler={EditHandler}
          onClick={handleClose}
          innerButton={
            <MenuItem>
              <ListItemIcon>
                <BorderColorIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          }
          id={pack_id ? pack_id : 'id'}
        />
        {/*<BorderColorIcon style={{ fontSize: '15px', margin: '0 5px' }} />*/}
        <DeletePackModal
          key={uuid4()}
          id={pack_id ? pack_id : 'id'}
          buttonInner={
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          }
          deletePackHandler={DeleteHandler}
          name={packName}
        />
        <MenuItem onClick={onLearnHandler}>
          <ListItemIcon>
            <SchoolIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Learn</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

type Props = {
  pack_id?: string
  packName: string
}
