const express = require('express');
const app = express();

app.use('/', require('./server/automoveis/automoveisRoute'))

app.listen(3000);