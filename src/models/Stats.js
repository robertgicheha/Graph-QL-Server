const mongoose = require('mongoose');

const staffMetricSchema = new mongoose.Schema({
  name: String,
  efficiency: Number,
  npsDelta: Number,
  reportedIssues: Number,
});

const statsSchema = new mongoose.Schema({
  footfall: Number,
  patientSatisfaction: Number,
  revenue: Number,
  staffMetrics: [staffMetricSchema],
});

module.exports = mongoose.model('Stats', statsSchema);
