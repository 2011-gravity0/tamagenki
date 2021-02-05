import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import React from 'react'

export const ProgressBar = props => {
  const {dailyPoints} = props

  return (
    <div>
      <Grid item style={{width: '40%'}}>
        <LinearProgress variant="determinate" value={dailyPoints / 16 * 100} />{' '}
      </Grid>
      <Grid item style={{width: '5%'}}>
        {' '}
        <Typography>{`${Math.round(dailyPoints / 16 * 100)}%`}</Typography>
      </Grid>
    </div>
  )
}
