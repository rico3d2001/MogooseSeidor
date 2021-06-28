

var db = require('../../database/motoristasrepository');

const Motoristas = db.Mongoose
    .model('Motoristas', db.MotoristasSchema, 'Motoristas');


async function insertNewDriver(driver) {
    const motorista = new Motoristas({ cnh: driver.cnh, nome: driver.nome });
    return await motorista.save();
}

async function findDriverByLicense(cnh) {
    return await Motoristas.findOne({ cnh })
}

async function countAll() {
    return await Motoristas.countDocuments()
}


async function updateOneDriver(driver) {
    return await Motoristas.findOneAndUpdate({cnh: driver.cnh},{nome: driver.nome})
}


async function deleteOneDriver(cnh) {
    return await Motoristas.findOneAndDelete({ cnh })
}

async function getByName(name) {
    return await Motoristas.find({ nome: name }).lean().exec()
    .then(x => x.map(({ cnh, nome }) => ({
        cnh,
        nome
      })));
}

async function getAll() {
    return await Motoristas.find().lean().exec()
    .then(x => x.map(({ cnh, nome }) => ({
        cnh,
        nome
      })));
}


module.exports = {
    insertNewDriver,
    findDriverByLicense,
    updateOneDriver,
    deleteOneDriver,
    getByName,
    countAll,
    getAll
};






