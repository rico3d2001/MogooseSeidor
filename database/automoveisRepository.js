const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SeidorTeste');

const motoristasSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: true
    },
    usos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UsoAutomovel"
      }]
}, 
{ collection: 'Automoveis' });

module.exports = { Mongoose: mongoose, MotoristasSchema: motoristasSchema }