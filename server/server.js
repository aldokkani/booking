const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const YOUR_DOMAIN = 'http://localhost:3000'

app.post('/create-checkout-session', async (req, res) => {
  const { price: tripPrice, origin, destination } = req.body
  const product = await stripe.products.create({ name: `TRIP: ${origin} to ${destination}` })
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: tripPrice * 100,
    currency: 'usd'
  })
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  })

  res.status(200).json({ url: session.url })
})

app.listen(4242, () => console.log('Running on port 4242'))
