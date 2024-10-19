import { DeleteOutlined } from '@mui/icons-material'
import { ImageListItem, ImageList, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { startDeletingImage } from '../../store/journal'

export const ImageGallery = ({ images }) => {
  const dispatch = useDispatch()

  const onDeleteImage = (image) => {
    dispatch(startDeletingImage(image))
  }

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={3}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <div>
            <img
              src={`${image}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt='Imagen de la nota'
              loading='lazy'
              className='rounded-lg object-cover w-[500px] h-[500px]'
            />
            <div className='absolute top-0'>
              <Button onClick={() => onDeleteImage(image)} color='error' sx={{ padding: 2 }}>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  )
}
