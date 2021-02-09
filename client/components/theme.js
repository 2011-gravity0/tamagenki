import {createMuiTheme} from '@material-ui/core/styles'

const colorOne = '#FFFAEA'
const colorTwo = '#FFBOAD'
const colorThree = '#C9E3BE'
const colorFour = '#4F7469'
const colorWhite = '#fff'

export default createMuiTheme({
  palette: {
    common: {
      colorOne: colorOne,
      colorTwo: colorTwo,
      colorThree: colorThree,
      colorFour: colorFour,
      colorWhite: colorWhite
    },
    primary: {
      main: colorOne
    },
    secondary: {
      main: colorTwo
    }
  },
  typography: {
    h1: {
      fontSize: '2.8rem',

      fontFamily: 'Fredoka One'
    },
    tab: {
      fontSize: '1em',
      fontWeight: 400,
      fontFamily: 'Raleway',
      letterSpacing: 2
    },
    body1: {
      fontSize: '1.25em',
      fontWeight: 500,
      fontFamily: 'Raleway',
      letterSpacing: 2
    },
    body2: {
      fontSize: '1.25em',
      fontWeight: 300,
      fontFamily: 'Raleway',
      letterSpacing: 2
    }
  },
  breakpoints: {
    values: {
      ml: 1720
    }
  }
})
