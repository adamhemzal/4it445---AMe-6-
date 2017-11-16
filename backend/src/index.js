require('dotenv').config();
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRoutes from './rootRoutes';
const express = require('express');
const app = express();
const flash = require("connect-flash");
const session = require('express-session');

const passport = require('passport');
require('./config/passport')(passport);

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(rootRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
