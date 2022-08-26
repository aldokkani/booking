import React, { useContext, useState } from 'react'
import { TextField, MenuItem, Grid, Slider, Box, Typography } from '@mui/material'
import PLANETS from '../data-mocks/planets.json'
import { TripContext } from '../App'

const minSliderDistance = 100

const Search = (): JSX.Element => {
  const { tripSearch, setTripSearch } = useContext(TripContext)
  const [origin, setOrigin] = useState(tripSearch.origin)
  const [destination, setDestination] = useState(tripSearch.destination)
  const [priceRange, setPriceRange] = React.useState<number[]>(tripSearch.priceRange)

  const handleChangeOrigin = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setOrigin(event.target.value)
    setTripSearch({ origin: event.target.value, destination, priceRange })
  }

  const handleChangeDestination = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDestination(event.target.value)
    setTripSearch({ origin, destination: event.target.value, priceRange })
  }

  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ): void => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - minSliderDistance), priceRange[1]])
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minSliderDistance)])
    }
  }

  const handlePriceChangeCommitted = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ): void => Array.isArray(newValue) && setTripSearch({ origin, destination, priceRange: newValue })

  const valuetext = (value: number): string => `${value}$`

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' }
      }}>
        <Box>
          <TextField
            id="outlined-select-currency"
            select
            label="From:"
            value={origin}
            onChange={handleChangeOrigin}
            helperText="Please select your start point"
          >
            {PLANETS.map(({ name, code }) => (
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
            {PLANETS.map(({ name, code }) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography id="input-slider" gutterBottom>
            Price Range
          </Typography>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={priceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceChangeCommitted}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={1000}
            step={10}
            marks={[{ value: 0, label: '0$' }, { value: 1000, label: '1000$' }]}
            disableSwap
          />
        </Box>
      </Grid>
    </Grid>
  )
}
export default Search
