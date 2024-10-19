import { CircularProgress, Grid } from '@mui/material'

export const CheckingAuth = () => {
  return (
    <Grid
      container
      direction='column'
      alignContent='center'
      justifyContent='center'
      sx={{ minHeight: '100vh', backkgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        container
        direction='row'
        justifyContent='center'
      >

        <CircularProgress color='warning' />
      </Grid>

    </Grid>
  )
}
