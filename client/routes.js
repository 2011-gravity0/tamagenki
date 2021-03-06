import React, {Component} from 'react'
import {connect} from 'react-redux'

import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  NamePet,
  GuidePet,
  UserSetting,
  SocialHome
} from './components'
import {me} from './store'
import UserForm from './components/questions/UserForm'
import Badges from './components/Badges'
import UserHistory from './components/UserHistory'
import BadgesTwo from './components/Badges2'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          //Only logged in user can see home
          <Switch>
            <Route exact path="/" component={UserHome} />
            <Route exact path="/nameEgg" component={NamePet} />
            <Route exact path="/questions" component={UserForm} />
            <Route exact path="/guidePet" component={GuidePet} />
            <Route exact path="/setting" component={UserSetting} />
            <Route exact path="/history" component={UserHistory} />
            <Route exact path="/feed" component={SocialHome} />
            <Route path="/badges" component={Badges} />
            <Route path="/badgestwo" component={BadgesTwo} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
