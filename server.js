const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');

const app = express();

app.use(bodyParser.json());
app.use(express.static('dist'))

app.get('/api/test', (req, res) => {
  res.status(200).send({ msg: 'Hello, World!' });
});

app.listen(3333);