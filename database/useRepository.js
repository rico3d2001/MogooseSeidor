const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SeidorTeste');

const usoAutomovelSchema = new mongoose.Schema({
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: Date,
  motivo: String,
  idAutomovel: {type: mongoose.Schema.Types.ObjectId, ref: "Automoveis"},
  idMotorista: {type: mongoose.Schema.Types.ObjectId, ref: "Motoristas"}
}, 
{ collection: 'UsoAutomovel' });

module.exports = { Mongoose: mongoose, UsoAutomovelSchema: usoAutomovelSchema }

