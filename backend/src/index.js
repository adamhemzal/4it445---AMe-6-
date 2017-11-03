import cors from 'cors';
import bodyParser from 'body-parser';
import rootRoutes from './rootRoutes';

require('dotenv').config();

const express = require('express')
const app = express()

app.use(bodyParser.json());
app.use(cors());

app.use(rootRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ error: '404: Not found' });
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
