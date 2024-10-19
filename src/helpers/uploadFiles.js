export const uploadFiles = async (files) => {
  const cloudURL = 'https://api.cloudinary.com/v1_1/react-curso2024/upload'

  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', files)

  if (!files) throw new Error('No hay archivos para subir')

  try {
    const response = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    return await data.secure_url
  } catch (error) {
    throw new Error('Error al subir archivo')
  }
}
