const { expect } = require('chai');
const automoveis = require('../server/automoveis/automoveisService');
const motoristas = require('../server/motorista/motoristaService');
const { insertNewUse,
    deleteOneUse,
    getAll,
    endUse,
    findUseByDriverLicenseAndLicensePlate,
    getByDriverName } = require('../server/use/useService');

describe('Utilizacao de automoveis unity tests', async () => {
    describe('#CRUDUtilizacaoAutomovel', () => {

        it('deve cadastrar um uso por um motorista com data de inicio e motivo', async () => {

            //Arrange
            //insere automovel
            await automoveis.insertNewCar({ placa: 'HGB4567', marca: "Fiat Uno", cor: "Cinza" });
            //insereMotorista
            await motoristas.insertNewDriver({ nome: 'Maria Flor', cnh: "55577700021" });


            const placa = "HGB4567";
            const cnh = "55577700021";
            const motivo = "pega";


            const expectation = [{
                motivo: "pega",
                finalizado: false
            }];

            // Act
            await insertNewUse(placa, cnh, motivo);

            // Assert
            const result = await getAll();
            expect(result).to
                .have.lengthOf(1)
                .and.deep.equal(expectation);

            //Restart
            //Remove utilização
            await deleteOneUse('HGB4567', '55577700021');
            //Remove automovel
            await automoveis.deleteOneCar('HGB4567');
            //RemoveMotorista
            await motoristas.deleteOneDriver('55577700021');


        });



        it('deve finalizar o uso por um motorista com data de finalizacao', async () => {

            //Arrange
            //insere automovel
            await automoveis.insertNewCar({ placa: 'HGB4567', marca: "Fiat Uno", cor: "Cinza" });
            //insereMotorista
            await motoristas.insertNewDriver({ nome: 'Maria Flor', cnh: "55577700021" });
            //insereUso
            const placa = "HGB4567";
            const cnh = "55577700021";
            const motivo = "pega";

            await insertNewUse(placa, cnh, motivo);
            const inserted = await findUseByDriverLicenseAndLicensePlate(placa, cnh);

            // Act
            await endUse(placa, cnh);
            const updated = await findUseByDriverLicenseAndLicensePlate(placa, cnh);
            //

            // Assert            
            expect(updated.finalizado).to.equal(true);
            expect(updated.dataFim).to.greaterThan(inserted.dataFim);

            //Restart
            //Remove utilização
            await deleteOneUse('HGB4567', '55577700021');
            //Remove automovel
            await automoveis.deleteOneCar('HGB4567');
            //RemoveMotorista
            await motoristas.deleteOneDriver('55577700021');


        });


        it('listar registros de uso com nome motorista e informacoes do automovel utilizado', async () => {

            //Arrange
            //insere automoveis
            await automoveis.insertNewCar({ placa: 'HGB4567', marca: "Fiat Uno", cor: "Cinza" });
            await automoveis.insertNewCar({ placa: 'MGF0987', marca: "Fiesta", cor: "Amarelo" });
            await automoveis.insertNewCar({ placa: 'RRP2001', marca: "Fox", cor: "Preta" });
            await automoveis.insertNewCar({ placa: 'CYZ9087', marca: "Celta", cor: "Azul" });
            await automoveis.insertNewCar({ placa: 'JVM7879', marca: "Celta", cor: "Azul" });
            //insereMotoristas
            await motoristas.insertNewDriver({ nome: 'Maria Flor', cnh: "55577700021" });
            await motoristas.insertNewDriver({ nome: 'Maria Flor', cnh: "890654356" });
            await motoristas.insertNewDriver({ nome: 'Jonia Pinto', cnh: "1234578" });
            await motoristas.insertNewDriver({ nome: 'Ricardo Pinto', cnh: "23456709" });
            //insereUso
            await insertNewUse('HGB4567', '55577700021', 'passeio');
            await insertNewUse('MGF0987', '55577700021', 'passeio');
            await insertNewUse('RRP2001', '890654356', 'passeio');
            await insertNewUse('CYZ9087', '1234578', 'passeio');
            await insertNewUse('JVM7879', '23456709', 'passeio');
            //atualizar
            await endUse('HGB4567', '55577700021');


            const nomeMotorista = 'Maria Flor';

            const expectation = [
                {
                    "placa": "HGB4567",
                    "marca": "Fiat Uno",
                    "cor": "Cinza",
                    "cnh": "55577700021",
                    "nome": "Maria Flor",
                    "finalizado": true
                },
                {
                    "placa": "MGF0987",
                    "marca": "Fiesta",
                    "cor": "Amarelo",
                    "cnh": "55577700021",
                    "nome": "Maria Flor",
                    "finalizado": false
                },
                {
                    "placa": "RRP2001",
                    "marca": "Fox",
                    "cor": "Preta",
                    "cnh": "890654356",
                    "nome": "Maria Flor",
                    "finalizado": false
                }];

            // Act
            const result = await getByDriverName(nomeMotorista);

            // Assert
            expect(result).to.deep.equal(expectation);

            //Restart
            //Remove utilizações
            await deleteOneUse('HGB4567', '55577700021');
            await deleteOneUse('MGF0987', '55577700021');
            await deleteOneUse('RRP2001', '890654356');
            await deleteOneUse('CYZ9087', '1234578');
            await deleteOneUse('JVM7879', '23456709');
            //Remove automoveis
            await automoveis.deleteOneCar('HGB4567');
            await automoveis.deleteOneCar('MGF0987');
            await automoveis.deleteOneCar('RRP2001');
            await automoveis.deleteOneCar('CYZ9087');
            await automoveis.deleteOneCar('JVM7879');
            //RemoveMotoristas
            await motoristas.deleteOneDriver('55577700021');
            await motoristas.deleteOneDriver('890654356');
            await motoristas.deleteOneDriver('1234578');
            await motoristas.deleteOneDriver('23456709');


        });

    });
});