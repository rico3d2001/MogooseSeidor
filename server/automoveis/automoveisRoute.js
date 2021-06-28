const express = require('express');
const router = express.Router();
var automoveisService = require('./automoveisService');

router.get('/cars', async function(req, res){
    // /:marca/:cor
    automoveisService.getAll()
    .then(x => res.json(x))
});
router.get('/car/:id', async function(req, res){
    
});
router.post('/car', async function(req, res){
    res.send("Ola");
});
router.put('/car:id', async function(req, res){
    
});
router.delete('/car:id', async function(req, res){
    
});

module.exports = router;