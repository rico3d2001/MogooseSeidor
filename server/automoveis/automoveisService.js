

var db = require('../../database/automoveisRepository');

const Automoveis = db.Mongoose
    .model('Automoveis', db.MotoristasSchema, 'Automoveis');


async function insertNewCar(car) {
    const automovel = new Automoveis({
        placa: car.placa,
        marca: car.marca,
        cor: car.cor
    });
    return await automovel.save();
}

async function findCarByLicensePlate(placa) {
    return await Automoveis.findOne({ placa })
}

async function updateOneCar(car) {
    return await Automoveis
        .findOneAndUpdate({ placa: car.placa }, { marca: car.marca, cor: car.cor })
}

async function deleteOneCar(placa) {
    return await Automoveis.findOneAndDelete({ placa })
};

async function getByColorAndTradeMark(color, tradeMark) {
    return await Automoveis.find({ cor: color, marca: tradeMark }).lean().exec()
}


module.exports = {
    getByColorAndTradeMark,
    insertNewCar,
    findCarByLicensePlate,
    updateOneCar,
    deleteOneCar
};





