const mongoose = require('mongoose');

const monitoringPeriodSchema = new mongoose.Schema({
  day: Number,
  week: Number,
  month: Number,
  year: Number,
});

module.exports = mongoose.model('MonitoringPeriod', monitoringPeriodSchema);
