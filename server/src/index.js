const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
const logs = require('./api/logs')
const middlewares = require('./middlewares')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 1337

// Connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Middlewares
app.use(morgan('common')) // logging
app.use(helmet()) // security
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

// Include the router
app.use('/api/logs', logs)

// Error handling middlewares
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

// Start the application
app.listen(PORT, () => {
  console.log(`App is running at localhost:${PORT}`)
})
