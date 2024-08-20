const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/analytics-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const testConnection = () => {
  return new Promise((resolve, reject) => {
    db.once('open', () => {
      console.log('Connected to MongoDB');
      resolve();
    });

    db.on('error', (error) => {
      console.error('Connection error:', error);
      reject(error);
    });
  });
};

module.exports = { db, testConnection };
