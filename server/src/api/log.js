const { Router } = require('express')
const LogEntry = require('../models/LogEntry')
const router = Router()

router.get('/log/:id', async (req, res, next) => {
  try {
    res.json(await LogEntry.findOne({ _id: req.params.id }))
  } catch (err) {
    next(err)
  }
})
router.get('/logs', async (req, res, next) => {
  try {
    res.json(await LogEntry.find())
  } catch (err) {
    next(err)
  }
})
router.post('/logs', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body)
    console.log(logEntry)
    res.json(await logEntry.save())
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(422)
    }
    next(err)
  }
})


module.exports = router
