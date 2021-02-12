/* eslint-disable react/jsx-key */
/* eslint-disable no-shadow */
import React, {useState} from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'
import {updateUser} from '../store/user'
import {
  Switch,
  Paper,
  TextField,
  IconButton,
  FormControlLabel
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

const UserSetting = ({user, updateUser}) => {
  const [editMode, setEditMode] = useState({
    userName: false,
    email: false,
    password: false,
    bedTime: false
  })
  const [message, setMessage] = useState({email: '', password: ''})
  const [updateBody, setUpdateBody] = useState({})
  const [reminder, setReminder] = useState({
    exerciseReminder: user.exerciseReminder,
    waterReminder: user.waterReminder,
    meditationReminder: user.meditationReminder,
    sleepReminder: user.sleepReminder
  })

  const validateEmail = input => {
    if (!input.includes('@') || !input.includes('.')) {
      return true
    }
    return false
  }

  const validatePassword = input => {
    if (input.length < 5) {
      return true
    }
    return false
  }

  const handleReminder = event => {
    console.log(event.target)
    updateUser(user.id, {
      [event.target.name]: event.target.checked
    })
    setReminder({
      ...reminder,
      [event.target.name]: event.target.checked
    })
  }

  const handleEdit = async field => {
    await setEditMode({...editMode, [field]: true})
    await setUpdateBody({[field]: user[field]})
  }

  const handleChange = event => {
    const name = event.target.name
    const newValue = event.target.value
    setUpdateBody({[name]: newValue})
  }

  const handleSubmit = field => {
    if (field === 'email' && validateEmail(updateBody.email)) {
      setMessage({...message, email: 'Must be an email'})
    } else if (field === 'password' && validatePassword(updateBody.password)) {
      setMessage({...message, password: 'Atleast 5 character long'})
    } else {
      updateUser(user.id, updateBody)
      setUpdateBody({})
      setEditMode({...editMode, [field]: false})
      setMessage({email: '', password: ''})
      console.log('is thie updated?')
    }
  }

  const mapUserInfo = [
    {field: 'userName', displayName: 'Name'},
    {field: 'email', displayName: 'Email'},
    {field: 'password', displayName: 'Password'},
    {field: 'bedTime', displayName: 'Bedtime'}
  ]
  const mapReminer = [
    {field: 'exerciseReminder', displayName: 'Exercise'},
    {field: 'waterReminder', displayName: 'Water Intake'},
    {field: 'meditationReminder', displayName: 'Meditation'},
    {field: 'sleepReminder', displayName: 'Bedtime'}
  ]
  // console.log('this is props from setting', props)
  return (
    <div className="editContainer">
      <Navbar />
      <div className="infoContainer">
        <Paper elevation={1} className="infoPaper">
          <h4 className="settingTitle">Account Setting</h4>
          <hr />
          {mapUserInfo.map(item => (
            <div key={item.field} className="itemContainer">
              <div className="fieldName">
                <h5>{item.displayName}</h5>
              </div>
              <div className="userInfo">
                {editMode[item.field] ? (
                  <TextField
                    defaultValue={user[item.field]}
                    type={item.field === 'password' ? 'password' : 'string'}
                    name={item.field}
                    variant="outlined"
                    onChange={handleChange}
                    className="textBox"
                  />
                ) : (
                  <h4>
                    {item.field === 'password' ? '****' : user[item.field]}
                  </h4>
                )}
              </div>
              {item.field === 'email' && (
                <p className="error" id="emailP">
                  {message.email}
                </p>
              )}
              {item.field === 'password' && (
                <p className="error" id="passwordP">
                  {message.password}
                </p>
              )}
              <div className="editIcon">
                <IconButton
                  onClick={
                    editMode[item.field]
                      ? () => handleSubmit(item.field)
                      : () => handleEdit(item.field)
                  }
                >
                  {editMode[item.field] ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </div>
            </div>
          ))}
          <h4 className="settingTitle">Push Notifications Setting</h4>
          <hr />
          {mapReminer.map(item => (
            <div key={item.field} className="reminderContainer">
              <div className="fieldName">
                <h5>{item.displayName}</h5>
              </div>
              <div className="toggle">
                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={reminder[item.field]}
                      onClick={handleReminder}
                      name={item.field}
                    />
                  }
                />
              </div>
            </div>
          ))}
        </Paper>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (userId, data) => dispatch(updateUser(userId, data))
  }
}

export default connect(mapState, mapDispatch)(UserSetting)

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 24,
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({classes, ...props}) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
})
