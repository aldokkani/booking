import React from 'react'
import { render, screen } from '@testing-library/react'
import TripsList from './List'

test('renders list of trips', () => {
  render(<TripsList />)
  const tripsList = screen.getAllByText(/trip #[0-9]+/i)
  tripsList.forEach(trip => expect(trip).toBeInTheDocument())
})

test.todo('renders trips book button')
test.todo('navigate to trip details page')
