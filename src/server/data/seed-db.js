const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const users = require('./users');
const contacts = require('./contacts');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';

function seedCollection(collectionName, initialRecords) {

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    console.log('connected to mongodb...', client.isConnected());

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.deleteMany();  

    initialRecords.forEach((item) => {
      if (item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    console.log('inserting records...');

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} records inserted.`);
      console.log('closing connection...');
      client.close();
      console.log('done.');
    });

  });
}



seedCollection('users', users);
seedCollection('contacts', contacts);
