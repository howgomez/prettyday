import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      direction='column'
      sx={{ minHeight: '100vh', backkgroundColor: 'primary.main', padding: 4, alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid
        item
        className='box-shadow'
        xs={3}
        sx={{
          width: { md: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 3,
          border: '1px solid #e0e0e0'
        }}
      >
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  )
}
