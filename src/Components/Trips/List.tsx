import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Grid, Pagination, Stack, Typography, Button, CardContent, CardActions, Box, Card, Alert, Snackbar } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import TRIPS from '../../data-mocks/trips.json'
import { TripContext } from '../../App'

const tripsData = TRIPS.map(trip => ({ id: uuidv4(), ...trip }))

interface Trip {
  id: string
  date: string
  origin: string
  destination: string
  price: number
  availability: number
}

const isInPriceRange = (priceRange: number[], tripPrice: number): boolean =>
  tripPrice >= priceRange[0] && tripPrice <= priceRange[1]

const handleBooking = ({ price, origin, destination }: Trip): MouseEventHandler<HTMLButtonElement> =>
  (): void => {
    axios.post('http://localhost:4242/create-checkout-session', { price, origin, destination })
      .then(res => window.location.replace(res.data.url))
      .catch(console.error)
  }

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
            <Button size="small" variant="contained" color="success" onClick={handleBooking(trip)}>Book</Button>
        </CardActions>
    </React.Fragment>
)

const TripsList = (): JSX.Element => {
  const { tripSearch } = useContext(TripContext)
  const availableTrips: Trip[] = tripsData.filter(trip =>
    (tripSearch.origin === 'ALL' || trip.origin === tripSearch.origin) &&
    (tripSearch.destination === 'ALL' || trip.destination === tripSearch.destination) &&
    isInPriceRange(tripSearch.priceRange, trip.price) &&
    (new Date(tripSearch.date) <= new Date(trip.date))
  )
  const tripsCount = availableTrips.length
  const [tripsPage, setTripsPage] = useState<Trip[]>([])
  const [page, setPage] = useState(1)
  const [openSuccess, setOpenSuccess] = useState(window.location.search.includes('success'))

  useEffect(() => {
    setTripsPage(availableTrips.slice((page - 1) * 10, page * 10))
  }, [page, availableTrips.map(trip => trip.id).join(''), setTripsPage])

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
                    onChange={((event, page: number) => setPage(page))}
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
        <Snackbar
            open={openSuccess}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => setOpenSuccess(false)}
        >
            <Alert severity="success" sx={{ width: '100%' }}>The trip was booked successfully! find it in your bookings...</Alert>
        </Snackbar>
    </Grid>
  )
}

export default TripsList
