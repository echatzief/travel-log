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

module.exports = router
