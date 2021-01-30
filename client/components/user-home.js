import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchList} from '../store/dailyProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      exercise: 0,
      fruit: 0,
      meditation: 0,
      relaxations: 0,
      sleep: 0,
      vegetables: 0,
      water: 0,
      points: 0
    }
  }

  componentDidMount() {
    this.props.loadList()
  }

  render() {
    console.log(this.props)
    // const {
    //   exercise,
    //   fruit,
    //   meditation,
    //   relaxations,
    //   sleep,
    //   vegetables,
    //   water,
    // } = this.props.list.list
    return (
      <>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <img src="../../assets/eggGIF.gif" />
          </Grid>
        </Grid>
        <List>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={4}
            // width="50%"
          >
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Did you get 8 hours of sleep?" />
                  <Checkbox inputProps={{'aria-label': 'primary checkbox'}} />
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/cotton/64/000000/grape.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Check off today's fruit servings!" />
                  {[1, 2, 3].map((checkbox, idx) => {
                    return (
                      <Checkbox
                        inputProps={{'aria-label': 'primary checkbox'}}
                        key={idx}
                      />
                    )
                  })}
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Check off today's vegetables servings!" />
                  {[1, 2, 3].map((checkbox, idx) => {
                    return (
                      <Checkbox
                        inputProps={{'aria-label': 'primary checkbox'}}
                        key={idx}
                      />
                    )
                  })}
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/office/16/000000/water.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Check off today's water servings!" />
                  {[1, 2, 3, 4, 5, 6].map((checkbox, idx) => {
                    return (
                      <Checkbox
                        inputProps={{'aria-label': 'primary checkbox'}}
                        key={idx}
                      />
                    )
                  })}
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/dusk/64/000000/exercise.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Did you get some exercise?" />
                  <Checkbox inputProps={{'aria-label': 'primary checkbox'}} />
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/color/48/000000/relax-with-book.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Did you disconnect and relax today?" />
                  <Checkbox inputProps={{'aria-label': 'primary checkbox'}} />
                </ListItem>
              </Paper>
            </Grid>
            <Grid container item xs={6}>
              <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src="https://img.icons8.com/offices/30/000000/meditation-guru.png" />
                  </ListItemAvatar>
                  <ListItemText primary="Did you get a chance to meditate?" />
                  <Checkbox inputProps={{'aria-label': 'primary checkbox'}} />
                </ListItem>
              </Paper>
            </Grid>
          </Grid>
        </List>
      </>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id,
    list: state.dailyProgress
  }
}

const mapDispatch = dispatch => {
  return {
    loadList: () => dispatch(fetchList())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
