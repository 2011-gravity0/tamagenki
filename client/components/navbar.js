/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {makeStyles} from '@material-ui/core/styles'
import {
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  grow: {
    marginTop: 0,
    flexGrow: 1,
    width: '100vw'
  },
  menu: {
    color: 'gray'
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Fredoka One'
  }
}))

const Navbar = ({handleLogout}, props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{background: '#FFB0AD'}}>
        <Toolbar className="nav">
          {/* The navbar will show these links and tools to anyone */}
          <Typography variant="h5" className={classes.title}>
            <Link to="/" style={{color: '#FFF'}}>
              Tamagenki
            </Link>
          </Typography>

          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              {/* <MenuItem>
                <Link to="/dashboard" className={classes.menu}>
                  Dashboard
                </Link>
              </MenuItem> */}
              <MenuItem>
                <Link to="/badges" className={classes.menu}>
                  Badges
                </Link>
              </MenuItem>
              <MenuItem className={classes.menu}>
                <Link to="/history" className={classes.menu}>
                  History
                </Link>
              </MenuItem>
              <MenuItem className={classes.menu}>
                <Link to="/setting" className={classes.menu}>
                  Setting
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout} className={classes.menu}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

export default connect(null, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired
}
