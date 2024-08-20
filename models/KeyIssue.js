const mongoose = require('mongoose');

const keyIssueSchema = new mongoose.Schema({
  description: String,
  count: Number,
});

module.exports = mongoose.model('KeyIssue', keyIssueSchema);
