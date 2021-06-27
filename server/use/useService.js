const dbUse = require('../../database/useRepository');
const dbAutomoveis = require('../../database/automoveisRepository');
const dbMotoristas = require('../../database/motoristasrepository');

const UsoAutomovel = dbUse.Mongoose
    .model('UsoAutomovel', dbUse.UsoAutomovelSchema, 'UsoAutomovel');
const Automoveis = dbAutomoveis.Mongoose
    .model('Automoveis', dbAutomoveis.AutomoveisSchema, 'Automoveis');
const Motoristas = dbMotoristas.Mongoose
    .model('Motoristas', dbMotoristas.MotoristasSchema, 'Motoristas');

async function insertNewUse(placa, cnh, motivo) {

    const automovel = await Automoveis.findOne({ placa });
    const motorista = await Motoristas.findOne({ cnh });
    const data = new Date();

    const uso = new UsoAutomovel({
        idAutomovel: automovel._id,
        idMotorista: motorista._id,
        dataInicio: data,
        dataFim: data,
        motivo: motivo
    });
    return await uso.save();
}


async function findUseByDriverLicenseAndLicensePlate(cnh, placa) {
    const automovel = await Automoveis.findOne({ placa });
    const motorista = await Motoristas.findOne({ cnh });
    return await UsoAutomovel
        .findOne({ idAutomovel: automovel._id, idMotorista: motorista._id });
}

async function findUseById(automovel) {
    return await UsoAutomovel.findById(automovel._id)
}

async function findUseByLicensePlate(placa) {
    const automovel = await Automoveis.findOne({ placa });
    return await UsoAutomovel.findOne({idAutomovel: automovel})
}

async function countUseByLicensePlate(placa) {
    const automovel = await Automoveis.findOne({ placa });
    return await UsoAutomovel.countDocuments({idAutomovel: automovel})
}

async function endUse(uso) {
    return await UsoAutomovel
        .findByIdAndUpdate(uso._id, { dataFim: new Date() });
}


async function getByDriverName(name) {
    return await UsoAutomovel.aggregate(
        [
            {
                $lookup: {
                    from: 'Motoristas',
                    localField: 'idMotorista',
                    foreignField: '_id',
                    as: 'mots'
                }
            },
            {
                $lookup: {
                    from: 'Automoveis',
                    localField: 'idAutomovel',
                    foreignField: '_id',
                    as: 'autos'
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$mots', 0] }, "$$ROOT"] } }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$autos', 0] }, "$$ROOT"] } }
            },
            {
                $match: { nome: 'Maria Flor' }
            },
            {
                $sort: { nome: -1 }
            },
            {
                $project:
                {
                    _id: 0,
                    nome: 1,
                    cnh: 1,
                    placa: 1,
                    cor: 1,
                    marca: 1
                }
            }
        ]
    );
}

async function deleteOneUseByMotivo(motivo) {
    return await UsoAutomovel.findOneAndDelete({ motivo });
}



async function countUseByMotivo(motivo) {
    return await UsoAutomovel.countDocuments({motivo});
}

module.exports = {
    insertNewUse,
    endUse,
    getByDriverName,
    findUseById,
    findUseByDriverLicenseAndLicensePlate,
    deleteOneUseByMotivo,
    findUseByLicensePlate,
    countUseByMotivo
};