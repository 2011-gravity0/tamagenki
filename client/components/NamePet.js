import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {TextField, Button, Typography} from '@material-ui/core'

const NamePet = prop => {
  return (
    <div className="nameEgg">
      <h2>Name your tamabuddy!</h2>
      <img className="loginEgg" src="/eggHatch.gif" />
      <form className="nameEggForm">
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
  )
}

export default NamePet
