import { SaveOutlined, DeleteOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'
import { setActiveNote, startSaveNote } from '../../store/journal'
import { startDeletingNote, startUploadFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  // buscar en la store nuestro valor de active para mostrar la nota activa
  const dispatch = useDispatch()
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

  // Usar nuestro hook useForm para mostrar los valores en los inputs de abajo..
  const { title, body, onInputChange, formState } = useForm(note)

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({ target }) => {
    dispatch(startUploadFiles(target.files))
  }

  const onDeleteNote = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} className='animate__animated animate__fadeIn'>
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{new Date(note.date).toLocaleDateString()}</Typography>
      </Grid>
      <Grid item>
        <input
          type='file'
          multiple
          onChange={onFileInputChange}
        />

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color='primary'
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió en el día de hoy?'
          minRows={5}
          name='body'
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent='end'>
        <Button onClick={onDeleteNote} color='error' sx={{ padding: 2 }}>
          <DeleteOutlined />
        </Button>
      </Grid>
      {/* Image gallery */}
      <ImageGallery images={note.imageUrls} />

    </Grid>
  )
}
