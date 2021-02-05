import React, {useState} from 'react'
import {connect} from 'react-redux'
import Navbar from './navbar'
import {updateUser} from '../store/user'
import {
  Switch,
  Paper,
  TextField,
  Typography,
  IconButton,
  FormControlLabel
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'

const UserSetting = props => {
  const [nameEdit, setNameEdit] = useState(false)
  const [emailEdit, setEmailEdit] = useState(false)
  const [passwordEdit, setPasswordEdit] = useState(false)
  const [bedTimeEdit, setBedTimeEdit] = useState(false)
  const [updateBody, setUpdateBody] = useState({})
  const [reminder, setReminder] = useState({
    exerciseReminder: props.user.exerciseReminder,
    waterReminder: props.user.waterReminder,
    meditationReminder: props.user.meditationReminder,
    sleepReminder: props.user.sleepReminder
  })

  const handleReminder = event => {
    console.log(event.target)
    props.updateUser(props.user.id, {
      [event.target.name]: event.target.checked
    })
    setReminder({
      ...reminder,
      [event.target.name]: event.target.checked
    })
  }

  const handleEdit = async field => {
    switch (field) {
      case 'userName':
        await setNameEdit(true)
        await setUpdateBody({userName: props.user.userName})
        break
      case 'email':
        await setEmailEdit(true)
        await setUpdateBody({email: props.user.email})
        break
      case 'password':
        await setPasswordEdit(true)
        await setUpdateBody({password: props.user.password})
        break
      case 'bedTime':
        await setBedTimeEdit(true)
        await setUpdateBody({bedTime: props.user.bedTime})
        break
      default:
    }
  }

  const handleChange = event => {
    const name = event.target.name
    const newValue = event.target.value
    setUpdateBody({[name]: newValue})
  }

  const handleSubmit = field => {
    props.updateUser(props.user.id, updateBody)
    setUpdateBody({})
    switch (field) {
      case 'userName':
        setNameEdit(false)
        break
      case 'email':
        setEmailEdit(false)
        break
      case 'password':
        setPasswordEdit(false)
        break
      case 'bedTime':
        setBedTimeEdit(false)
        break
      default:
    }
  }

  return (
    <div className="editContainer">
      <Navbar />
      <div className="infoContainer">
        <Paper elevation={1} className="infoPaper">
          <h4 className="settingTitle">Account Setting</h4>
          <hr />
          <div className="itemContainer">
            <div className="fieldName">
              <h5>Name</h5>
            </div>
            <div className="userInfo">
              {nameEdit ? (
                <TextField
                  defaultValue={props.user.userName}
                  name="userName"
                  variant="outlined"
                  onChange={handleChange}
                  className="textBox"
                />
              ) : (
                <h4>{props.user.userName}</h4>
              )}
            </div>
            <div className="editIcon">
              <IconButton
                onClick={
                  nameEdit
                    ? () => handleSubmit('userName')
                    : () => handleEdit('userName')
                }
              >
                {nameEdit ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          </div>
          <div className="itemContainer">
            <div className="fieldName">
              <h5>Email</h5>
            </div>
            <div className="userInfo">
              {emailEdit ? (
                <TextField
                  defaultValue={props.user.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  className="textBox"
                />
              ) : (
                <h4>{props.user.email}</h4>
              )}
            </div>
            <div className="editIcon">
              <IconButton
                onClick={
                  emailEdit
                    ? () => handleSubmit('email')
                    : () => handleEdit('email')
                }
              >
                {emailEdit ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          </div>
          <div className="itemContainer">
            <div className="fieldName">
              <h5>Password</h5>
            </div>
            <div className="userInfo">
              {passwordEdit ? (
                <TextField
                  type="password"
                  name="password"
                  variant="outlined"
                  onChange={handleChange}
                  className="textBox"
                />
              ) : (
                <h4>****</h4>
              )}
            </div>
            <div className="editIcon">
              <IconButton
                onClick={
                  passwordEdit
                    ? () => handleSubmit('password')
                    : () => handleEdit('password')
                }
              >
                {passwordEdit ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          </div>
          <div className="itemContainer">
            <div className="fieldName">
              <h5>Bed Time</h5>
            </div>
            <div className="userInfo">
              {bedTimeEdit ? (
                <TextField
                  defaultValue={props.user.bedTime}
                  name="bedTime"
                  variant="outlined"
                  onChange={handleChange}
                  className="textBox"
                />
              ) : (
                <h4>{props.user.bedTime}</h4>
              )}
            </div>
            <div className="editIcon">
              <IconButton
                onClick={
                  bedTimeEdit
                    ? () => handleSubmit('bedTime')
                    : () => handleEdit('bedTime')
                }
              >
                {bedTimeEdit ? <SaveIcon /> : <EditIcon />}
              </IconButton>
            </div>
          </div>
          <h4 className="settingTitle">Reminder Setting</h4>
          <hr />
          <div className="reminderContainer">
            <div className="fieldName">
              <h5>Exercise</h5>
            </div>
            <div className="toggle">
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={reminder.exerciseReminder}
                    onClick={handleReminder}
                    name="exerciseReminder"
                  />
                }
              />
            </div>
          </div>
          <div className="reminderContainer">
            <div className="fieldName">
              <h5>Water Intake</h5>
            </div>
            <div className="toggle">
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={reminder.waterReminder}
                    onClick={handleReminder}
                    name="waterReminder"
                  />
                }
              />
            </div>
          </div>
          <div className="reminderContainer">
            <div className="fieldName">
              <h5>Meditation</h5>
            </div>
            <div className="toggle">
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={reminder.meditationReminder}
                    onClick={handleReminder}
                    name="meditationReminder"
                  />
                }
              />
            </div>
          </div>
          <div className="reminderContainer">
            <div className="fieldName">
              <h5>Bedtime</h5>
            </div>
            <div className="toggle">
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={reminder.sleepReminder}
                    onClick={handleReminder}
                    name="sleepReminder"
                  />
                }
              />
            </div>
          </div>
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
