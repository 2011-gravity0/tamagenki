import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Navbar from './navbar'
import {TextField, Button, Typography} from '@material-ui/core'

const UserSetting = props => {
  return (
    <div className="editContainer">
      <Navbar />
      <div className="infoContainer" />
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserSetting)
