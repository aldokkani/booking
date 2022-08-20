import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TRIPS from '../../data-mocks/trips.json'

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

const TripsList = (): JSX.Element => <Box sx={{ minWidth: 275 }}>
    {TRIPS.map(renderTrip).map((card, index) => <Card key={index} variant="outlined">{card}</Card>)}
</Box>

export default TripsList
