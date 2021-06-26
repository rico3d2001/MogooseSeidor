const express = require('express');
const app = express();

app.use('/', require('./server/car/carRoute'))

app.listen(3000);