const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

// Define the GraphQL schema
const schema = buildSchema(`
  type Visit {
    name: String
    count: Int
  }

  type KeyIssue {
    label: String
    count: Int
  }

  type Metrics {
    footfall: Int
    patientSatisfaction: Float
    revenue: Float
  }

  type StaffEfficiency {
    name: String
    efficiencyDelta: Float
    npsDelta: Float
    reportedIssues: Int
  }

  type Query {
    visits: [Visit]
    keyIssues: [KeyIssue]
    metrics: Metrics
    staffEfficiency: [StaffEfficiency]
  }
`);

// Define the root resolver
const root = {
  visits: () => [
    { name: 'Kariobangi', count: 72 },
    { name: 'Mukuru Kwa Ruben', count: 56 },
    { name: 'Mukuru Kwa Njenga', count: 34 },
    { name: 'Baba Dogo', count: 26 },
    { name: 'Kisumu', count: 24 },
    { name: 'Mukuru Kayaba', count: 22 },
  ],
  keyIssues: () => [
    { label: 'Wrong Prescription', count: 1 },
    { label: 'Opened Late', count: 3 },
    { label: 'Bad Receipts', count: 2 },
    { label: 'Late Check In', count: 4 },
  ],
  metrics: () => ({
    footfall: 13000,
    patientSatisfaction: 7.8,
    revenue: 4.2,
  }),
  staffEfficiency: () => [
    {
      name: 'Mercy Mukopa',
      efficiencyDelta: 1.3,
      npsDelta: 1.2,
      reportedIssues: 4,
    },
    {
      name: 'Kennedy Ayako',
      efficiencyDelta: 1.5,
      npsDelta: 1.5,
      reportedIssues: 5,
    },
    {
      name: 'Stephanie Tomatet',
      efficiencyDelta: 2.7,
      npsDelta: 2.2,
      reportedIssues: 3,
    },
    {
      name: 'Faith Kyaka',
      efficiencyDelta: 3.0,
      npsDelta: 2.5,
      reportedIssues: 6,
    },
  ],
};

// Create an instance of Express
const app = express();

// Enable CORS
app.use(cors());

// Define the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// Start the server
app.listen(4000, () => console.log('Server is running on http://localhost:4000/graphql'));
