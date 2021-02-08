import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import React from 'react'

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 15,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor: '#C8EAEF'
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#2A8809'
  }
}))(LinearProgress)

export const ProgressBar = props => {
  let dailyPoints = props.dailyPoints || 0
  if (!dailyPoints) {
    dailyPoints = 0
  }
  console.log('daily points', dailyPoints)

  return (
    <Grid container>
      <Grid item style={{width: '12em'}}>
        <BorderLinearProgress
          variant="determinate"
          value={dailyPoints / 16 * 100}
        />{' '}
      </Grid>
      <Grid item style={{width: '5%'}}>
        {' '}
        <Typography>{`${Math.round(dailyPoints / 16 * 100)}%`}</Typography>
      </Grid>
    </Grid>
  )
}
