const mongoose = require('mongoose');
const KeyIssue = require('./models/KeyIssue');
const MonitoringPeriod = require('./models/MonitoringPeriod');
const Stats = require('./models/Stats');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedData = async () => {
  await KeyIssue.deleteMany({});
  await MonitoringPeriod.deleteMany({});
  await Stats.deleteMany({});

  await KeyIssue.insertMany([
    { description: 'Wrong Prescription', count: 10 },
    { description: 'Delay in Lab', count: 8 },
  ]);

  await MonitoringPeriod.create({
    day: 13,
    week: 45,
    month: 78,
    year: 102,
  });

  await Stats.create({
    footfall: 13000,
    patientSatisfaction: 7.8,
    revenue: 4.2,
    staffMetrics: [
      { name: 'Mercy Mukopi', efficiency: 1.3, npsDelta: -1.2, reportedIssues: 5 },
      { name: 'Kennedy Ayako', efficiency: 2.1, npsDelta: 0.8, reportedIssues: 2 },
    ],
  });

  console.log('Database seeded');
  mongoose.connection.close();
};

seedData();
