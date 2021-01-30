import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {TextField, Button, Typography} from '@material-ui/core'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, reroute, reroutePath} = props

  return (
    <div className="loginContainer">
      <h1>Tamagenki</h1>
      <img className="loginEgg" src="/eggHatch.gif" />
      <form className="login-form" onSubmit={handleSubmit} name={name}>
        <TextField
          required
          label="email"
          name="email"
          variant="outlined"
          className="login"
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          required
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          className="login"
          InputLabelProps={{
            shrink: true
          }}
        />
        <Button
          waves="light"
          variant="contained"
          className="login"
          color="secondary"
          name="password"
          type="submit"
          className="loginButton"
        >
          {displayName}
        </Button>
      </form>
      {/* <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form> */}
      <Typography variant="subtitle2" align="center" className="or">
        or
      </Typography>
      <Button variant="outlined" className="googleButton">
        <div className="google">
          <img src="/google-icon.svg" />
        </div>
        <a href="/auth/google">{displayName} with Google</a>
      </Button>
      <a className="googleLink" href={reroutePath}>
        {reroute}
      </a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    reroute: 'Create an Account',
    reroutePath: '/signup'
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    reroute: 'Already have an account?',
    reroutePath: '/login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
