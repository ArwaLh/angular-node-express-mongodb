require('dotenv').config();

const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const createExpressApp = require('./create-express-app');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';
// MongoClient.connect(process.env.DB_CONN, (err, db) => {
MongoClient.connect(url, { useUnifiedTopology: true },(err, client) => {
  console.log('connected to mongodb...');
  const db = client.db(dbName);

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('listening on port 3000...');
    });

});
