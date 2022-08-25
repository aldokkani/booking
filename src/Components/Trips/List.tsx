import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TRIPS from '../../data-mocks/trips.json'
import { Grid } from '@mui/material'
import { TripContext } from '../../App'

interface Trip {
  date: string
  origin: string
  destination: string
  price: number
  availability: number
}

const renderTrip = (trip: Trip, index: number): JSX.Element => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Trip #{index + 1}
            </Typography>
            <Typography variant="h5" component="div">
                From: {trip.origin} To: {trip.destination}
            </Typography>
            <Typography variant="body2">
                Price: {trip.price}
            </Typography>
            <Typography variant="body2">
                Available slots: {trip.availability}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
)

const TripsList = (): JSX.Element => {
  const { tripSearch } = useContext(TripContext)
  const availableTrips = TRIPS.filter(trip => trip.origin === tripSearch.origin && trip.destination === tripSearch.destination)
  return (
    <Grid container spacing={2}>
        {availableTrips.map((trip: Trip, index: number) =>
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
