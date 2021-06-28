

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

async function getByColorAndTradeMark(cor, marca) {
    return await Automoveis.find({ cor, marca })
       .lean().exec()
       .then(x => x.map(({ placa, marca, cor }) => ({
        placa,
        marca,
        cor
      })));
}

async function countAll() {
    return await Automoveis.countDocuments();
}



async function getAll() {
    return await Automoveis.find().lean().exec()
    .then(x => x.map(({ placa, marca, cor }) => ({
        placa,
        marca,
        cor
      })));
}


module.exports = {
    getByColorAndTradeMark,
    insertNewCar,
    findCarByLicensePlate,
    updateOneCar,
    deleteOneCar,
    countAll,
    getAll
};





