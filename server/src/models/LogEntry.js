var mongoose = require('mongoose')
var Schema = mongoose.Schema

const requiredNumber = {
  type: Number,
  required: true
}

var LogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  comments: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
    default: 0
  },
  image: String,
  latitude: {
    ...requiredNumber,
    min: -90,
    max: 90
  },
  longitude: {
    ...requiredNumber,
    min: -180,
    max: 180
  },
  visitDate: {
    type: Date,
    required: true
  }
}, { timestamps: true })

const LogEntry = mongoose.model('LogEntry', LogEntrySchema)
module.exports = LogEntry
