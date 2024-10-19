import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch()

  const onHandleClick = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }))
  }

  const newTitle = useMemo(() => {
    return title.length > 15
      ? title.substring(0, 15) + '...'
      : title
  }, [title])

  const newBody = useMemo(() => {
    return body.length > 15
      ? body.substring(0, 15) + '...'
      : body
  }, [body])

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onHandleClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction='column' justifyContent='space-between' alignItems='flex-start'>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
