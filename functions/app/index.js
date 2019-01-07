/* Express App */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authenticate from '../middlewares/authenticate';
import Drink from '../models/Drink';
import parseErrors from '../utils/parseErrors';


/* My express App */
export default function expressApp(functionName) {

  dotenv.config();
  mongoose.Promise = Promise;
  mongoose.connect(process.env.MONGODB_PROD_URL, { useMongoClient: true });

	const app = express();
  const router = express.Router();
  // Set router base path for local dev
  const routerBasePath = (process.env.NODE_ENV === 'dev') ? `/${functionName}` : `/.netlify/functions/${functionName}/`;

  router.post('/users', (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    const user = new User({ firstName, lastName, email });
    user.setPassword(password);
    user.setConfirmationToken();
    user
      .save()
      .then(userRecord => {
        // sendConfirmationEmail(userRecord);
        res.json({ user: userRecord.toAuthJSON() });
      })
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  });

  router.post('/auth/', (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email }).then(user => {
      if (user && user.isValidPassword(credentials.password)) {
        res.json({ user: user.toAuthJSON() });
      } else {
        res.status(400).json({ errors: { global: 'Invalid Credentials' } });
      }
    });
  });

  router.post('/auth/confirmation', (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
      { confirmationToken: token },
      { confirmationToken: '', confirmed: true },
      { new: true }
    ).then(
      user =>
        user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
  });

  router.post('/auth/reset-password-request', (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        // sendResetPasswordEmail(user);
        res.json({});
      } else {
        res
          .status(400)
          .json({ errors: { global: 'There is no user with such email' } });
      }
    });
  });

  router.post('/auth/validate-token', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
      if (err) {
        res.status(401).json({});
      } else {
        res.json({});
      }
    });
  });

  router.post('/auth/reset-password', (req, res) => {
    const { password, token } = req.body.data;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: 'Invalid token' } });
      } else {
        User.findOne({ _id: decoded._id }).then(user => {
          if (user) {
            user.setPassword(password);
            user.save().then(() => res.json({}));
          } else {
            res.status(404).json({ errors: { global: 'Invalid token' } });
          }
        });
      }
    });
  });

  // router.use(authenticate);

  router.get('/drinks', (req, res) => {
    Drink.find().then(drinks => {
      return res.json({ drinks });
    });
  });

  router.get('/drinks/:id', (req, res) => {
    Drink.findById(req.params.id).then(drinks => {
      return res.json({ drinks });
    });
  });

  router.post('/drinks/', (req, res) => {
    Drink.create({ ...req.body.drink })
      .then(drinks => res.json({ drinks }))
      .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
  });

  router.patch('/drinks/:id', (req, res) => {
    Drink.findByIdAndUpdate(req.params.id, { $set: req.body.drink }, { new: true }, (err, drinks) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json({ drinks });
    });
  });

  router.delete('/drinks/:id', (req, res) => {
    Drink.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.json();
    });
  });

	router.get('/hello/', (req, res) => {
	  res.send('hello world')
  });

  // Apply express middlewares
	app.use(cors({
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  }));
	app.use(bodyParser.json());


	// Setup routes
	app.use(routerBasePath, router)

	return app;
}