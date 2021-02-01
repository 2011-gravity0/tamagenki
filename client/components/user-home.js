import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exercise: this.props.list === undefined ? 0 : this.props.list.exercise,
      fruit: this.props.list === undefined ? 0 : this.props.list.fruit,
      meditation:
        this.props.list === undefined ? 0 : this.props.list.meditation,
      relaxation:
        this.props.list === undefined ? 0 : this.props.list.relaxation,
      sleep: this.props.list === undefined ? 0 : this.props.list.sleep,
      vegetables:
        this.props.list === undefined ? 0 : this.props.list.vegetables,
      water: this.props.list === undefined ? 0 : this.props.list.water,
      points: 0,
      checked: false
    }
    // this.checked = this.checked.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  // checked(column, idx) {
  //   if (this.state[column] !== 0 && idx < this.state[column]) {
  //     return true
  //   }
  //   return false
  // }

  // write random thing

  async handleCheck(event) {
    event.preventDefault()
    // event.persist()
    console.log('target name', event.target.name)
    console.log('checked', event.target.checked)
    if (event.target.checked === true) {
      this.setState({checked: event.target.checked})
    }
    // if (event.target.checked === true) {
    //   await this.setState({
    //     [event.target.name]: this.props.list[event.target.name] + 1,
    //     points: this.state.points + 1,
    //   })
    //   console.log('state after adding point', this.state)
    // } else {
    //   await this.setState({
    //     [event.target.name]: this.props.list[event.target.name] - 1,
    //     points: this.state.points - 1,
    //   })
    //   console.log('state after subtracting point', this.state)
    // }
    // this.props.updateList(event.target.name, this.state[event.target.name])
  }

  render() {
    console.log(this.props)

    if (this.props.list) {
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
            >
              <Grid container item xs={6}>
                <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png" />
                    </ListItemAvatar>
                    <ListItemText primary="Did you get 8 hours of sleep?" />
                    <Checkbox
                      onClick={event => {
                        this.handleCheck(event)
                      }}
                      checked={this.props.list.sleep > 1}
                      name="sleep"
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
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
                          onClick={event => {
                            this.handleCheck(event)
                          }}
                          checked={
                            this.props.list.fruit > 1 &&
                            idx < this.props.list.fruit
                              ? true
                              : this.state.checked
                          }
                          name="fruit"
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
                          onClick={event => {
                            this.handleCheck(event)
                          }}
                          checked={
                            !!(
                              this.props.list.vegetables > 1 &&
                              idx < this.props.list.vegetables
                            )
                          }
                          name="vegetables"
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
                          onClick={event => {
                            this.handleCheck(event)
                          }}
                          checked={
                            !!(
                              this.props.list.water > 1 &&
                              idx < this.props.list.water
                            )
                          }
                          name="water"
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
                    <Checkbox
                      onClick={event => {
                        this.handleCheck(event)
                      }}
                      checked={this.props.list.exercise > 0}
                      name="exercise"
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
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
                    <Checkbox
                      onClick={event => {
                        this.handleCheck(event)
                      }}
                      checked={this.props.list.relaxation > 0}
                      name="relaxation"
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
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
                    <Checkbox
                      onClick={event => {
                        this.handleCheck(event)
                      }}
                      checked={this.props.list.meditation > 1}
                      name="meditation"
                      inputProps={{'aria-label': 'primary checkbox'}}
                    />
                  </ListItem>
                </Paper>
              </Grid>
            </Grid>
          </List>
        </>
      )
    } else {
      return <h1>LOADING...</h1>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
