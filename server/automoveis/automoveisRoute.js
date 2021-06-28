const express = require('express');
const router = express.Router();
var automoveisService = require('./automoveisService');

router.get('/cars', async function (req, res) {
    automoveisService.getAll()
        .then(x => res.json(x))
});

router.get('/car/:placa', async function (req, res) {
    automoveisService.findCarByLicensePlate(req.params.placa)
    .then(x => res.json(x))
    .catch('Erro sys')
});

router.post('/car', async function (req, res) {
    const post = req.boby;
    automoveisService.insertNewCar(post)
    .then(x => res.json(x))
    .catch('Erro sys')
});

router.put('/car', async function (req, res) {
    const post = req.boby;
    automoveisService.updateOneCar(post)
    .catch('Erro sys')
});

router.delete('/car:placa', async function (req, res) {
    automoveisService.deleteOneCar(req.params.placa)
    .catch('Erro sys')
});

module.exports = router;