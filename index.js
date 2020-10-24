require('newrelic');
const express = require('express');
const path = require('path')
const app = express();
const request = require('request');
const axios = require('axios')

const PORT = 3000;
const HOST = 'localhost';
app.use(express.json());
app.use(express.static(__dirname));

app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies to the 4 services present in the Team 2 FEC project.');
});

app.get('/products/:product', (req, res) => {
  request(`http://localhost:3001/products/${req.params.product}`).pipe(res);
});

app.post('/image', (req, res) => {
  axios({
    method: 'post',
    url: `http://localhost:3001/image`,
    data: {image: req.body.image}
  })
  .then(result => {
    res.status(200).send()
  })
  .catch(err => {
    console.error(err)
    res.status(500).send();
  })
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
