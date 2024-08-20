const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const { testConnection } = require('./config/db');
const KeyIssue = require('./models/KeyIssue');
const MonitoringPeriod = require('./models/MonitoringPeriod');
const Stats = require('./models/Stats');

const app = express();

// Define your type definitions (schema)
const typeDefs = gql`
  type Query {
    patientsSeen: Int
    keyIssues: [KeyIssue]
    monitoringPeriod: MonitoringPeriod
    stats: Stats
  }

  type KeyIssue {
    description: String
    count: Int
  }

  type MonitoringPeriod {
    day: Int
    week: Int
    month: Int
    year: Int
  }

  type Stats {
    footfall: Int
    patientSatisfaction: Float
    revenue: Float
    staffMetrics: [StaffMetric]
  }

  type StaffMetric {
    name: String
    efficiency: Float
    npsDelta: Float
    reportedIssues: Int
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    patientsSeen: async () => {
      // Replace with logic to count patients from the database if needed
      return 286;
    },
    keyIssues: async () => {
      return await KeyIssue.find({});
    },
    monitoringPeriod: async () => {
      return await MonitoringPeriod.findOne({});
    },
    stats: async () => {
      return await Stats.findOne({});
    },
  },
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    // Create the Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });

    // Apply the Apollo GraphQL middleware and set the path to /graphql
    server.start().then(() => {
      server.applyMiddleware({ app, path: '/graphql' });

      // Start the Express server
      app.listen({ port: 4000 }, () => {
        console.log('Server ready at http://localhost:4000/graphql');
      });
    });
  })
  .catch(error => {
    console.error('Database connection error:', error);
  });
