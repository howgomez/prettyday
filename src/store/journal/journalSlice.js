import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload)
      state.isSaving = false
    },

    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },

    setNotes: (state, action) => {
      state.notes = action.payload
    },

    setSaving: (state, action) => {
      state.isSaving = true
      state.messageSaved = ''
    },

    setPhotosActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
      state.isSaving = false
    },

    clearNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ''
      state.notes = []
      state.active = null
    },

    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload
        }
        return note
      })
      // Todo: mostrar mensaje de actualización
      state.messageSaved = `${action.payload.title}, fue actualizado exitosamente`
    },

    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
      state.isSaving = false
    },

    deleteImageFromNote: (state, action) => {
      state.active.imageUrls = state.active.imageUrls.filter(url => url !== action.payload)
      state.isSaving = false
    }
  }
})

// Action creators are generated for each case reducer function
export const
  { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosActiveNote, clearNotesLogout, deleteImageFromNote } = journalSlice.actions
