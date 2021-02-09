import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import history from '../history'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {TextField, Button, Typography} from '@material-ui/core'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, error, reroute, reroutePath} = props
  const validateEmail = (input, whichForm) => {
    if (
      !input.includes('@') ||
      (!input.includes('.') && whichForm === 'signup')
    ) {
      return true
    }
    return false
  }
  const validatePassword = (input, whichForm) => {
    if (input.length < 5 && whichForm === 'signup') {
      return true
    }
    return false
  }
  const handleSubmit = async evt => {
    try {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (validateEmail(email, formName)) {
        document.getElementById('emailP').innerHTML = 'Must be an email'
        history.push('/signup')
      } else if (validatePassword(password, formName)) {
        document.getElementById('passwordP').innerHTML =
          'Atleast 5 character long'
        history.push('/signup')
      } else if (!validateEmail(email) && !validatePassword(password)) {
        await props.auth(email, password, formName)
        history.push(displayName === 'Login' ? '/' : '/questions')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="viewContainer">
      <div className="loginContainer">
        <h1>Tamagenki</h1>
        <img className="loginEgg" src="/eggHatch.gif" />
        <form className="login-form" onSubmit={handleSubmit} name={name}>
          <TextField
            required
            id="outlined-required"
            label="email"
            name="email"
            variant="outlined"
            className="login"
            InputLabelProps={{
              shrink: true
            }}
          />
          <p style={{color: 'red', fontSize: '15px'}} id="emailP" />
          <TextField
            required
            id="outlined-required"
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            className="login"
            InputLabelProps={{
              shrink: true
            }}
          />
          <p style={{color: 'red', fontSize: '15px'}} id="passwordP" />
          <Button
            waves="light"
            variant="contained"
            className="login"
            color="secondary"
            type="submit"
            className="loginButton"
          >
            {displayName}
          </Button>
        </form>
        <Typography variant="subtitle2" align="center" className="or">
          or
        </Typography>
        {/* <Button variant="outlined" className="googleButton">
          <div className="google">
            <img src="/google-icon.svg" />
          </div>
          <a href="/auth/google">{displayName} with Google</a>
        </Button> */}
        <a className="googleLink" href={reroutePath}>
          {reroute}
        </a>
      </div>
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
    auth: (email, password, method) => dispatch(auth(email, password, method))
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
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
