import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import history from '../history'
import {auth, updateUser} from '../store'
import {TextField, Button, Typography} from '@material-ui/core'

const NamePet = props => {
  const {updateUser, userid} = props
  const handleSubmit = evt => {
    evt.preventDefault()
    const petName = evt.target.eggname.value
    updateUser(userid, {petName})
    history.push('/guidePet')
  }
  return (
    <div className="viewContainer">
      <div className="nameEgg">
        <h2>Name your tamabuddy!</h2>
        <img className="loginEgg" src="/eggHatch.gif" />
        <form className="nameEggForm" onSubmit={handleSubmit}>
          <TextField
            required
            type="eggname"
            label="your tamabuddy name"
            name="eggname"
            className="login"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button
            waves="light"
            variant="contained"
            className="nameSubmit"
            color="secondary"
            type="submit"
            className="loginButton"
          >
            OK
          </Button>
        </form>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    userid: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, data) => dispatch(updateUser(userId, data))
  }
}

export default connect(mapState, mapDispatch)(NamePet)
