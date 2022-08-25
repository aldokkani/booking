import React, { useContext, useState } from 'react'
import { TextField, MenuItem, Grid } from '@mui/material'
import PLANETS from '../data-mocks/planets.json'
import { TripContext } from '../App'

const Search = (): JSX.Element => {
  const { tripSearch, setTripSearch } = useContext(TripContext)
  const [origin, setOrigin] = useState(tripSearch.origin)
  const [destination, setDestination] = useState(tripSearch.destination)

  const handleChangeOrigin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOrigin(event.target.value)
    setTripSearch({ origin: event.target.value, destination })
  }

  const handleChangeDestination = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDestination(event.target.value)
    setTripSearch({ origin, destination: event.target.value })
  }
  return (
        <Grid container spacing={2}>

            <Grid item xs={12} sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="From:"
                    value={origin}
                    onChange={handleChangeOrigin}
                    helperText="Please select your start point"
                >
                    {PLANETS.filter(({ code }) => code !== destination).map(({ name, code }) => (
                        <MenuItem key={code} value={code}>
                            {name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    id="outlined-select-currency"
                    select
                    label="To:"
                    value={destination}
                    onChange={handleChangeDestination}
                    helperText="Please select your destination"
                >
                    {PLANETS.filter(({ code }) => code !== origin).map(({ name, code }) => (
                        <MenuItem key={code} value={code}>
                            {name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>

  )
}
export default Search
