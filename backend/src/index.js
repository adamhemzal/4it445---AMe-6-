require('dotenv').config();
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRoutes from './rootRoutes';
import db from './models';
const express = require('express');
const app = express();
const flash = require("connect-flash");
const session = require('express-session');

const passport = require('passport');
require('./config/passport')(passport);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.all('*',function(req, res, next){
//   if (req.isAuthenticated()) {
//     res.isAuthenticated = true;
//   } else {
//     res.isAuthenticated = false;
//   }
//   next();
// });

// CORS settings
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
  next();
});
app.use(rootRoutes);

// db.sequelize.dropAllSchemas(function(err){});
//db.sequelize.sync(function(err){});

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
