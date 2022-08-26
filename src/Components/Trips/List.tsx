import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TRIPS from '../../data-mocks/trips.json'
import { Grid, Pagination, Stack } from '@mui/material'
import { TripContext } from '../../App'

interface Trip {
  date: string
  origin: string
  destination: string
  price: number
  availability: number
}

const isInPriceRange = (priceRange: number[], tripPrice: number): boolean =>
  tripPrice >= priceRange[0] && tripPrice <= priceRange[1]

const renderTrip = (trip: Trip, index: number): JSX.Element => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Trip #{index + 1}
            </Typography>
            <Typography variant="h6" component="div">
                From: {trip.origin} To: {trip.destination}
            </Typography>
            <Typography variant="body2">
                Price: {trip.price}
            </Typography>
            <Typography variant="body2">
                Available slots: {trip.availability}
            </Typography>
            <Typography variant="subtitle1">
                Date: {new Date(trip.date).toDateString()}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
)

const TripsList = (): JSX.Element => {
  const { tripSearch } = useContext(TripContext)
  const availableTrips = TRIPS.filter(
    trip =>
      (tripSearch.origin === 'ALL' || trip.origin === tripSearch.origin) &&
            (tripSearch.destination === 'ALL' || trip.destination === tripSearch.destination) &&
            isInPriceRange(tripSearch.priceRange, trip.price)
  )
  const tripsCount = availableTrips.length
  const [tripsPage, setTripsPage] = useState(availableTrips.slice(0, 10))

  return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="overline" gutterBottom>
                Results found: {availableTrips.length}
            </Typography>
        </Grid>
        {tripsCount === 0 &&
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                Sorry, no available trips!
            </Typography>
        </Grid>}
        {tripsCount > 0 &&
        <Grid item xs={12}>
            <Stack spacing={2}>
                <Pagination
                    variant="outlined" shape="rounded"
                    count={Math.ceil(tripsCount / 10)}
                    onChange={((event, page: number) => {
                      setTripsPage(availableTrips.slice((page - 1) * 10, page * 10))
                    })}
                />
            </Stack>
        </Grid>}
        {tripsCount > 0 && tripsPage.map((trip: Trip, index: number) =>
            <Grid key={index} item xs={6}>
                <Box>
                    <Card variant="outlined">{renderTrip(trip, index)}</Card>
                </Box>
            </Grid>
        )}
    </Grid>
  )
}

export default TripsList
