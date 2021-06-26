const express = require('express');
const router = express.Router();
var carService = require('../automoveis/automoveisService');

router.get('/cars/:marca/:cor', async function(req, res){
    carService.getByColorAndTradeMark(
        req.params.marca,req.params.cor).then(x => res.json(x))
});
router.get('/car/:id', async function(req, res){
    
});
router.post('/car', async function(req, res){
    
});
router.put('/car:id', async function(req, res){
    
});
router.delete('/car:id', async function(req, res){
    
});

module.exports = router;