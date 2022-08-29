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
import { Divider } from '@mui/material'

const defaultTripSearch = { origin: 'ALL', destination: 'ALL', priceRange: [0, 1000], date: new Date('2021-11-15') }
const setTripSearch: Function = () => { }
const tripSearch: { origin: string, destination: string, priceRange: number[], date: Date } = defaultTripSearch

export const TripContext = createContext({ tripSearch, setTripSearch })

const App = (): JSX.Element => {
  const [tripSearch, setTripSearch] = useState(defaultTripSearch)

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
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <Search />
        <Divider variant="middle" style={{ margin: 20 }} />
        <TripsList />
      </Container>
    </TripContext.Provider>
  </React.Fragment>)
}

export default App
