import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Lottie from 'react-lottie'
import animationOwl from '../../../public/lotties/owl.json'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

export const NameAndBedtime = props => {
  const {handleChange, nextStep} = props

  return (
    <div className="question-component">
      <div className="questionContainer">
        <div className="questionOwlAnime">
          <Lottie options={owlOptions} height={100} width={100} />
        </div>
        <Grid container justify="center" className="questionHeader">
          <p className="owlTalk">
            'To get started I need to know some more information about you...'
          </p>
        </Grid>
        <div className="nameBedtimeContainer">
          <form className="questionItem">
            <TextField
              id="standard-helperText"
              className="questionItem"
              label="What's your name?"
              name="userName"
              onChange={handleChange}
              variant="outlined"
            />
          </form>
          <FormControl variant="outlined" className="questionItem">
            <InputLabel id="demo-simple-select-outlined-label">
              Ideal bedtime
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              name="bedTime"
              defaultValue=""
              onChange={handleChange}
              label="What’s your ideal bedtime?"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="9:00pm">9:00pm </MenuItem>
              <MenuItem value="9:30pm">9:30pm </MenuItem>
              <MenuItem value="10:00pm">10:00pm </MenuItem>
              <MenuItem value="10:30pm">10:30pm </MenuItem>
              <MenuItem value="11:00pm">11:00pm </MenuItem>
              <MenuItem value="11:30pm">11:30pm </MenuItem>
              <MenuItem value="12:00pm">12:00am </MenuItem>
              <MenuItem value="12:30pm">12:30am </MenuItem>
              <MenuItem value="1:00am">1:00am</MenuItem>
              <MenuItem value="1:30am">1:30am</MenuItem>
              <MenuItem value="2:00am">2:00am </MenuItem>
            </Select>
          </FormControl>
        </div>
        <Grid container justify="center" className="questionButton">
          <Button
            onClick={() => {
              nextStep('nameBed')
            }}
          >
            Continue
          </Button>
        </Grid>
      </div>
    </div>
  )
}

const owlOptions = {
  loop: true,
  autoplay: true,
  animationData: animationOwl,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}
