import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal'
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

  const styles = useStyles()

  return (
    <List className="listContainer">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'sleep')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>

              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.sleep > 0}
                name="sleep"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'fruit')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 0}
                name="fruit"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 1}
                name="fruit"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.fruit > 2}
                name="fruit"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'veggies')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 0}
                name="vegetables"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 1}
                name="vegetables"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.vegetables > 2}
                name="vegetables"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'water')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 0}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 1}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 2}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 3}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 4}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.water > 5}
                name="water"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'exercise')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.exercise > 0}
                name="exercise"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'relax')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.relaxation > 0}
                name="relaxation"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
        <Grid
          container
          item
          className="listItemContainer"
          className={styles.grid}
        >
          <Paper className={styles.paper}>
            <ListItem alignItems="center">
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
                  className={styles.infoButton}
                  onClick={e => {
                    handleOpen(e, 'meditate')
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemText>
              <Checkbox
                className="checkBox"
                onClick={event => {
                  handleCheck(event)
                }}
                checked={list.meditation > 0}
                name="meditation"
                checkedIcon={
                  <span className={clsx(styles.uncheck, styles.checked)} />
                }
                icon={<span className={styles.uncheck} />}
                inputProps={{'aria-label': 'primary checkbox'}}
              />
            </ListItem>
          </Paper>
        </Grid>
      </Grid>
    </List>
  )
}

const useStyles = makeStyles({
  grid: {
    paddingTop: 4,
    paddingBottom: 4
  },
  paper: {
    width: '100%',
    height: 58,
    backgroundColor: '#f0fae8'
  },
  uncheck: {
    borderRadius: 3,
    width: 18,
    height: 18,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#fafafa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.5),hsla(0,0%,100%,0))',

    'input:hover ~ &': {
      backgroundColor: '#ebf1f5'
    }
  },
  checked: {
    backgroundColor: '#f57822',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""'
    },
    'input:hover ~ &': {
      backgroundColor: '#f57822'
    }
  },
  infoButton: {
    padding: 8,
    color: '#9c9c9c'
  }
})

// e6ffff
// e6ffff
