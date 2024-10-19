import { doc, collection, setDoc, deleteDoc, updateDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config'
import { addNewEmptyNote, deleteImageFromNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosActiveNote, setSaving, updateNote } from './journalSlice'
import { loadNotes } from '../../helpers/loadNotes'
import { uploadFiles } from '../../helpers/uploadFiles'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote())

    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      imageUrls: [],
      date: new Date().getTime()
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

    const setDocResult = await setDoc(newDoc, newNote)

    console.log({ newDoc, setDocResult })

    newNote.id = newDoc.id

    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))
  }
}

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    if (!uid) throw new Error('El UID del usuario no existe!')

    const notes = await loadNotes(uid)
    dispatch(setNotes(notes))
  }
}

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving())

    const { uid } = getState().auth
    const { active: note } = getState().journal

    const noteToFireStore = { ...note }
    delete noteToFireStore.id

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await setDoc(docRef, noteToFireStore, { merge: true })

    dispatch(updateNote(note))
  }
}

export const startUploadFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving())

    const uploadFilesPromises = []

    for (const file of files) {
      uploadFilesPromises.push(uploadFiles(file))
    }

    const photosUrls = await Promise.all(uploadFilesPromises)

    dispatch(setPhotosActiveNote(photosUrls))
  }
}

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    await deleteDoc(docRef)

    console.log('deleteNote', docRef)
    dispatch(deleteNoteById(note.id))
  }
}

export const startDeletingImage = (image) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth
    const { active: note } = getState().journal

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
    const updatedImageUrls = note.imageUrls.filter(url => url !== image)
    await updateDoc(docRef, { imageUrls: updatedImageUrls })

    dispatch(deleteImageFromNote(image))
  }
}
