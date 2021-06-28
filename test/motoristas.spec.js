const { expect } = require('chai');
const { insertNewDriver,
    findDriverByLicense,
    updateOneDriver,
    deleteOneDriver,
    getByName,
    countAll,
    getAll } = require('../server/motorista/motoristaService');

const nodemon = require('nodemon');


describe('Motoristas unity tests', async () => {
    describe('#CRUDMotoristas', () => {

        it('deve cadastrar um novo motorista', async () => {

            //Arrange
            const expectation = [{
                nome: "Ricardo Pinto",
                cnh: "666999444"
            }];

            // Act
            await insertNewDriver(expectation[0]);


            // Assert
            const result = await getAll();
            expect(result).to
                .have.lengthOf(1)
                .and.deep.equal(expectation);

            //Restart
            await deleteOneDriver(expectation[0].cnh);

        });

        it('deve recuperar um motorista cadastrado pelo identificador unico', async () => {

            //Arrange
            const inserted = {
                nome: "Ricardo Pinto",
                cnh: "666999444"
            };
            await insertNewDriver(inserted);

            // Act
            const result = await findDriverByLicense(inserted.cnh);

            // Assert
            expect(result.cnh).to.equal(inserted.cnh);

            //Restart
            await deleteOneDriver(inserted.cnh);
        });

        it('deve atualizar um motorista cadastrado', async () => {

            //Arrange
            const inserted = {
                nome: "Ricardo Pinto",
                cnh: "666999444"
            };
            await insertNewDriver(inserted);

            const expectation = [{
                nome: "Joao Pio",
                cnh: "666999444"
            }];

            // Act
            await updateOneDriver(expectation[0]);


            // Assert
            const result = await getAll();
            expect(result).to
                .have.lengthOf(1)
                .and.deep.equal(expectation);

            //Restart
            await deleteOneDriver(expectation[0].cnh);

        });


        it('deve excluir um motorista cadastrado', async () => {
            //Arrange
            const inserted = {
                nome: "Joao Pio",
                cnh: "666999444"
            };
            await insertNewDriver(inserted);

            // Act
            await deleteOneDriver(inserted.cnh);


            // Assert
            const quantidadeDados = await countAll();
            expect(quantidadeDados).to.equal(0);
        });

        it('deve listar os motoristas por nome', async () => {

            //Arrange
            const nomeTeste = "Maria Flor";
            await insertNewDriver({ nome: 'Maria Flor', cnh: "55577700021" });
            await insertNewDriver({ nome: 'Maria Flor', cnh: "890654356" });
            await insertNewDriver({ nome: 'Jonia Pinto', cnh: "1234578" });
            await insertNewDriver({ nome: 'Ricardo Pinto', cnh: "23456709" });

            const expectation = [
                {
                    nome: 'Maria Flor',
                    cnh: "55577700021"
                },
                {
                    nome: 'Maria Flor',
                    cnh: "890654356"
                }
            ];

            // Act
            const result = await getByName(nomeTeste);

            // Assert
            expect(result).to
                .have.lengthOf(2)
                .and.deep.equal(expectation);

            //Restart
            await deleteOneDriver('55577700021');
            await deleteOneDriver('890654356');
            await deleteOneDriver('1234578');
            await deleteOneDriver('23456709');


        });

    });
});