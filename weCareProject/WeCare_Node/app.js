const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/router');


const app = express();

const consoleLogger = (req, res, next) => {
  const date = new Date();
  console.log(req.method, req.url, date);
  next();
};

app.use(cors());

app.use(bodyParser.json());

app.use(consoleLogger);

app.use('/',router);

app.listen(4000, () => {
  console.log('Server running at port 4000');
});

