const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const checkJwt = require('express-jwt');

function apiRouter(database) {
  const router = express.Router();

  // router.use(
  //     checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
  // );
  // router.use(
  //     checkJwt({ secret: 'Pt4bvZSSI4KN4g', algorithms: ['sha1', 'RS256', 'HS256'] }).unless({ path: '/api/authenticate'})
  // );

  // router.use((err, req, res, next) => {
  //   if (err.name === 'UnauthorizedError') {
  //     res.status(401).send({ error: err.message });
  //   }
  // });

  router.get('/contacts', (req, res) => {

    const contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  router.post('/contacts', (req, res) => {
    const user = req.body;
    console.log('user', user);
    const contactsCollection = database.collection('contacts');

    contactsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });
  router.put('/contact', (req, res) => {
    console.log('update request', req.body)
    const user = req.body;
    user._id =new ObjectId(req.body._id);
    const contactsCollection = database.collection('contacts');
    contactsCollection.updateOne({ _id: user._id }, { $set: user }, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }
      return res.status(201).json('successfully updated');
    });
  });

  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {

        if (!result) {
          return res.status(404).json({ error: 'user not found' })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: 'incorrect password '});
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const token = jwt.sign(payload, 'secretJWT', { expiresIn: '4h' });
        console.log('decoded',jwt.decode(token))

        return res.json({
          message: 'successfuly authenticated',
          token: token,
          user: result.username
        });
      });
  });

  return router;
}

module.exports = apiRouter;
