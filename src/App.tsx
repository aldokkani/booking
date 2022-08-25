import React, { useState, createContext } from 'react'
import TripsList from './Components/Trips/List'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Search from './Components/Search'

const setTripSearch: Function = () => { }
const tripSearch: { origin?: string, destination?: string } = {}

export const TripContext = createContext({ tripSearch, setTripSearch })

const App = (): JSX.Element => {
  const [tripSearch, setTripSearch] = useState({})

  return (<React.Fragment>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, Brooday!
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <TripContext.Provider value={{ tripSearch, setTripSearch }}>
      <Container maxWidth="lg">
        <Search />
        <TripsList />
      </Container>
    </TripContext.Provider>
  </React.Fragment>)
}

export default App
