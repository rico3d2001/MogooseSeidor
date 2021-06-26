const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/SeidorTeste');

const motoristasSchema = new mongoose.Schema(
    {
        cnh: {
            type: String,
            required: true,
            unique: true
        },
        nome: {
            type: String,
            required: true
        }
    },
    { collection: 'Motoristas' });

module.exports = { Mongoose: mongoose, MotoristasSchema: motoristasSchema }