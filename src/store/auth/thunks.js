import {
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
  signUserWithEmailAndPassword
} from '../../firebase/providers'
import { clearNotesLogout } from '../journal/journalSlice'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthent = (email, password) => {
  return async (dispatch) => {
    await dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) { return dispatch(logout({ errorMessage: result.errorMessage })) }

    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailAndPassword({ email, password, displayName })

    if (!ok) return dispatch(logout({ errorMessage }))

    // Update user information
    dispatch(login({ uid, email, displayName, photoURL }))
  }
}

export const loginUserWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, displayName, photoURL, errorMessage } =
      await signUserWithEmailAndPassword({ email, password })

    if (!ok) return dispatch(logout({ errorMessage }))

    dispatch(login({ uid, email, displayName, photoURL }))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await dispatch(checkingCredentials())

    await dispatch(clearNotesLogout())
    await dispatch(logoutFirebase())
  }
}
