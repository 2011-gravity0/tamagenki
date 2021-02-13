import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'

export const DailyProgressList = props => {
  const {list, handleCheck} = props

  const [openModal, setModal] = useState({
    sleep: false,
    fruit: false,
    veggies: false,
    water: false,
    exercise: false,
    relax: false,
    meditate: false
  })

  const handleOpen = async (event, name) => {
    await setModal({...openModal, [name]: true})
  }

  const handleClose = name => {
    setModal({...openModal, [name]: false})
  }

  return (
    <List className="listContainer">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/plasticine/100/000000/sleeping-in-bed.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.sleep}
                onClose={() => handleClose('sleep')}
              >
                <p>Check off if you got 8 hours of sleep last night</p>
              </Modal>
              <ListItemText>
                Good night sleep
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'sleep')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>

              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.sleep > 0}
                name="sleep"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/color/48/000000/raspberry.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.fruit}
                onClose={() => handleClose('fruit')}
              >
                <p>Check off today's fruit servings</p>
              </Modal>
              <ListItemText>
                Fruits
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'fruit')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 0}
                name="fruit"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 1}
                name="fruit"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 2}
                name="fruit"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/fluent/48/000000/group-of-vegetables.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.veggies}
                onClose={() => handleClose('veggies')}
              >
                <p>Check off today's vegetables servings</p>
              </Modal>
              <ListItemText>
                Vegetables
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'veggies')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 0}
                name="vegetables"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 1}
                name="vegetables"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 2}
                name="vegetables"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/color/48/000000/water.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.water}
                onClose={() => handleClose('water')}
              >
                <p>Check off today's water servings</p>
              </Modal>
              <ListItemText>
                Water
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'water')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 0}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 1}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 2}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 3}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 4}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 5}
                name="water"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/dusk/64/000000/exercise.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.exercise}
                onClose={() => handleClose('exercise')}
              >
                <p>Check off if you were able to exercise today</p>
              </Modal>
              <ListItemText>
                Exercise
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'exercise')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.exercise > 0}
                name="exercise"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/color/48/000000/relax-with-book.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.relax}
                onClose={() => handleClose('relax')}
              >
                <p>
                  Check off if you got a chance to disconnect and relax today
                </p>
              </Modal>
              <ListItemText>
                No screen & Relax{' '}
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'relax')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.relaxation > 0}
                name="relaxation"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper style={{backgroundColor: '#e6ffff', width: '100%'}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src="https://img.icons8.com/officel/80/000000/meditation-guru.png" />
              </ListItemAvatar>
              <Modal
                className="avatar-modals"
                open={openModal.meditate}
                onClose={() => handleClose('meditate')}
              >
                <p>Check off if you got a chance to meditate today</p>
              </Modal>
              <ListItemText>
                Meditation
                <IconButton
                  onClick={e => {
                    handleOpen(e, 'meditate')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.meditation > 0}
                name="meditation"
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
      </Grid>
    </List>
  )
}
