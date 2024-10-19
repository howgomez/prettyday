import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { FirebasetAuth } from './config'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  // create a user with Google data and firebase auth
  try {
    const result = await signInWithPopup(FirebasetAuth, googleProvider)
    // const credentials = GoogleAuthProvider.credentialFromResult(result)

    const user = result.user

    const { displayName, email, photoURL, uid } = user

    return {
      ok: true,
      // User information
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorMessage = error.message
    return {
      ok: false,
      errorMessage
    }
  }
}

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
  try {
  // Create a user with firebase db and firebase auth
    const userCredential = await createUserWithEmailAndPassword(FirebasetAuth, email, password, displayName)

    const { uid } = userCredential.user

    console.log(userCredential)
    // Update user information
    await updateProfile(FirebasetAuth.currentUser, { displayName })

    return { ok: true, uid, email, displayName }
  } catch (error) {
    console.log(error)
    return { ok: false, errorMessage: error.message }
  }
}

export const signUserWithEmailAndPassword = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FirebasetAuth, email, password)

    console.log(userCredential)
    const { uid, displayName } = userCredential.user

    return { ok: true, uid, email, displayName }
  } catch (error) {
    return { ok: false, errorMessage: error.message }
  }
}

export const logoutFirebase = async () => {
  return await signOut(FirebasetAuth)
}
